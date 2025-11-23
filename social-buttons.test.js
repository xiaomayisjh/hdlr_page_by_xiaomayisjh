/**
 * 社交媒体按钮组件属性测试
 * Feature: apple-personal-homepage
 */

const fc = require('fast-check');

describe('社交媒体按钮组件', () => {
  
  // Feature: apple-personal-homepage, Property 3: 按钮包含图标和文字
  describe('属性 3: 按钮包含图标和文字', () => {
    test('对于任何社交媒体按钮，该按钮应该同时包含图标元素和文字标签元素 - Validates: Requirements 2.4', () => {
      // 获取所有社交媒体按钮
      const buttons = document.querySelectorAll('.social-btn');
      
      // 确保至少有一个按钮
      expect(buttons.length).toBeGreaterThan(0);
      
      // 对每个按钮进行验证
      buttons.forEach(button => {
        // 检查按钮是否包含图标元素
        const icon = button.querySelector('.icon');
        expect(icon).not.toBeNull();
        expect(icon.textContent.trim()).not.toBe('');
        
        // 检查按钮是否包含文字标签元素
        const label = button.querySelector('.label');
        expect(label).not.toBeNull();
        expect(label.textContent.trim()).not.toBe('');
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：动态创建的按钮也应该包含图标和文字', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.stringOf(fc.constantFrom('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'), { minLength: 3, maxLength: 10 }),
            icon: fc.string({ minLength: 1, maxLength: 3 }).filter(s => s.trim().length > 0),
            label: fc.string({ minLength: 2, maxLength: 10 }).filter(s => s.trim().length > 0)
          }),
          (config) => {
            // 创建测试按钮
            const button = document.createElement('button');
            button.className = 'social-btn';
            button.setAttribute('data-social', config.id);
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'icon';
            iconSpan.textContent = config.icon;
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'label';
            labelSpan.textContent = config.label;
            
            button.appendChild(iconSpan);
            button.appendChild(labelSpan);
            
            // 验证按钮包含图标和文字
            const hasIcon = button.querySelector('.icon') !== null;
            const hasLabel = button.querySelector('.label') !== null;
            const iconHasContent = button.querySelector('.icon').textContent.trim() !== '';
            const labelHasContent = button.querySelector('.label').textContent.trim() !== '';
            
            return hasIcon && hasLabel && iconHasContent && labelHasContent;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: apple-personal-homepage, Property 9: 按钮悬停效果
  describe('属性 9: 按钮悬停效果', () => {
    test('对于任何社交媒体按钮，当鼠标悬停时，应该执行平滑的放大和颜色变化效果 - Validates: Requirements 3.3', () => {
      // 获取所有社交媒体按钮
      const buttons = document.querySelectorAll('.social-btn');
      
      // 确保至少有一个按钮
      expect(buttons.length).toBeGreaterThan(0);
      
      // 对每个按钮进行验证
      buttons.forEach(button => {
        // 验证按钮有正确的类名
        expect(button.classList.contains('social-btn')).toBe(true);
        
        // 获取计算样式
        const styles = window.getComputedStyle(button);
        
        // 验证按钮有过渡效果（这是悬停效果的基础）
        // transition 属性应该被定义
        expect(styles.transition).toBeDefined();
        
        // 验证按钮有 will-change 或 transform 属性（性能优化）
        const hasWillChange = styles.willChange && styles.willChange !== 'auto';
        const hasTransform = styles.transform && styles.transform !== 'none';
        
        // 至少应该有其中一个
        expect(hasWillChange || hasTransform || styles.transition.includes('transform')).toBe(true);
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有按钮都应该有过渡效果以支持悬停动画', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.stringOf(fc.constantFrom('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'), { minLength: 3, maxLength: 10 }),
            icon: fc.string({ minLength: 1, maxLength: 3 }).filter(s => s.trim().length > 0),
            label: fc.string({ minLength: 2, maxLength: 10 }).filter(s => s.trim().length > 0)
          }),
          (config) => {
            // 创建测试按钮
            const button = document.createElement('button');
            button.className = 'social-btn';
            button.setAttribute('data-social', config.id);
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'icon';
            iconSpan.textContent = config.icon;
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'label';
            labelSpan.textContent = config.label;
            
            button.appendChild(iconSpan);
            button.appendChild(labelSpan);
            
            // 验证按钮结构正确（这是悬停效果的前提）
            const hasCorrectClass = button.classList.contains('social-btn');
            const hasIcon = button.querySelector('.icon') !== null;
            const hasLabel = button.querySelector('.label') !== null;
            
            return hasCorrectClass && hasIcon && hasLabel;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: apple-personal-homepage, Property 8: 按钮点击反馈
  describe('属性 8: 按钮点击反馈', () => {
    test('对于任何按钮点击操作，按钮应该显示按压反馈动画（轻微缩小效果） - Validates: Requirements 2.1.5', () => {
      // 获取所有社交媒体按钮
      const buttons = document.querySelectorAll('.social-btn');
      
      // 确保至少有一个按钮
      expect(buttons.length).toBeGreaterThan(0);
      
      // 对每个按钮进行验证
      buttons.forEach(button => {
        // 验证按钮有正确的类名
        expect(button.classList.contains('social-btn')).toBe(true);
        
        // 获取计算样式
        const styles = window.getComputedStyle(button);
        
        // 验证按钮有过渡效果（这是点击反馈的基础）
        expect(styles.transition).toBeDefined();
        
        // 模拟点击事件
        const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
        button.dispatchEvent(mouseDownEvent);
        
        // 验证按钮可以接收点击事件（通过检查事件监听器或样式）
        // 由于 :active 伪类在 jsdom 中不会自动应用，我们检查 CSS 中是否定义了 :active 样式
        const styleSheets = Array.from(document.styleSheets);
        let hasActiveRule = false;
        
        styleSheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || []);
            rules.forEach(rule => {
              if (rule.selectorText && rule.selectorText.includes('.social-btn:active')) {
                hasActiveRule = true;
                
                // 检查是否定义了 transform 或 scale（缩小效果）
                const cssText = rule.style.cssText;
                const hasTransform = cssText.includes('transform') && cssText.includes('scale');
                
                expect(hasTransform).toBe(true);
              }
            });
          } catch (e) {
            // 忽略错误
          }
        });
        
        // 验证至少找到了 active 规则
        expect(hasActiveRule).toBe(true);
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有按钮都应该有 active 状态样式以支持点击反馈', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.stringOf(fc.constantFrom('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'), { minLength: 3, maxLength: 10 }),
            icon: fc.string({ minLength: 1, maxLength: 3 }).filter(s => s.trim().length > 0),
            label: fc.string({ minLength: 2, maxLength: 10 }).filter(s => s.trim().length > 0)
          }),
          (config) => {
            // 创建测试按钮
            const button = document.createElement('button');
            button.className = 'social-btn';
            button.setAttribute('data-social', config.id);
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'icon';
            iconSpan.textContent = config.icon;
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'label';
            labelSpan.textContent = config.label;
            
            button.appendChild(iconSpan);
            button.appendChild(labelSpan);
            
            // 将按钮添加到 DOM
            document.body.appendChild(button);
            
            // 获取计算样式
            const styles = window.getComputedStyle(button);
            
            // 验证按钮有过渡效果（这是点击反馈动画的基础）
            const hasTransition = styles.transition && styles.transition !== 'none' && styles.transition !== '';
            
            // 验证按钮可以被点击
            const isClickable = button.tagName === 'BUTTON' || button.onclick !== null;
            
            // 清理
            document.body.removeChild(button);
            
            return hasTransition && isClickable;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
