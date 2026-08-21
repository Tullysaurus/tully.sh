#!/bin/bash

echo "Disabling FWMP..."

if flashrom --wp-disable; then
    echo "FWMP disabled."
else
    echo "Failed to disable FWMP."
    exit
fi


echo "Unblocking dev mode..."
local res
vpd -i RW_VPD -s block_devmode=0
crossystem block_devmode=0
if [ -e /etc/init/tcsd.conf ]; then
    initctl stop tcsd || :
    if tpmc getp 0x100a >/dev/null 2>&1; then
        tpmc clear
        tpmc def 0x100a 0x28 0x12000
        tpmc write 0x100a 76 28 10 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    fi
else
    res=$(cryptohome --action=get_firmware_management_parameters 2>&1)
    if [ $? -eq 0 ] && ! echo "$res" | grep -q "Unknown action"; then
        tpm_manager_client take_ownership
        cryptohome --action=remove_firmware_management_parameters
    fi
fi

echo "Dev mode unblocked."

get_largest_cros_blockdev() {
	local largest size dev_name tmp_size remo
	size=0
	for blockdev in /sys/block/*; do
		dev_name="${blockdev##*/}"
		echo "$dev_name" | grep -q '^\(loop\|ram\)' && continue
		tmp_size=$(cat "$blockdev"/size)
		remo=$(cat "$blockdev"/removable)
		if [ "$tmp_size" -gt "$size" ] && [ "${remo:-0}" -eq 0 ]; then
			case "$(sfdisk -d "/dev/$dev_name" 2>/dev/null)" in
				*'name="STATE"'*'name="KERN-A"'*'name="ROOT-A"'*)
					largest="/dev/$dev_name"
					size="$tmp_size"
					;;
			esac
		fi
	done
	echo "$largest"
}

format_part_number() {
	echo -n "$1"
	echo "$1" | grep -q '[0-9]$' && echo -n p
	echo "$2"
}


echo "Bypassing 5 minute developer mode delay..."

local cros_dev="$(get_largest_cros_blockdev)"
if [ -z "$cros_dev" ]; then
    echo "No CrOS SSD found on device!"
    return 1
fi

local stateful=$(format_part_number "$cros_dev" 1)
local stateful_mnt=$(mktemp -d)
mount "$stateful" "$stateful_mnt"
touch "$stateful_mnt/.developer_mode"
umount "$stateful_mnt"
rmdir "$stateful_mnt"

echo "Developer mode delay bypassed."