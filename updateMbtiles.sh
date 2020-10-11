target=$1

tippecanoe -f -l test -o mb/${target}.mbtiles data/${target}.geojson \
  --no-feature-limit --no-tile-size-limit \
  --minimum-zoom=14 --maximum-zoom=16 --base-zoom=14 \
  --simplification=2

