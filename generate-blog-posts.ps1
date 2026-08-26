# blog-posts.jsonを生成
$posts = @()

Get-ChildItem -Path "blog" -Filter "*.md" | ForEach-Object {
    # ファイル名からslugを取得（.mdを除く）
    $slug = $_.BaseName
    
    # ファイル内容を読み込む（UTF-8）
    $lines = Get-Content $_.FullName -Encoding UTF8
    
    if ($lines.Count -ge 2) {
        # 1行目から日付を取得
        $date = $lines[0]
        
        # 2行目からタイトルを取得（# を除く）
        $title = $lines[1] -replace "^# ", ""
        
        # オブジェクトを作成
        $post = [PSCustomObject]@{
            title = $title
            date = $date
            slug = $slug
        }
        
        $posts += $post
    }
}

# JSONに変換して保存
$posts | ConvertTo-Json | Out-File -FilePath "assets/data/blog-posts.json" -Encoding UTF8

Write-Host "blog-posts.jsonを生成しました"
Write-Host "記事数: $($posts.Count)"
