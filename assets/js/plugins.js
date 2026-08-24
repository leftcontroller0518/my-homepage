// プラグインデータを読み込んで表示する関数
async function loadPlugins() {
  try {
    const response = await fetch('/assets/data/plugins.json');
    const plugins = await response.json();
    
    const container = document.getElementById('plugins-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 各プラグインのマークダウンファイルを読み込んでカードを作成
    for (const plugin of plugins) {
      try {
        const mdResponse = await fetch(plugin.md);
        const mdContent = await mdResponse.text();
        
        // マークダウンの最初の見出しからタイトルを抽出
        const titleMatch = mdContent.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].trim() : plugin.title || 'プラグイン';
        
        const card = createPluginCard(plugin, title);
        container.appendChild(card);
      } catch (error) {
        console.error(`マークダウンファイルの読み込みに失敗しました (${plugin.md}):`, error);
        // マークダウン読み込み失敗時はtitleフィールドを使用
        const card = createPluginCard(plugin, plugin.title || 'プラグイン');
        container.appendChild(card);
      }
    }
  } catch (error) {
    console.error('プラグインデータの読み込みに失敗しました:', error);
  }
}

// プラグインカードを作成する関数
function createPluginCard(plugin, title) {
  const article = document.createElement('article');
  article.className = 'card';
  
  article.innerHTML = `
    <div class="card__head">
      <div class="card__icon">
        <i class="${plugin.icon}"></i>
      </div>
      <div>
        <h3>${title}</h3>
        <span class="card__tag">${plugin.version}</span>
      </div>
    </div>
    <div class="card__footer">
      <a class="btn btn--secondary" href="${plugin.url}">
        <i class="fa-solid fa-info-circle"></i> 詳細を見る
      </a>
    </href>
  `;
  
  return article;
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  loadPlugins();
});
