FROM arm32v7/debian:buster

RUN apt-get update \
 && apt-get install -y \
          chromium \
 && rm -rf /var/lib/apt/lists/*

ARG BROWSER_UID=1000
ARG BROWSER_GID=1000
RUN adduser --system --uid=${BROWSER_UID} browser \
 && addgroup --system --gid=${BROWSER_GID} browser

ENV DISPLAY unix:0.0

USER browser
ENTRYPOINT ["chromium"]
CMD ["--kiosk", "http://server"]
