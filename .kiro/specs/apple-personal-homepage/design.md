# 设计文档

## 概述

本项目是一个 Apple 风格的静态个人主页，采用极简主义设计理念，注重流畅的动画和精致的交互细节。页面使用纯 HTML5、CSS3 和原生 JavaScript 构建，无需外部框架，确保最佳性能和加载速度。

核心设计原则：
- **极简主义**：去除不必要的元素，专注于核心内容
- **流畅动画**：所有交互都有平滑的过渡效果，使用硬件加速
- **响应式设计**：适配桌面、平板和移动设备
- **性能优先**：优化加载时间和运行时性能，确保 60fps

## 架构

### 整体架构

```
个人主页应用
├── HTML 结构层
│   ├── 头像区域
│   ├── 文字内容区域
│   ├── 社交媒体按钮区域
│   ├── 页脚导航区域
│   └── 弹窗模态框
├── CSS 样式层
│   ├── 基础样式（变量、重置）
│   ├── 布局样式（Flexbox）
│   ├── 组件样式（按钮、卡片）
│   ├── 动画样式（关键帧、过渡）
│   └── 响应式样式（媒体查询）
└── JavaScript 交互层
    ├── 页面加载动画控制器
    ├── 弹窗管理器
    ├── 事件监听器
    └── 性能优化工具
```

### 技术栈

- **HTML5**：语义化标签，提升可访问性
- **CSS3**：
  - CSS 变量用于主题管理
  - Flexbox 用于布局
  - CSS Grid 用于按钮网格（可选）
  - Transform 和 Opacity 用于高性能动画
  - Backdrop-filter 用于毛玻璃效果
- **原生 JavaScript (ES6+)**：
  - 事件委托优化性能
  - Intersection Observer 用于滚动动画
  - RequestAnimationFrame 用于流畅动画

## 组件和接口

### 1. 头像组件 (Avatar)

**结构：**
```html
<div class="avatar-container">
  <img src="avatar.jpg" alt="头像" class="avatar">
</div>
```

**样式特性：**
- 圆形裁剪（border-radius: 50%）
- 尺寸：桌面 200px，移动端 150px
- 阴影效果：box-shadow
- 悬停效果：轻微旋转（5度）+ 缩放（1.05）

**动画：**
- 加载动画：从 scale(0.8) 到 scale(1)，配合 opacity 0 到 1
- 持续时间：0.8s
- 缓动函数：cubic-bezier(0.34, 1.56, 0.64, 1) - 弹性效果

### 2. 文字内容组件 (TextContent)

**结构：**
```html
<h1 class="name">寒冬利刃</h1>
<p class="bio">一只 <span class="highlight">IT萌新</span>，会一点点 <span class="highlight">Bootstrap</span> 和 <span class="highlight">Python</span>。</p>
<p class="motto">Stay hungry.Stay foolish.</p>
```

**样式特性：**
- 字体：-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
- 姓名：font-size 48px（桌面），36px（移动）
- 简介：font-size 18px，高亮文字使用蓝色（#007AFF）
- 座右铭：font-size 20px，斜体，灰色

**动画：**
- 加载动画：从下方滑入（translateY(30px) 到 0）+ 淡入
- 延迟：每个元素递增 0.2s（0.3s, 0.5s, 0.7s）
- 持续时间：0.6s
- 缓动函数：ease-out

### 3. 社交媒体按钮组件 (SocialButton)

**结构：**
```html
<div class="social-buttons">
  <button class="social-btn" data-social="email">
    <i class="icon-email"></i>
    <span>邮箱</span>
  </button>
  <!-- 其他按钮 -->
</div>
```

**样式特性：**
- 背景：半透明毛玻璃效果（backdrop-filter: blur(10px)）
- 边框：1px solid rgba(255,255,255,0.2)
- 圆角：12px
- 内边距：16px 32px
- 阴影：0 4px 12px rgba(0,0,0,0.15)

**交互状态：**
- 悬停：scale(1.05) + 背景变亮
- 按压：scale(0.95)
- 过渡：all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

**布局：**
- 桌面：水平排列，间距 20px
- 移动：2x2 网格，间距 15px

### 4. 弹窗模态框组件 (Modal)

**结构：**
```html
<div class="modal-overlay">
  <div class="modal-container">
    <button class="modal-close">&times;</button>
    <div class="modal-content">
      <h3 class="modal-title">邮箱</h3>
      <div class="modal-body">
        <!-- 二维码或详细信息 -->
      </div>
    </div>
  </div>
</div>
```

**样式特性：**
- 遮罩层：rgba(0,0,0,0.6)，backdrop-filter: blur(5px)
- 容器：白色背景（深色模式下为深灰），圆角 20px
- 尺寸：桌面 500px 宽，移动 90% 宽度
- 阴影：0 20px 60px rgba(0,0,0,0.3)

**动画：**
- 打开动画：
  - 遮罩层：opacity 0 到 1（0.3s）
  - 容器：scale(0.7) 到 scale(1) + opacity 0 到 1（0.4s）
  - 缓动：cubic-bezier(0.34, 1.56, 0.64, 1)
- 关闭动画：
  - 反向播放打开动画
  - 持续时间：0.3s

**交互：**
- 点击遮罩层关闭
- 点击关闭按钮关闭
- ESC 键关闭

### 5. 页脚导航组件 (Footer)

**结构：**
```html
<footer class="footer">
  <hr class="divider">
  <nav class="footer-nav">
    <a href="#about">关于本站</a>
    <span class="separator">|</span>
    <a href="#friends">友链</a>
    <span class="separator">|</span>
    <a href="#postscript">后记</a>
  </nav>
  <p class="copyright">Copyrights © 2025 寒冬利刃 All Rights Reserved.</p>
</footer>
```

**样式特性：**
- 分隔线：1px solid rgba(255,255,255,0.1)
- 链接：颜色 #007AFF，悬停时变亮
- 版权：font-size 14px，灰色

## 数据模型

### 社交媒体配置

```javascript
const socialMediaConfig = [
  {
    id: 'email',
    label: '邮箱',
    icon: '✉',
    modalContent: {
      title: '邮箱联系方式',
      body: 'example@email.com'
    }
  },
  {
    id: 'gitee',
    label: 'Gitee',
    icon: 'G',
    modalContent: {
      title: 'Gitee 主页',
      body: 'https://gitee.com/username'
    }
  },
  {
    id: 'cnblogs',
    label: '博客园',
    icon: '博',
    modalContent: {
      title: '博客园主页',
      body: 'https://www.cnblogs.com/username'
    }
  },
  {
    id: 'qq',
    label: 'QQ',
    icon: 'Q',
    modalContent: {
      title: 'QQ 联系方式',
      body: 'QQ号：123456789'
    }
  }
];
```

### CSS 变量配置

```css
:root {
  /* 颜色 */
  --color-primary: #007AFF;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: rgba(255, 255, 255, 0.7);
  --color-bg-gradient-start: #1a1a1a;
  --color-bg-gradient-end: #000000;
  
  /* 间距 */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 48px;
  --spacing-xl: 80px;
  
  /* 动画 */
  --transition-fast: 0.2s;
  --transition-normal: 0.3s;
  --transition-slow: 0.6s;
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* 尺寸 */
  --avatar-size-desktop: 200px;
  --avatar-size-mobile: 150px;
  --button-radius: 12px;
  --modal-radius: 20px;
}
```

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的正式声明。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1：点击按钮显示弹窗

*对于任何*社交媒体按钮，当用户点击该按钮时，系统应该显示一个模态框弹窗。

**验证：需求 2.2**

### 属性 2：弹窗内容匹配按钮

*对于任何*社交媒体按钮，当弹窗显示时，弹窗中的标题和内容应该与被点击的按钮对应。

**验证：需求 2.3**

### 属性 3：按钮包含图标和文字

*对于任何*社交媒体按钮，该按钮应该同时包含图标元素和文字标签元素。

**验证：需求 2.4**

### 属性 4：点击触发打开动画

*对于任何*社交媒体按钮，当用户点击时，应该触发弹窗的缩放淡入动画效果。

**验证：需求 2.1.1**

### 属性 5：弹窗显示遮罩动画

*对于任何*弹窗显示操作，背景遮罩层应该执行淡入动画效果。

**验证：需求 2.1.2**

### 属性 6：关闭触发退出动画

*对于任何*弹窗关闭操作（点击遮罩、关闭按钮或 ESC 键），应该触发缩放淡出动画效果。

**验证：需求 2.1.3**

### 属性 7：弹窗内容延迟淡入

*对于任何*弹窗显示操作，弹窗内部的内容元素应该有延迟淡入动画效果。

**验证：需求 2.1.4**

### 属性 8：按钮点击反馈

*对于任何*按钮点击操作，按钮应该显示按压反馈动画（轻微缩小效果）。

**验证：需求 2.1.5**

### 属性 9：按钮悬停效果

*对于任何*社交媒体按钮，当鼠标悬停时，应该执行平滑的放大和颜色变化效果。

**验证：需求 3.3**

### 属性 10：可交互元素视觉反馈

*对于任何*可交互元素（按钮、链接），当用户点击时，应该提供即时的视觉反馈。

**验证：需求 3.5**

### 属性 11：导航链接悬停变色

*对于任何*页脚导航链接，当鼠标悬停时，链接颜色应该改变以提供视觉反馈。

**验证：需求 5.3**

### 属性 12：按钮和卡片阴影效果

*对于任何*按钮和卡片元素，应该应用微妙的阴影效果（box-shadow）。

**验证：需求 7.2**

### 属性 13：用户交互反馈动画

*对于任何*用户交互操作，系统应该提供微妙的触觉反馈式动画（如弹性效果）。

**验证：需求 7.5**


## 错误处理

### 1. 图片加载失败

**场景：** 头像或其他图片资源加载失败

**处理策略：**
- 显示占位符图片或默认头像
- 使用 `onerror` 事件监听器捕获加载错误
- 在控制台记录错误信息，但不影响页面其他功能

**实现：**
```javascript
avatarImg.onerror = function() {
  this.src = 'data:image/svg+xml,...'; // 使用 SVG 占位符
  console.warn('头像加载失败，使用默认图片');
};
```

### 2. 动画性能降级

**场景：** 在低性能设备上动画可能卡顿

**处理策略：**
- 使用 `prefers-reduced-motion` 媒体查询检测用户偏好
- 在低性能设备上简化或禁用复杂动画
- 优先使用 CSS 动画而非 JavaScript 动画

**实现：**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. 弹窗状态管理

**场景：** 多个弹窗同时打开或状态混乱

**处理策略：**
- 维护全局弹窗状态，确保同时只有一个弹窗打开
- 在打开新弹窗前关闭已打开的弹窗
- 使用事件委托统一管理弹窗事件

**实现：**
```javascript
let currentModal = null;

function openModal(modalId) {
  if (currentModal) {
    closeModal(currentModal);
  }
  currentModal = modalId;
  // 打开弹窗逻辑
}
```

### 4. 响应式布局边界情况

**场景：** 极小或极大屏幕尺寸

**处理策略：**
- 设置最小宽度（320px）和最大宽度（1920px）
- 在极小屏幕上调整字体大小和间距
- 使用 `clamp()` 函数实现流式排版

**实现：**
```css
.name {
  font-size: clamp(24px, 5vw, 48px);
}
```

### 5. JavaScript 未加载或禁用

**场景：** 用户禁用 JavaScript 或脚本加载失败

**处理策略：**
- 使用 `<noscript>` 标签提示用户
- 确保基本内容在无 JavaScript 时仍可见
- 使用 CSS 实现基础交互（如 `:hover` 效果）

**实现：**
```html
<noscript>
  <div class="noscript-warning">
    请启用 JavaScript 以获得最佳体验
  </div>
</noscript>
```


## 测试策略

### 单元测试

单元测试将验证各个组件和函数的正确性：

**测试范围：**
- DOM 元素创建和属性设置
- 事件监听器绑定和触发
- 动画状态管理函数
- 弹窗打开/关闭逻辑
- 响应式布局断点检测

**测试工具：**
- 使用 Jest 作为测试框架
- 使用 jsdom 模拟浏览器环境
- 使用 @testing-library/dom 进行 DOM 查询和交互测试

**示例测试：**
```javascript
describe('Modal Component', () => {
  test('点击按钮应该显示对应的弹窗', () => {
    const button = document.querySelector('[data-social="email"]');
    button.click();
    const modal = document.querySelector('.modal-overlay');
    expect(modal.classList.contains('show')).toBe(true);
  });
});
```

### 属性测试

属性测试将验证系统的通用规则在各种输入下都成立：

**测试库：** 使用 fast-check（JavaScript 的属性测试库）

**测试配置：** 每个属性测试运行至少 100 次迭代

**属性测试标注格式：** `// Feature: apple-personal-homepage, Property X: [属性描述]`

**测试范围：**

1. **属性 1：点击按钮显示弹窗**
   - 生成随机的社交媒体按钮配置
   - 验证点击任何按钮都会显示弹窗

2. **属性 2：弹窗内容匹配按钮**
   - 生成随机的按钮和内容配置
   - 验证弹窗内容与按钮 ID 匹配

3. **属性 3：按钮包含图标和文字**
   - 生成随机的按钮配置
   - 验证每个按钮都包含图标和文字元素

4. **属性 4-13：动画和交互属性**
   - 生成随机的交互事件
   - 验证动画类名被正确添加/移除
   - 验证 CSS 属性变化符合预期

**示例属性测试：**
```javascript
// Feature: apple-personal-homepage, Property 2: 弹窗内容匹配按钮
describe('Property: 弹窗内容匹配按钮', () => {
  test('对于任何社交媒体按钮，弹窗内容应该匹配', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          label: fc.string(),
          content: fc.string()
        }),
        (config) => {
          const button = createButton(config);
          button.click();
          const modalTitle = document.querySelector('.modal-title');
          return modalTitle.textContent === config.label;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### 集成测试

集成测试将验证组件之间的协作：

**测试范围：**
- 页面加载完整流程
- 按钮点击到弹窗显示的完整流程
- 动画序列的完整执行
- 响应式布局在不同视口下的表现

**测试工具：**
- 使用 Playwright 或 Cypress 进行端到端测试
- 模拟不同设备和视口尺寸

### 视觉回归测试

**测试范围：**
- 页面初始状态截图
- 悬停状态截图
- 弹窗打开状态截图
- 不同视口尺寸下的截图

**测试工具：**
- 使用 Percy 或 Chromatic 进行视觉对比

### 性能测试

**测试指标：**
- 首次内容绘制（FCP）< 1.5s
- 最大内容绘制（LCP）< 2.5s
- 首次输入延迟（FID）< 100ms
- 累积布局偏移（CLS）< 0.1
- 动画帧率保持 60fps

**测试工具：**
- 使用 Lighthouse 进行性能审计
- 使用 Chrome DevTools Performance 面板分析

### 可访问性测试

**测试范围：**
- 键盘导航（Tab、Enter、ESC）
- 屏幕阅读器兼容性
- 颜色对比度符合 WCAG AA 标准
- ARIA 属性正确使用

**测试工具：**
- 使用 axe-core 进行自动化可访问性测试
- 使用 NVDA/JAWS 进行手动测试


## 性能优化

### 1. 资源加载优化

**策略：**
- 使用 `preload` 预加载关键资源（字体、头像）
- 使用 `defer` 或 `async` 异步加载非关键脚本
- 压缩和优化图片（使用 WebP 格式，提供降级方案）
- 内联关键 CSS，延迟加载非关键 CSS

**实现：**
```html
<link rel="preload" href="avatar.jpg" as="image">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<script src="script.js" defer></script>
```

### 2. 动画性能优化

**策略：**
- 仅使用 `transform` 和 `opacity` 属性进行动画
- 使用 `will-change` 提示浏览器优化
- 避免在动画中修改布局属性（width、height、margin）
- 使用 `requestAnimationFrame` 同步动画

**实现：**
```css
.social-btn {
  will-change: transform, opacity;
  transform: translateZ(0); /* 强制硬件加速 */
}
```

### 3. 渲染优化

**策略：**
- 使用 CSS `contain` 属性隔离渲染
- 减少 DOM 深度和复杂度
- 使用事件委托减少事件监听器数量
- 避免强制同步布局（读写分离）

**实现：**
```css
.card {
  contain: layout style paint;
}
```

```javascript
// 事件委托
document.querySelector('.social-buttons').addEventListener('click', (e) => {
  const button = e.target.closest('.social-btn');
  if (button) handleButtonClick(button);
});
```

### 4. 代码优化

**策略：**
- 压缩 HTML、CSS、JavaScript
- 移除未使用的 CSS（使用 PurgeCSS）
- 使用现代 JavaScript 语法减少代码量
- 避免不必要的重绘和回流

**实现：**
```javascript
// 批量 DOM 操作
const fragment = document.createDocumentFragment();
buttons.forEach(btn => fragment.appendChild(btn));
container.appendChild(fragment);
```

### 5. 缓存策略

**策略：**
- 使用 Service Worker 缓存静态资源
- 设置合理的 HTTP 缓存头
- 使用版本号或哈希值管理缓存更新

**实现：**
```javascript
// Service Worker 缓存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/avatar.jpg'
      ]);
    })
  );
});
```

### 6. 懒加载

**策略：**
- 使用 Intersection Observer 实现图片懒加载
- 延迟加载非首屏内容
- 按需加载弹窗内容

**实现：**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
```

## 浏览器兼容性

### 目标浏览器

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### 降级策略

**Backdrop Filter：**
```css
.social-btn {
  background: rgba(255, 255, 255, 0.1); /* 降级方案 */
}

@supports (backdrop-filter: blur(10px)) {
  .social-btn {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.05);
  }
}
```

**CSS Grid：**
```css
.social-buttons {
  display: flex; /* 降级方案 */
  flex-wrap: wrap;
}

@supports (display: grid) {
  .social-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**自定义属性：**
- 提供静态值作为降级方案
- 使用 PostCSS 插件自动生成降级代码

## 部署和构建

### 构建流程

1. **HTML 优化：** 压缩 HTML，内联关键 CSS
2. **CSS 优化：** 
   - 使用 PostCSS 添加浏览器前缀
   - 压缩 CSS
   - 移除未使用的样式
3. **JavaScript 优化：**
   - 使用 Babel 转译为 ES5（可选）
   - 压缩和混淆代码
   - 生成 source map
4. **资源优化：**
   - 压缩图片
   - 生成多种尺寸和格式
   - 添加版本号或哈希值

### 部署建议

- 使用 CDN 加速静态资源
- 启用 Gzip/Brotli 压缩
- 配置 HTTPS
- 设置合理的缓存策略
- 使用 HTTP/2 或 HTTP/3

### 监控和分析

- 集成 Google Analytics 或其他分析工具
- 监控页面性能指标（Core Web Vitals）
- 收集错误日志
- 分析用户行为和交互

