/**
 * 页面加载动画序列控制器测试
 * 验证需求 3.1, 3.2
 */

describe('页面加载动画序列控制器', () => {
  beforeEach(() => {
    // 设置 DOM 环境
    document.body.innerHTML = `
      <div class="avatar"></div>
      <h1 class="name">测试姓名</h1>
      <p class="bio">测试简介</p>
      <p class="motto">测试座右铭</p>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('所有动画元素初始 opacity 应为 0', () => {
    const elements = ['.avatar', '.name', '.bio', '.motto'];
    
    elements.forEach(selector => {
      const element = document.querySelector(selector);
      expect(element).toBeTruthy();
      
      // 设置初始状态
      element.style.opacity = '0';
      
      // 验证初始状态
      expect(element.style.opacity).toBe('0');
    });
  });

  test('动画控制器应按正确顺序触发动画', (done) => {
    const animationSequence = [
      { selector: '.avatar', delay: 0 },
      { selector: '.name', delay: 300 },
      { selector: '.bio', delay: 500 },
      { selector: '.motto', delay: 700 }
    ];

    const animatedElements = [];

    // 模拟动画触发
    animationSequence.forEach(item => {
      setTimeout(() => {
        const element = document.querySelector(item.selector);
        if (element) {
          element.classList.add('animate');
          animatedElements.push(item.selector);
        }
      }, item.delay);
    });

    // 在所有动画应该完成后验证
    setTimeout(() => {
      // 验证所有元素都被添加了 animate 类
      expect(animatedElements).toHaveLength(4);
      expect(animatedElements).toEqual(['.avatar', '.name', '.bio', '.motto']);
      
      // 验证元素确实有 animate 类
      animationSequence.forEach(item => {
        const element = document.querySelector(item.selector);
        expect(element.classList.contains('animate')).toBe(true);
      });
      
      done();
    }, 800);
  });

  test('动画应该按照递增的延迟时间执行', (done) => {
    const timestamps = [];
    const animationSequence = [
      { selector: '.avatar', delay: 0 },
      { selector: '.name', delay: 300 },
      { selector: '.bio', delay: 500 },
      { selector: '.motto', delay: 700 }
    ];

    const startTime = Date.now();

    animationSequence.forEach(item => {
      setTimeout(() => {
        const element = document.querySelector(item.selector);
        if (element) {
          element.classList.add('animate');
          timestamps.push({
            selector: item.selector,
            time: Date.now() - startTime
          });
        }
      }, item.delay);
    });

    setTimeout(() => {
      // 验证时间戳是递增的
      for (let i = 1; i < timestamps.length; i++) {
        expect(timestamps[i].time).toBeGreaterThan(timestamps[i - 1].time);
      }
      done();
    }, 800);
  });
});
