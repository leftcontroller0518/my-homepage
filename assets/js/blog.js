// ブログ記事を読み込んで表示する関数
async function loadBlogPosts() {
  try {
    // ブログ記事のリストを取得
    const response = await fetch('/assets/data/blog-posts.json');
    const blogPosts = await response.json();
    
    const container = document.getElementById('blog-container');
    if (!container) return;
    
    if (blogPosts.length === 0) {
      container.innerHTML = '<p style="color:var(--gray-600);">まだ記事がありません。</p>';
      return;
    }
    
    // 日付順にソート（新しい順）
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 記事リストを作成
    const ul = document.createElement('ul');
    ul.className = 'log-list';
    
    for (const post of blogPosts) {
      const li = document.createElement('li');
      
      // 日付をフォーマット（XXXX/YY/ZZ → YYYY.MM.DD）
      const dateParts = post.date.split('/');
      const formattedDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;
      
      li.innerHTML = `
        <time>${formattedDate}</time>
        <a href="/blog/${post.slug}/" style="color:var(--gray-700);">${post.title}</a>
      `;
      
      ul.appendChild(li);
    }
    
    container.appendChild(ul);
  } catch (error) {
    console.error('ブログ記事の読み込みに失敗しました:', error);
    const container = document.getElementById('blog-container');
    if (container) {
      container.innerHTML = '<p style="color:var(--gray-600);">記事の読み込みに失敗しました。</p>';
    }
  }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadBlogPosts);
