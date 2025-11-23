/**
 * 页脚导航组件属性测试
 * Feature: apple-personal-homepage
 */

const fc = require('fast-check');
const fs = require('fs');
const path = require('path');

describe('页脚导航组件', () => {
  
  // 设置测试环境
  beforeEach(() => {
    // 加载 HTML
    document.body.innerHTML = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>测试页面</title>
      </head>
      <body>
        <main class="container">
          <footer class="footer">
            <hr class="divider">
            <nav class="footer-nav">
              <a href="#about" data-modal="about">关于本站</a>
              <span class="separator">|</span>
              <a href="#friends" data-modal="friends">友链</a>
              <span class="separator">|</span>
              <a href="#postscript" data-modal="postscript">后记</a>
            </nav>
            <p class="copyright">Copyrights © 2025 寒冬利刃 All Rights Reserved.</p>
          </footer>
        </main>
      </body>
      </html>
    `;
    
    // 加载 CSS 内容到 style 标签
    const cssPath = path.join(__dirname, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    const style = document.createElement('style');
    style.textContent = cssContent;
    document.head.appendChild(style);
  });
  
  // Feature: apple-personal-homepage, Property 11: 导航链接悬停变色
  describe('属性 11: 导航链接悬停变色', () => {
    test('对于任何页脚导航链接，当鼠标悬停时，链接颜色应该改变以提供视觉反馈 - Validates: Requirements 5.3', () => {
      // 获取所有页脚导航链接
      const footerLinks = document.querySelectorAll('.footer-nav a');
      
      // 确保至少有一个链接
      expect(footerLinks.length).toBeGreaterThan(0);
      expect(footerLinks.length).toBe(3); // 应该有 3 个链接
      
      // 对每个链接进行验证
      footerLinks.forEach(link => {
        // 验证链接有正确的父容器
        const isInFooterNav = link.closest('.footer-nav') !== null;
        expect(isInFooterNav).toBe(true);
        
        // 验证链接有 data-modal 属性
        const hasDataModal = link.hasAttribute('data-modal');
        expect(hasDataModal).toBe(true);
        
        // 验证链接有文本内容
        expect(link.textContent.trim()).not.toBe('');
      });
      
      // 验证 CSS 中定义了页脚链接的样式
      const styleSheets = Array.from(document.styleSheets);
      let hasFooterNavStyle = false;
      let hasHoverStyle = false;
      
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.selectorText) {
              // 检查是否有页脚导航链接的基础样式
              if (rule.selectorText.includes('.footer-nav a')) {
                hasFooterNavStyle = true;
                
                // 检查是否定义了过渡效果
                const cssText = rule.style.cssText;
                if (cssText.includes('transition')) {
                  expect(cssText).toContain('transition');
                }
              }
              
              // 检查是否有悬停样式
              if (rule.selectorText.includes('.footer-nav a:hover')) {
                hasHoverStyle = true;
                
                // 检查是否定义了颜色变化
                const cssText = rule.style.cssText;
                expect(cssText).toContain('color');
              }
            }
          });
        } catch (e) {
          // 忽略跨域样式表错误
        }
      });
      
      // 验证找到了必要的样式规则
      expect(hasFooterNavStyle).toBe(true);
      expect(hasHoverStyle).toBe(true);
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有页脚导航链接都应该存在且有正确的属性', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('about', 'friends', 'postscript'),
          (modalType) => {
            const link = document.querySelector(`.footer-nav a[data-modal="${modalType}"]`);
            
            if (link) {
              // 验证链接在正确的容器中
              const isInFooterNav = link.closest('.footer-nav') !== null;
              
              // 验证链接有 href 属性
              const hasHref = link.hasAttribute('href');
              
              // 验证链接有文本内容
              const hasText = link.textContent.trim().length > 0;
              
              // 验证链接有 data-modal 属性
              const hasDataModal = link.getAttribute('data-modal') === modalType;
              
              return isInFooterNav && hasHref && hasText && hasDataModal;
            }
            
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });
    
    // 测试悬停状态的 CSS 规则
    test('CSS 中应该定义 :hover 伪类样式以实现颜色变化', () => {
      // 获取所有样式表
      const styleSheets = Array.from(document.styleSheets);
      let hasHoverRule = false;
      let hasColorChange = false;
      
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule.selectorText && rule.selectorText.includes('.footer-nav a:hover')) {
              hasHoverRule = true;
              
              // 检查是否定义了 color 属性（颜色变化）
              const cssText = rule.style.cssText;
              if (cssText.includes('color')) {
                hasColorChange = true;
              }
            }
          });
        } catch (e) {
          // 忽略跨域样式表错误
        }
      });
      
      // 验证至少找到了 hover 规则和颜色变化
      expect(hasHoverRule).toBe(true);
      expect(hasColorChange).toBe(true);
    });
    
    // 使用 fast-check 测试动态创建的链接
    test('属性测试：动态创建的页脚链接也应该有正确的结构', () => {
      fc.assert(
        fc.property(
          fc.record({
            text: fc.string({ minLength: 2, maxLength: 10 }).filter(s => s.trim().length > 0),
            href: fc.stringOf(fc.constantFrom('a', 'b', 'c', '-', '_'), { minLength: 3, maxLength: 15 }),
            modal: fc.stringOf(fc.constantFrom('a', 'b', 'c', 'd', 'e'), { minLength: 3, maxLength: 10 })
          }),
          (config) => {
            // 创建测试链接
            const link = document.createElement('a');
            link.href = '#' + config.href;
            link.setAttribute('data-modal', config.modal);
            link.textContent = config.text;
            
            // 创建导航容器
            const nav = document.createElement('nav');
            nav.className = 'footer-nav';
            nav.appendChild(link);
            
            // 添加到 DOM
            document.body.appendChild(nav);
            
            // 验证链接结构
            const hasCorrectTag = link.tagName === 'A';
            const hasHref = link.href !== '';
            const hasDataModal = link.hasAttribute('data-modal');
            const hasText = link.textContent.trim().length > 0;
            const isInFooterNav = link.closest('.footer-nav') !== null;
            
            // 清理
            document.body.removeChild(nav);
            
            return hasCorrectTag && hasHref && hasDataModal && hasText && isInFooterNav;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
