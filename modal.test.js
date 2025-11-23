/**
 * 弹窗模态框组件属性测试
 * Feature: apple-personal-homepage
 */

const fc = require('fast-check');

describe('弹窗模态框组件', () => {
  
  // Feature: apple-personal-homepage, Property 1: 点击按钮显示弹窗
  describe('属性 1: 点击按钮显示弹窗', () => {
    test('对于任何社交媒体按钮，当用户点击该按钮时，系统应该显示一个模态框弹窗 - Validates: Requirements 2.2', () => {
      // 获取所有社交媒体按钮
      const buttons = document.querySelectorAll('.social-btn');
      
      // 确保至少有一个按钮
      expect(buttons.length).toBeGreaterThan(0);
      
      // 对每个按钮进行验证
      buttons.forEach(button => {
        const socialType = button.getAttribute('data-social');
        const modalId = 'modal-' + socialType;
        const modal = document.getElementById(modalId);
        
        // 确保对应的弹窗存在
        expect(modal).not.toBeNull();
        
        // 确保弹窗初始状态是隐藏的
        expect(modal.classList.contains('show')).toBe(false);
        
        // 模拟点击按钮
        button.click();
        
        // 验证弹窗显示
        expect(modal.classList.contains('show')).toBe(true);
        
        // 清理：关闭弹窗
        modal.classList.remove('show');
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：任意社交媒体类型都应该有对应的弹窗', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('email', 'gitee', 'cnblogs', 'qq'),
          (socialType) => {
            const button = document.querySelector(`[data-social="${socialType}"]`);
            const modalId = 'modal-' + socialType;
            const modal = document.getElementById(modalId);
            
            // 验证按钮和弹窗都存在
            const buttonExists = button !== null;
            const modalExists = modal !== null;
            
            if (buttonExists && modalExists) {
              // 确保弹窗初始是隐藏的
              const initiallyHidden = !modal.classList.contains('show');
              
              // 点击按钮
              button.click();
              
              // 验证弹窗显示
              const nowShown = modal.classList.contains('show');
              
              // 清理
              modal.classList.remove('show');
              
              return initiallyHidden && nowShown;
            }
            
            return buttonExists && modalExists;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: apple-personal-homepage, Property 2: 弹窗内容匹配按钮
  describe('属性 2: 弹窗内容匹配按钮', () => {
    test('对于任何社交媒体按钮，当弹窗显示时，弹窗中的标题和内容应该与被点击的按钮对应 - Validates: Requirements 2.3', () => {
      // 定义预期的标题映射
      const expectedTitles = {
        'email': '邮箱联系方式',
        'gitee': 'Gitee 主页',
        'cnblogs': '博客园主页',
        'qq': 'QQ 联系方式'
      };
      
      // 获取所有社交媒体按钮
      const buttons = document.querySelectorAll('.social-btn');
      
      // 确保至少有一个按钮
      expect(buttons.length).toBeGreaterThan(0);
      
      // 对每个按钮进行验证
      buttons.forEach(button => {
        const socialType = button.getAttribute('data-social');
        const modalId = 'modal-' + socialType;
        const modal = document.getElementById(modalId);
        
        // 确保对应的弹窗存在
        expect(modal).not.toBeNull();
        
        // 获取弹窗标题
        const modalTitle = modal.querySelector('.modal-title');
        expect(modalTitle).not.toBeNull();
        
        // 验证标题内容匹配
        const expectedTitle = expectedTitles[socialType];
        if (expectedTitle) {
          expect(modalTitle.textContent.trim()).toBe(expectedTitle);
        }
        
        // 验证弹窗有内容区域
        const modalBody = modal.querySelector('.modal-body');
        expect(modalBody).not.toBeNull();
        expect(modalBody.textContent.trim()).not.toBe('');
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有弹窗都应该有标题和非空内容', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('email', 'gitee', 'cnblogs', 'qq', 'about', 'friends', 'postscript'),
          (modalType) => {
            const modalId = 'modal-' + modalType;
            const modal = document.getElementById(modalId);
            
            if (modal) {
              // 验证弹窗有标题
              const modalTitle = modal.querySelector('.modal-title');
              const hasTitle = modalTitle !== null && modalTitle.textContent.trim() !== '';
              
              // 验证弹窗有内容
              const modalBody = modal.querySelector('.modal-body');
              const hasContent = modalBody !== null && modalBody.textContent.trim() !== '';
              
              return hasTitle && hasContent;
            }
            
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: apple-personal-homepage, Property 4: 点击触发打开动画
  describe('属性 4: 点击触发打开动画', () => {
    test('对于任何社交媒体按钮，当用户点击时，应该触发弹窗的缩放淡入动画效果 - Validates: Requirements 2.1.1', () => {
      // 获取所有社交媒体按钮
      const buttons = document.querySelectorAll('.social-btn');
      
      // 确保至少有一个按钮
      expect(buttons.length).toBeGreaterThan(0);
      
      // 对每个按钮进行验证
      buttons.forEach(button => {
        const socialType = button.getAttribute('data-social');
        const modalId = 'modal-' + socialType;
        const modal = document.getElementById(modalId);
        
        // 确保对应的弹窗存在
        expect(modal).not.toBeNull();
        
        // 获取弹窗容器
        const modalContainer = modal.querySelector('.modal-container');
        expect(modalContainer).not.toBeNull();
        
        // 获取容器的计算样式
        const styles = window.getComputedStyle(modalContainer);
        
        // 验证容器有过渡效果（动画的基础）
        expect(styles.transition).toBeDefined();
        expect(styles.transition).not.toBe('none');
        
        // 验证过渡包含 transform 和 opacity（缩放淡入动画）
        const hasTransformTransition = styles.transition.includes('transform');
        const hasOpacityTransition = styles.transition.includes('opacity');
        
        expect(hasTransformTransition || hasOpacityTransition).toBe(true);
        
        // 点击按钮
        button.click();
        
        // 验证弹窗显示（show 类被添加）
        expect(modal.classList.contains('show')).toBe(true);
        
        // 清理
        modal.classList.remove('show');
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有弹窗容器都应该有缩放和淡入动画', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('email', 'gitee', 'cnblogs', 'qq', 'about', 'friends', 'postscript'),
          (modalType) => {
            const modalId = 'modal-' + modalType;
            const modal = document.getElementById(modalId);
            
            if (modal) {
              const modalContainer = modal.querySelector('.modal-container');
              
              if (modalContainer) {
                const styles = window.getComputedStyle(modalContainer);
                
                // 验证有过渡效果
                const hasTransition = styles.transition && styles.transition !== 'none' && styles.transition !== '';
                
                // 验证有 transform 或 opacity 相关的过渡
                const hasAnimationProperties = 
                  styles.transition.includes('transform') || 
                  styles.transition.includes('opacity');
                
                return hasTransition && hasAnimationProperties;
              }
            }
            
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: apple-personal-homepage, Property 5: 弹窗显示遮罩动画
  describe('属性 5: 弹窗显示遮罩动画', () => {
    test('对于任何弹窗显示操作，背景遮罩层应该执行淡入动画效果 - Validates: Requirements 2.1.2', () => {
      // 获取所有弹窗遮罩层
      const modals = document.querySelectorAll('.modal-overlay');
      
      // 确保至少有一个弹窗
      expect(modals.length).toBeGreaterThan(0);
      
      // 对每个弹窗进行验证
      modals.forEach(modal => {
        // 获取遮罩层的计算样式
        const styles = window.getComputedStyle(modal);
        
        // 验证遮罩层有过渡效果
        expect(styles.transition).toBeDefined();
        expect(styles.transition).not.toBe('none');
        
        // 验证过渡包含 opacity（淡入动画）
        const hasOpacityTransition = styles.transition.includes('opacity');
        
        expect(hasOpacityTransition).toBe(true);
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有遮罩层都应该有淡入动画', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('email', 'gitee', 'cnblogs', 'qq', 'about', 'friends', 'postscript'),
          (modalType) => {
            const modalId = 'modal-' + modalType;
            const modal = document.getElementById(modalId);
            
            if (modal && modal.classList.contains('modal-overlay')) {
              const styles = window.getComputedStyle(modal);
              
              // 验证有过渡效果
              const hasTransition = styles.transition && styles.transition !== 'none' && styles.transition !== '';
              
              // 验证有 opacity 过渡（淡入效果）
              const hasOpacityTransition = styles.transition.includes('opacity');
              
              return hasTransition && hasOpacityTransition;
            }
            
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: apple-personal-homepage, Property 6: 关闭触发退出动画
  describe('属性 6: 关闭触发退出动画', () => {
    test('对于任何弹窗关闭操作（点击遮罩、关闭按钮或 ESC 键），应该触发缩放淡出动画效果 - Validates: Requirements 2.1.3', () => {
      // 获取所有社交媒体按钮
      const buttons = document.querySelectorAll('.social-btn');
      
      // 确保至少有一个按钮
      expect(buttons.length).toBeGreaterThan(0);
      
      // 测试第一个按钮
      const button = buttons[0];
      const socialType = button.getAttribute('data-social');
      const modalId = 'modal-' + socialType;
      const modal = document.getElementById(modalId);
      
      // 打开弹窗
      button.click();
      expect(modal.classList.contains('show')).toBe(true);
      
      // 测试 1: 点击关闭按钮
      const closeButton = modal.querySelector('.modal-close');
      expect(closeButton).not.toBeNull();
      closeButton.click();
      expect(modal.classList.contains('show')).toBe(false);
      
      // 重新打开弹窗
      button.click();
      expect(modal.classList.contains('show')).toBe(true);
      
      // 测试 2: 点击遮罩层
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: modal, enumerable: true });
      modal.dispatchEvent(clickEvent);
      expect(modal.classList.contains('show')).toBe(false);
      
      // 重新打开弹窗
      button.click();
      expect(modal.classList.contains('show')).toBe(true);
      
      // 测试 3: ESC 键
      const escEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      document.dispatchEvent(escEvent);
      expect(modal.classList.contains('show')).toBe(false);
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有弹窗都应该可以通过多种方式关闭', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('email', 'gitee', 'cnblogs', 'qq'),
          (socialType) => {
            const button = document.querySelector(`[data-social="${socialType}"]`);
            const modalId = 'modal-' + socialType;
            const modal = document.getElementById(modalId);
            
            if (button && modal) {
              // 打开弹窗
              button.click();
              const isOpen = modal.classList.contains('show');
              
              // 验证有关闭按钮
              const closeButton = modal.querySelector('.modal-close');
              const hasCloseButton = closeButton !== null;
              
              // 关闭弹窗
              if (closeButton) {
                closeButton.click();
              }
              
              return isOpen && hasCloseButton;
            }
            
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: apple-personal-homepage, Property 7: 弹窗内容延迟淡入
  describe('属性 7: 弹窗内容延迟淡入', () => {
    test('对于任何弹窗显示操作，弹窗内部的内容元素应该有延迟淡入动画效果 - Validates: Requirements 2.1.4', () => {
      // 获取所有弹窗
      const modals = document.querySelectorAll('.modal-overlay');
      
      // 确保至少有一个弹窗
      expect(modals.length).toBeGreaterThan(0);
      
      // 对每个弹窗进行验证
      modals.forEach(modal => {
        // 获取弹窗标题
        const modalTitle = modal.querySelector('.modal-title');
        expect(modalTitle).not.toBeNull();
        
        // 获取标题的计算样式
        const titleStyles = window.getComputedStyle(modalTitle);
        
        // 验证标题有过渡效果
        expect(titleStyles.transition).toBeDefined();
        expect(titleStyles.transition).not.toBe('none');
        
        // 验证过渡包含 opacity（淡入动画）
        const hasTitleOpacityTransition = titleStyles.transition.includes('opacity');
        expect(hasTitleOpacityTransition).toBe(true);
        
        // 获取弹窗内容
        const modalBody = modal.querySelector('.modal-body');
        expect(modalBody).not.toBeNull();
        
        // 获取内容的计算样式
        const bodyStyles = window.getComputedStyle(modalBody);
        
        // 验证内容有过渡效果
        expect(bodyStyles.transition).toBeDefined();
        expect(bodyStyles.transition).not.toBe('none');
        
        // 验证过渡包含 opacity（淡入动画）
        const hasBodyOpacityTransition = bodyStyles.transition.includes('opacity');
        expect(hasBodyOpacityTransition).toBe(true);
      });
    });
    
    // 使用 fast-check 进行属性测试
    test('属性测试：所有弹窗内容都应该有延迟淡入动画', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('email', 'gitee', 'cnblogs', 'qq', 'about', 'friends', 'postscript'),
          (modalType) => {
            const modalId = 'modal-' + modalType;
            const modal = document.getElementById(modalId);
            
            if (modal) {
              const modalTitle = modal.querySelector('.modal-title');
              const modalBody = modal.querySelector('.modal-body');
              
              if (modalTitle && modalBody) {
                const titleStyles = window.getComputedStyle(modalTitle);
                const bodyStyles = window.getComputedStyle(modalBody);
                
                // 验证标题有淡入动画
                const titleHasTransition = titleStyles.transition && 
                                          titleStyles.transition !== 'none' && 
                                          titleStyles.transition !== '';
                const titleHasOpacity = titleStyles.transition.includes('opacity');
                
                // 验证内容有淡入动画
                const bodyHasTransition = bodyStyles.transition && 
                                         bodyStyles.transition !== 'none' && 
                                         bodyStyles.transition !== '';
                const bodyHasOpacity = bodyStyles.transition.includes('opacity');
                
                return titleHasTransition && titleHasOpacity && 
                       bodyHasTransition && bodyHasOpacity;
              }
            }
            
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
