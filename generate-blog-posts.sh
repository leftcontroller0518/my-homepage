#!/bin/bash

# blog-posts.jsonを生成
echo "[" > assets/data/blog-posts.json
first=true
for file in blog/*.md; do
  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> assets/data/blog-posts.json
  fi
  
  # ファイル名からslugを取得（.mdを除く）
  slug=$(basename "$file" .md)
  
  # 1行目から日付を取得
  date=$(head -n 1 "$file")
  
  # 2行目からタイトルを取得（# を除く）
  title=$(sed -n '2p' "$file" | sed 's/^# //')
  
  # JSON形式で出力
  echo "  {\"title\": \"$title\", \"date\": \"$date\", \"slug\": \"$slug\"}" >> assets/data/blog-posts.json
done
echo "]" >> assets/data/blog-posts.json

echo "blog-posts.jsonを生成しました"
