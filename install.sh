GECKODRIVER_VER=v0.15.0
GECKODRIVER_URL=https://github.com/mozilla/geckodriver/releases/download/${GECKODRIVER_VER}/geckodriver-${GECKODRIVER_VER}-linux64.tar.gz
cd /usr/local/bin
curl -L ${GECKODRIVER_URL} | sudo tar xz
