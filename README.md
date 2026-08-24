# 左コントローラー 公式サイト

HTML と CSS のみで構築した静的サイトです。JavaScript の自作コードは
使用していません（外部ライブラリの読み込みのみ）。

## フォルダ構成 / ディレクトリ型ルーティング

各ページは「フォルダ + index.html」の形で作られています。
これにより、拡張子なしの綺麗な URL（ディレクトリ型ルーティング）で
アクセスできます。ほとんどの静的サーバー（Apache / Nginx / GitHub Pages
など）は、フォルダへのアクセス時に自動的にその中の `index.html` を
返すため、特別な設定なしでこの構成のまま動作します。

```
/                          → index.html（トップページ）
/profile/                  → profile/index.html（プロフィール）
/works/                    → works/index.html（作品一覧）
/plugins/                  → plugins/index.html（プラグイン配布一覧）
/plugins/plugin-caption-deco/      → プラグイン詳細ページ（例1）
/plugins/plugin-timeline-utility/  → プラグイン詳細ページ（例2）
/contact/                  → contact/index.html（お問い合わせ）
/404.html                  → 404エラーページ
/assets/css/style.css      → 共通スタイルシート
```

## リダイレクト

古い形式のURLからディレクトリ型URLへ移動するための
リダイレクト用ページを用意しています（`<meta http-equiv="refresh">`
を使った、JavaScript不要のHTMLだけのリダイレクトです）。

| 旧URL              | リダイレクト先   |
|---------------------|------------------|
| /profile.html        | /profile/        |
| /works.html          | /works/          |
| /contact.html        | /contact/        |
| /home.html           | /                |
| /plugin/             | /plugins/        |

また、サーバーが Apache の場合は同梱の `.htaccess` により
サーバー側で正式な 301 リダイレクトも行われます（Nginxなど
Apache以外のサーバーであれば `.htaccess` は無視されるか、
不要であれば削除してください）。

## 置き換えが必要な箇所（プレースホルダー）

実際の情報に差し替えてご利用ください。各ファイル内に
`<!-- 実際の◯◯に差し替えてください -->` というコメントを
付けている箇所が対象です。

- プロフィール情報（活動開始時期など）… `profile/index.html`
- 作品タイトル・リンク… `works/index.html`
- プラグイン名・バージョン・ダウンロードリンク…
  `plugins/index.html` および `plugins/*/index.html`
- SNSリンク・メールアドレス… 各ページのフッター、`contact/index.html`
- お知らせ本文… `index.html`
- `robots.txt` / `sitemap.xml` 内のドメイン
  （`your-domain.example.com` の部分）を実際のドメインに変更してください。

## 使用ライブラリ（すべてCDN読み込み）

- **normalize.css** … ブラウザ間の表示差異をリセット
- **Pure.css** … グリッドレイアウト用の軽量CSSフレームワーク
- **Font Awesome 6** … アイコン表示
- **Google Fonts**（Space Grotesk / Noto Sans JP / JetBrains Mono）… 書体

いずれもCDN経由の読み込みのため、公開時にはインターネット接続が
必要です（オフライン運用したい場合は各ライブラリのファイルを
ダウンロードして `/assets/` 以下に配置し、リンク先をローカルパスに
書き換えてください）。

## デザインについて

白・黒・青の3色を基調とし、グラデーションは使用していません。
「左コントローラー」という名前にちなみ、コントローラーのボタン
（keycap）や動画編集ソフトのタイムラインを思わせる区切り線、
クロップハンドル風の角ブラケットをモチーフにしています。
アニメーションは hover 時の色の切り替えなど最小限のみで、
自動再生のアニメーションやスクロール演出は使用していません。

## アップロード方法

サーバーはすでにお持ちとのことですので、このZIP内のファイルを
フォルダ構成を保ったまま、サーバーの公開ディレクトリ（`public_html`
など）直下にそのままアップロードしてください。
