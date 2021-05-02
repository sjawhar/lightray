FROM arm32v7/debian:stretch

RUN apt-get update \
 && apt-get install -y \
        curl \
        gnupg \
 && echo 'deb http://archive.raspberrypi.org/debian stretch main contrib non-free rpi' >> /etc/apt/sources.list \
 && curl -sSL http://archive.raspberrypi.org/debian/raspberrypi.gpg.key | apt-key add - \
 && apt-get update \
 && apt-get install -y \
        chromium-browser \
        libnss3-tools \
        libraspberrypi-dev \
 && rm -rf /var/lib/apt/lists/*

ARG BROWSER_UID=1000
ARG BROWSER_GID=1000
RUN adduser --system --uid=${BROWSER_UID} browser \
 && addgroup --system --gid=${BROWSER_GID} browser

ENV DISPLAY unix:0.0

USER browser
ENTRYPOINT ["/usr/bin/chromium-browser"]
CMD ["--kiosk", "http://server"]

# TODO: Timezone
