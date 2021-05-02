#!/bin/bash
set -euf -o pipefail

mkdir -p /scratch
cd /scratch
git clone https://github.com/goodtft/LCD-show
chmod -R 755 LCD-show
cd LCD-show
sudo ./MHS35-show
