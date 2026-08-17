#!/bin/bash
cd assets/galeri
count=1
for file in *.jpg; do
    mv "$file" "memory_$count.jpg"
    ((count++))
done
