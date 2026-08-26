#!/bin/bash

mkdir -p /tmp/modmium-update
curl -fL -o /tmp/modmium-forked-nightly.tar.gz \
  https://github.com/Tullysaurus/modmium/archive/refs/heads/forked-nightly.tar.gz
tar -xzf /tmp/modmium-forked-nightly.tar.gz -C /tmp/modmium-update --strip-components=1

cd /tmp/modmium-update/mod-files
find . -type f | while read -r f; do
  dest="/${f#./}"
  if [[ -f "$dest" ]]; then
    cp "$dest" "$dest.old"
  fi
  mkdir -p "$(dirname "$dest")"
  cp "$f" "$dest"
  chown 0:0 "$dest"
  chmod 777 "$dest"
done

echo "forked-nightly" > /.branch
rm -f /.repo   # clear any stale repo choice so it defaults back to "official" == Tullysaurus/modmium on this fork

rm -rf /tmp/modmium-update /tmp/modmium-forked-nightly.tar.gz
