// 页面过渡效果
document.addEventListener('DOMContentLoaded', function() {
  // 1. 为当前页面添加入场动画
  document.body.classList.add('page-loaded-fade-in');

  // 2. 处理内部链接点击，实现出场动画
  const internalLinks = document.querySelectorAll(
    'a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([download])'
  );

  internalLinks.forEach(link => {
    // 确保是站内链接
    const linkUrl = new URL(link.href, window.location.origin);
    if (linkUrl.hostname === window.location.hostname) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const destinationUrl = this.href;

        document.body.classList.add('page-is-leaving');

        // 等待出场动画结束后再跳转
        setTimeout(function() {
          window.location.href = destinationUrl;
        }, 300);
      });
    }
  });
});

// 3. 处理浏览器后退/前进按钮导致的bfcache问题
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    document.body.classList.remove('page-is-leaving');
    document.body.classList.remove('page-loaded-fade-in');
    void document.body.offsetWidth;
    document.body.classList.add('page-loaded-fade-in');
  }
}); 