// ヘッダーとフッターをインクルードする関数
async function includeHeader() {
  try {
    const response = await fetch('/header.html');
    const html = await response.text();
    document.getElementById('header-placeholder').innerHTML = html;
    
    // 現在のページのナビゲーションリンクをハイライト
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      // パスが一致する場合、またはルートページの場合
      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  } catch (error) {
    console.error('ヘッダーの読み込みに失敗しました:', error);
  }
}

async function includeFooter() {
  try {
    const response = await fetch('/footer.html');
    const html = await response.text();
    document.getElementById('footer-placeholder').innerHTML = html;
  } catch (error) {
    console.error('フッターの読み込みに失敗しました:', error);
  }
}

// モバイルメニュー機能
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  const navOverlay = document.querySelector('.nav-overlay');
  
  if (!menuToggle || !navList || !navOverlay) return;
  
  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
  }
  
  menuToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);
  
  // メニューリンクをクリックしたらメニューを閉じる
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', async () => {
  await includeHeader();
  await includeFooter();
  
  // ヘッダー読み込み後にモバイルメニューを初期化
  initMobileMenu();
});