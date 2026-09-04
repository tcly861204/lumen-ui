# Lumen UI

基于 Vue 3 + TypeScript 的轻量级组件库。

## 仓库结构

```
lumen-ui/
├── packages/
│   ├── tokens/         # 设计 Token：SCSS 变量 + CSS 变量
│   └── components/     # 组件库主体
└── docs/               # Storybook 文档与预览
```

## 开发

```bash
# 安装依赖
pnpm install

# 启动 Storybook 文档站
pnpm dev

# 构建所有包
pnpm build

# 跑测试
pnpm test

# 类型检查
pnpm typecheck

# 代码风格
pnpm lint
pnpm format
```

## 提交版本

```bash
pnpm changeset        # 写一条变更
pnpm version          # 升级版本
pnpm release          # 构建并发布
```

## 许可证

MIT
