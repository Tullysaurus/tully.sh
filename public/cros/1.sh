#!/bin/bash

CHROMEOS_VERSION=$(cat /etc/os-release | sed -n 's/.*VERSION=//p')
echo "Chrome OS Version: $CHROMEOS_VERSION"

if [[ $CHROMEOS_VERSION > 142 ]]; then
    echo "Please downgrade to v142 or below."
    exit
fi

vpd -i RW_VPD -s re_enrollment_key="$(hexdump -e '1/1 "%02x"' -v -n 32 /dev/urandom)"

echo "Unenrolled."