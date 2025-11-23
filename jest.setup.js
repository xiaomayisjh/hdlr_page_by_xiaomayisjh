// Jest 设置文件
// 在每个测试之前加载 HTML 和 CSS
const fs = require('fs');
const path = require('path');

// 读取 HTML 文件
const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

// 读取 CSS 文件
const css = fs.readFileSync(path.resolve(__dirname, 'styles.css'), 'utf8');

// 读取 JavaScript 文件
const js = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf8');

// 在每个测试之前设置 DOM
beforeEach(() => {
  document.documentElement.innerHTML = html;
  
  // 将 CSS 注入到 DOM 中
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  
  // 执行 JavaScript 代码
  // 移除 DOMContentLoaded 事件监听器，直接执行代码
  const jsCode = js.replace(/document\.addEventListener\('DOMContentLoaded',\s*function\(\)\s*\{/g, '(function() {')
                   .replace(/\}\);[\s]*$/g, '})();');
  eval(jsCode);
});

// 在每个测试之后清理
afterEach(() => {
  document.documentElement.innerHTML = '';
  document.body.style.overflow = '';
});
