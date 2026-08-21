#!/bin/bash


echo "Installing dev firmware..."
echo "Select chromeOS version 141 stable"

vpd -i RO_VPD -s dev_firmware=0

bash <(curl -SLk modmium.dev/modmium.sh)