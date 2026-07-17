// ページロード時のテキスト浮遊アニメーションを追加
document.addEventListener('DOMContentLoaded', function() {
  const fvSection = document.querySelector('.fv-section');
  const firstView = document.querySelector('.first-view');
  
  // ページの完全読み込みを待つためにディレイを追加
  setTimeout(() => {
    fvSection.classList.add('animate');
    firstView.classList.add('animate');
  }, 300);
});

// ウィンドウ読み込み完了時（画像含む）にアニメーションを発火するよう変更
window.addEventListener('load', function() {
  const fvSection = document.querySelector('.fv-section');
  const firstView = document.querySelector('.first-view');
  fvSection.classList.add('animate');
  firstView.classList.add('animate');
});

// フォームセクションにスクロール連動アニメーションを追加
function handleScrollAnimation() {
  const forMansElements = document.querySelectorAll('.for-mans');
  const forMansCase = document.querySelector('.for-mans-case');
  
  if (!forMansCase) return;
  
  const rect = forMansCase.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // スクロールで対象セクションが表示領域に入った瞬間にアニメーションを開始する処理を実装
  if (rect.top < windowHeight && rect.bottom > 0) {
    forMansElements.forEach((element, index) => {
      if (!element.classList.contains('animate')) {
        // Add staggered delay for each element
        setTimeout(() => {
          element.classList.add('animate');
        }, index * 200);
      }
    });
  }
}

// reason-title にスクロールトリガーで浮遊アニメーションを追加
function handleReasonTitleAnimation() {
  const reasonTitle = document.querySelector('.reason-title');
  
  if (!reasonTitle || reasonTitle.classList.contains('animate')) return;
  
  const rect = reasonTitle.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // セクション表示時にアニメーション開始するよう実装
  if (rect.top < windowHeight && rect.bottom > 0) {
    reasonTitle.classList.add('animate');
  }
}

// スクロール連動で理由カードを順番に浮かせるアニメーションを追加
function handleReasonCardsAnimation() {
  const reasonCards = document.querySelectorAll('.reason-card');
  const reasonCardsContainer = document.querySelector('.reason-cards');
  
  if (!reasonCardsContainer || reasonCards.length === 0) return;
  
  const rect = reasonCardsContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // セクション表示時にアニメーションをトリガーする実装
  if (rect.top < windowHeight && rect.bottom > 0) {
    reasonCards.forEach((card, index) => {
      if (!card.classList.contains('animate')) {
        // カード表示を 300ms ごとに順次トリガー
        setTimeout(() => {
          card.classList.add('animate');
        }, index * 300);
      }
    });
  }
}

// スクロールに応じた moto セクションの上昇アニメーション
function handleMotoAnimation() {
  const motoSections = document.querySelectorAll('.moto');
  const motoSection = document.querySelector('.moto-section');
  
  if (!motoSection || motoSections.length === 0) return;
  
  const rect = motoSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // セクションが画面内に表示された瞬間にアニメーションを発火
  if (rect.top < windowHeight && rect.bottom > 0) {
    motoSections.forEach((moto, index) => {
      if (!moto.classList.contains('animate')) {
        // セクションを前の要素から 400ms 遅延させて順次フェードイン
        setTimeout(() => {
          moto.classList.add('animate');
        }, index * 400);
      }
    });
  }
}

// スクロールに応じて moto-tip が上昇するアニメーションを追加
function handleMotoTipAnimation() {
  const motoTip = document.querySelector('.moto-tip');
  
  if (!motoTip || motoTip.classList.contains('animate')) return;
  
  const rect = motoTip.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // セクションが画面内に入ったらアニメーション開始
  if (rect.top < windowHeight && rect.bottom > 0) {
    motoTip.classList.add('animate');
  }
}

// スクロール処理の最適化
let scrollTimeout;
window.addEventListener('scroll', function() {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    handleScrollAnimation();
    handleReasonTitleAnimation();
    handleReasonCardsAnimation();
    handleMotoAnimation();
    handleMotoTipAnimation();
  }, 10);
});

// 初期読み込み時にケースが表示済みの場合
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimation();
  handleReasonTitleAnimation();
  handleReasonCardsAnimation();
  handleMotoAnimation();
  handleMotoTipAnimation();
  initHamburgerMenu();
});

// ハンバーガーメニュー機能
function initHamburgerMenu() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  
  let isMenuOpen = false;
  
  // メニュー機能を切り替える
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      hamburgerMenu.classList.add('active');
      mobileMenu.classList.add('active');
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // 背景スクロールを防止する
    } else {
      hamburgerMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = ''; // スクロールを復元
    }
  }
  
  // メニューを閉じる機能
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      hamburgerMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // イベントリスナー
  hamburgerMenu.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);
  
  // メニューリンク押下でメニューを閉じる処理を追加
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // メニュー：Escapeキーで閉じる機能追加
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });
  
  // 画面幅が950px以上になった場合、メニューを自動で閉じるよう修正
  window.addEventListener('resize', () => {
    if (window.innerWidth > 950 && isMenuOpen) {
      closeMenu();
    }
  });
}

  function showSectionBasedOnNetwork() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      console.log("Connection type:", connection.effectiveType);

      // "4g" usually means fast enough for video
      if (connection.effectiveType === "4g") {
        document.getElementById("fv-static").style.display = "none";
        document.getElementById("fv-video").style.display = "block";
      } else {
        document.getElementById("fv-static").style.display = "block";
        document.getElementById("fv-video").style.display = "none";
      }
    } else {
      // Fallback: if API not supported, default to static for safety
      document.getElementById("fv-static").style.display = "block";
      document.getElementById("fv-video").style.display = "none";
    }
  }

  showSectionBasedOnNetwork();

