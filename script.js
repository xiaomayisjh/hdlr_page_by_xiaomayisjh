// ===================================
// 页面加载动画序列控制器
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // 动画控制器
  const AnimationController = {
    // 动画序列配置
    sequence: [
      { selector: '.avatar', delay: 0 },
      { selector: '.name', delay: 300 },
      { selector: '.bio', delay: 500 },
      { selector: '.motto', delay: 700 }
    ],
    
    // 初始化页面状态
    init: function() {
      // 添加 will-animate 类来准备动画（将元素设为不可见）
      this.sequence.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
          element.classList.add('will-animate');
        }
      });
    },
    
    // 触发动画序列
    start: function() {
      this.sequence.forEach(item => {
        setTimeout(() => {
          const element = document.querySelector(item.selector);
          if (element) {
            // 移除 will-animate 类，添加 animate 类
            element.classList.remove('will-animate');
            element.classList.add('animate');
          }
        }, item.delay);
      });
    }
  };
  
  // 初始化页面状态
  AnimationController.init();
  
  // 页面加载完成后触发动画序列
  // 使用 requestAnimationFrame 确保 DOM 完全渲染后再开始动画
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      AnimationController.start();
    });
  });
});

// ===================================
// 头像加载错误处理
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const avatar = document.querySelector('.avatar');
  
  if (avatar) {
    // 添加 onerror 事件处理（如果 HTML 中没有内联处理）
    avatar.addEventListener('error', function() {
      // 提供默认占位符 SVG
      this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='80' fill='%23fff'%3E👤%3C/text%3E%3C/svg%3E";
      console.warn('头像加载失败，使用默认占位符');
    });
  }
});

// ===================================
// 鼠标探照灯效果 - 逐字变色
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // 检测是否为移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || window.innerWidth < 768;
  
  // 检测用户是否偏好减少动画
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // 移动设备或偏好减少动画时不启用探照灯
  if (isMobile || prefersReducedMotion) {
    return;
  }
  
  // 创建探照灯元素
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  document.body.appendChild(spotlight);
  
  // 探照灯半径（像素）- 缩小范围
  const spotlightRadius = 100;
  
  // 跟踪鼠标位置
  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;
  
  // 将大标题拆分成单个字符
  function wrapCharsForTitle(element) {
    if (!element || element.dataset.wrapped === 'true') return;
    
    const text = element.textContent;
    const wrappedHTML = text.split('').map(char => {
      if (char === ' ') {
        return '<span class="char-wrapper">&nbsp;</span>';
      }
      return `<span class="char-wrapper">${char}</span>`;
    }).join('');
    
    element.innerHTML = wrappedHTML;
    element.dataset.wrapped = 'true';
  }
  
  // 将小文段拆分成词组（按空格和标点分割）
  function wrapPhrasesForText(element) {
    if (!element || element.dataset.wrapped === 'true') return;
    
    // 保存原始HTML结构（处理highlight等标签）
    const html = element.innerHTML;
    
    // 处理带标签的内容
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // 递归处理文本节点
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        // 按空格、标点符号分割成短语
        const phrases = text.split(/([，。、！？,.!?\s]+)/);
        const fragment = document.createDocumentFragment();
        
        phrases.forEach(phrase => {
          if (phrase && phrase.trim()) {
            const span = document.createElement('span');
            span.className = 'phrase-wrapper';
            span.textContent = phrase;
            fragment.appendChild(span);
          } else if (phrase) {
            // 保留空格和标点
            fragment.appendChild(document.createTextNode(phrase));
          }
        });
        
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 递归处理子节点
        Array.from(node.childNodes).forEach(child => processNode(child));
      }
    }
    
    Array.from(tempDiv.childNodes).forEach(child => processNode(child));
    element.innerHTML = tempDiv.innerHTML;
    element.dataset.wrapped = 'true';
  }
  
  // 大标题（姓名）- 逐字检测
  const nameElement = document.querySelector('.name');
  if (nameElement) {
    wrapCharsForTitle(nameElement);
  }
  
  // 小文段（简介、座右铭）- 按短语检测
  const bioElement = document.querySelector('.bio');
  const mottoElement = document.querySelector('.motto');
  
  if (bioElement) {
    wrapPhrasesForText(bioElement);
  }
  
  if (mottoElement) {
    wrapPhrasesForText(mottoElement);
  }
  
  // 获取所有字符和短语包装器
  const charWrappers = document.querySelectorAll('.char-wrapper');
  const phraseWrappers = document.querySelectorAll('.phrase-wrapper');
  
  // 缓存按钮元素
  const buttonElements = [...document.querySelectorAll('.social-btn')];
  
  // 使用 requestAnimationFrame 优化性能
  let rafId = null;
  
  // 鼠标移动事件
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // 取消之前的动画帧
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    // 使用 requestAnimationFrame 优化性能
    rafId = requestAnimationFrame(() => {
      // 更新探照灯位置
      spotlight.style.left = mouseX + 'px';
      spotlight.style.top = mouseY + 'px';
      spotlight.style.opacity = '1';
      
      // 检测每个字符是否在探照灯范围内
      checkCharsInSpotlight(mouseX, mouseY);
      
      // 检测按钮是否在探照灯范围内
      checkButtonsInSpotlight(mouseX, mouseY);
    });
  });
  
  // 鼠标离开页面时隐藏探照灯
  document.addEventListener('mouseleave', function() {
    spotlight.style.opacity = '0';
    isMouseMoving = false;
    // 移除所有激活状态
    removeAllSpotlightActive();
  });
  
  // 鼠标进入页面时显示探照灯
  document.addEventListener('mouseenter', function() {
    if (isMouseMoving) {
      spotlight.style.opacity = '1';
    }
  });
  
  // 检测字符和短语是否在探照灯范围内
  function checkCharsInSpotlight(x, y) {
    // 检测大标题的每个字符
    charWrappers.forEach(char => {
      const rect = char.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;
      
      // 计算鼠标到字符中心的距离
      const distance = Math.sqrt(
        Math.pow(x - charCenterX, 2) + 
        Math.pow(y - charCenterY, 2)
      );
      
      // 根据距离计算强度（0-1），使用平滑曲线
      let intensity = Math.max(0, 1 - (distance / spotlightRadius));
      
      // 使用缓动函数让过渡更平滑
      intensity = intensity * intensity * (3 - 2 * intensity); // smoothstep
      
      // 始终设置强度值，让CSS过渡处理动画
      char.style.setProperty('--spotlight-intensity', intensity.toFixed(3));
      
      // 只在强度大于阈值时添加激活类
      if (intensity > 0.01) {
        char.classList.add('spotlight-active');
      } else {
        char.classList.remove('spotlight-active');
      }
    });
    
    // 检测小文段的短语
    phraseWrappers.forEach(phrase => {
      const rect = phrase.getBoundingClientRect();
      const phraseCenterX = rect.left + rect.width / 2;
      const phraseCenterY = rect.top + rect.height / 2;
      
      // 计算鼠标到短语中心的距离
      const distance = Math.sqrt(
        Math.pow(x - phraseCenterX, 2) + 
        Math.pow(y - phraseCenterY, 2)
      );
      
      // 根据距离计算强度（0-1），使用平滑曲线
      let intensity = Math.max(0, 1 - (distance / spotlightRadius));
      
      // 使用缓动函数让过渡更平滑
      intensity = intensity * intensity * (3 - 2 * intensity); // smoothstep
      
      // 始终设置强度值，让CSS过渡处理动画
      phrase.style.setProperty('--spotlight-intensity', intensity.toFixed(3));
      
      // 只在强度大于阈值时添加激活类
      if (intensity > 0.01) {
        phrase.classList.add('spotlight-active');
      } else {
        phrase.classList.remove('spotlight-active');
      }
    });
  }
  
  // 检测按钮是否在探照灯范围内
  function checkButtonsInSpotlight(x, y) {
    buttonElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(x - elementCenterX, 2) + 
        Math.pow(y - elementCenterY, 2)
      );
      
      if (distance < spotlightRadius) {
        element.classList.add('spotlight-active');
      } else {
        element.classList.remove('spotlight-active');
      }
    });
  }
  
  // 移除所有探照灯激活状态（平滑过渡到0）
  function removeAllSpotlightActive() {
    charWrappers.forEach(char => {
      // 先将强度设为0，让CSS过渡处理
      char.style.setProperty('--spotlight-intensity', '0');
      // 延迟移除类，让过渡完成
      setTimeout(() => {
        char.classList.remove('spotlight-active');
      }, 400);
    });
    
    phraseWrappers.forEach(phrase => {
      // 先将强度设为0，让CSS过渡处理
      phrase.style.setProperty('--spotlight-intensity', '0');
      // 延迟移除类，让过渡完成
      setTimeout(() => {
        phrase.classList.remove('spotlight-active');
      }, 400);
    });
    
    buttonElements.forEach(element => {
      element.classList.remove('spotlight-active');
    });
  }
});

// ===================================
// 键盘水波涟漪效果（仅电脑端）
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // 检测是否为移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || window.innerWidth < 768;
  
  // 移动设备不启用键盘涟漪效果
  if (isMobile) {
    return;
  }
  
  // 创建涟漪容器
  const rippleContainer = document.createElement('div');
  rippleContainer.className = 'ripple-container';
  document.body.appendChild(rippleContainer);
  
  // 涟漪计数器（用于生成唯一ID）
  let rippleCount = 0;
  
  // 键盘按键事件
  document.addEventListener('keydown', function(e) {
    // 忽略功能键和修饰键
    if (e.ctrlKey || e.altKey || e.metaKey || 
        ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].includes(e.key)) {
      return;
    }
    
    // 在随机位置创建涟漪
    createRipple();
  });
  
  // 创建涟漪效果
  function createRipple() {
    // 随机位置（屏幕范围内，稍微偏向中心）
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (Math.random() - 0.5) * window.innerWidth * 0.8;
    const offsetY = (Math.random() - 0.5) * window.innerHeight * 0.8;
    const x = centerX + offsetX;
    const y = centerY + offsetY;
    
    // 创建涟漪元素
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // 随机颜色（蓝色系，更柔和的渐变）
    const hue = 200 + Math.random() * 40; // 200-240度，蓝色到青色
    const saturation = 70 + Math.random() * 20; // 70-90%饱和度
    const lightness = 55 + Math.random() * 15; // 55-70%亮度
    const opacity = 0.4 + Math.random() * 0.2; // 0.4-0.6透明度
    
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
    ripple.style.setProperty('--ripple-color', color);
    
    // 添加到容器
    rippleContainer.appendChild(ripple);
    
    // 动画结束后移除（2.5秒动画时长）
    setTimeout(() => {
      ripple.remove();
    }, 2500);
    
    rippleCount++;
    
    // 限制同时存在的涟漪数量
    if (rippleCount > 15) {
      const oldRipples = rippleContainer.querySelectorAll('.ripple');
      if (oldRipples.length > 0) {
        oldRipples[0].remove();
      }
    }
  }
});

// ===================================
// 弹窗模态框管理
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // 当前打开的弹窗（确保同时只有一个弹窗打开）
  let currentModal = null;
  
  // 打开弹窗函数
  function openModal(modalId) {
    // 如果有已打开的弹窗，先关闭它
    if (currentModal) {
      closeModal(currentModal);
    }
    
    const modal = document.getElementById(modalId);
    if (modal) {
      // 添加 show 类触发动画
      modal.classList.add('show');
      currentModal = modal;
      
      // 阻止背景滚动
      document.body.style.overflow = 'hidden';
    }
  }
  
  // 关闭弹窗函数
  function closeModal(modal) {
    if (modal) {
      // 移除 show 类触发关闭动画
      modal.classList.remove('show');
      currentModal = null;
      
      // 恢复背景滚动
      document.body.style.overflow = '';
    }
  }
  
  // 为所有社交媒体按钮添加点击事件监听器
  const socialButtons = document.querySelectorAll('.social-btn');
  socialButtons.forEach(button => {
    button.addEventListener('click', function() {
      const socialType = this.getAttribute('data-social');
      const modalId = 'modal-' + socialType;
      openModal(modalId);
    });
  });
  
  // 为所有页脚导航链接添加点击事件监听器
  const footerLinks = document.querySelectorAll('.footer-nav a[data-modal]');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // 阻止默认链接行为
      const modalType = this.getAttribute('data-modal');
      const modalId = 'modal-' + modalType;
      openModal(modalId);
    });
  });
  
  // 为所有关闭按钮添加点击事件监听器
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal-overlay');
      closeModal(modal);
    });
  });
  
  // 点击遮罩层关闭弹窗
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      // 只有点击遮罩层本身时才关闭（不包括点击弹窗内容）
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });
  
  // ESC 键关闭弹窗
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currentModal) {
      closeModal(currentModal);
    }
  });
});
