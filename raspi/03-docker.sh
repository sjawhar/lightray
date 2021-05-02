#!/bin/bash
set -euf -o pipefail

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh
sudo usermod -aG docker ${USER}
sudo pip3 install docker-compose

# This section needs to be run as the user whose xauth credentials will be used by the browser
BROWSER_XAUTH=/tmp/.docker.xauth
touch $BROWSER_XAUTH
xauth nlist :0 | sed -e 's/^..../ffff/' | xauth -f ${BROWSER_XAUTH} nmerge -
