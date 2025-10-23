for file in *.jpg; do
  # Downscale the image to 50% of its original size
  convert "$file" -resize 50% "downscaled_$file"
  # Convert the downscaled image to AVIF with the desired quality
  avifenc -q 70 "downscaled_$file" "${file%.jpg}.avif"
  # Optionally, remove the downscaled image after conversion
  rm "downscaled_$file"
done
