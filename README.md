# 项目名称

这是一个前端项目，包含动画控制器、页脚导航和社交按钮等组件。

## 功能特性

- 动画控制器 (Animation Controller)
- 页脚导航 (Footer Navigation)
- 模态框 (Modal)
- 社交按钮 (Social Buttons)

## 项目结构

```
├── index.html              # 主页面
├── example.html            # 示例页面
├── script.js               # 主要脚本
├── styles.css              # 样式表
├── jest.config.js          # Jest 配置
├── jest.setup.js           # Jest 设置
├── *.test.js               # 测试文件
└── package.json            # 项目依赖
```

## 安装

```bash
npm install
```

## 运行测试

```bash
npm test
```

## 开发

编辑 `script.js` 和 `styles.css` 来开发功能。

## 📋 概述

完成了网站的全面重构，重点关注性能优化和动画体验提升。

## 🔗 相关链接

- **项目仓库**: https://github.com/xiaomayisjh/hdlr_page_by_xiaomayisjh
- **在线演示**: https://xiaomayisjh.github.io/hdlr_page_by_xiaomayisjh/
- **源站地址**: https://hdlr.maozi.io/
- **源站仓库**: https://gitee.com/handongliren/hdlr

## ✨ 主要改进

### 性能优化
- ⚡ 加载速度提升
- 📦 代码体积优化
- 🎯 渲染性能改进
- 💾 资源缓存策略

### 动画体验
- 🎨 流畅的过渡动画
- ✨ 优雅的交互效果
- 🔄 页面切换动画
- 📱 响应式动画适配

🎬 网站动画总结
1. 背景光效动画
柔光流动 (soft-flow) - 30秒循环，背景中的彩色光球缓慢流动
粒子流动 (particle-flow) - 40秒循环，细微的粒子层动画
浮动光效 (float-1, float-2, float-3) - 25-35秒循环，三个不同颜色的光球独立浮动
2. 探照灯效果
探照灯脉冲 (spotlight-pulse) - 2秒循环，鼠标跟随的蓝色光圈脉冲效果
逐字变色 - 鼠标靠近时，文字字符和短语实时变色发光
3. 涟漪效果
涟漪扩散 (ripple-expand) - 2.5秒，按键时在屏幕随机位置产生扩散涟漪
4. 页面加载动画
头像淡入缩放 - 延迟0ms，从透明缩小到完整显示
姓名淡入下滑 - 延迟300ms，从下方滑入并淡入
简介淡入下滑 - 延迟500ms，从下方滑入并淡入
座右铭淡入下滑 - 延迟700ms，从下方滑入并淡入
5. 文字发光动画
姓名荧光脉冲 (glow-pulse) - 3秒循环，文字发光强度呼吸式变化
6. 交互动画
头像悬停 - 缩放1.05倍 + 旋转5度
按钮悬停 - 缩放1.05倍，背景变亮，阴影增强
按钮按压 - 缩放0.95倍，快速反馈
关闭按钮悬停 - 旋转90度
7. 弹窗动画
弹窗容器 - 从缩小(0.7倍)到正常大小，配合淡入
弹窗标题 - 延迟0.2s，从下方滑入淡入
弹窗内容 - 延迟0.3s，从下方滑入淡入
8. 响应式动画
移动端禁用探照灯和涟漪效果
支持 prefers-reduced-motion 媒体查询，用户偏好减少动画时简化所有效果
9. 性能优化
使用 CSS 变量管理动画时间和缓动函数
使用 will-change 优化性能
使用 requestAnimationFrame 优化 JavaScript 动画
支持低性能设备的降级方案
所有动画都采用了平滑的缓动函数（cubic-bezier 和 ease-out），营造出优雅流畅的交互体验，整体风格参考了 Apple 的设计美学。

## 📝 技术栈

- HTML5
- CSS3 (动画与过渡)
- JavaScript (交互控制)
- 性能监测工具

## 💬 备注

菜就多练 :-) 

---

**作者**: xiaomayisjh


## 许可证

MIT
