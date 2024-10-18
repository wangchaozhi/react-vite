# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




>yarn create vite react-vite

>yarn config set nodeLinker node-modules


2. 禁用 PnP
   如果重新安装依赖无法解决问题，可以禁用 PnP 模式并使用传统的 node_modules：

设置 Yarn 使用 node_modules：
yarn config set nodeLinker node-modules

删除 .yarn 目录和 .pnp.* 文件：
rm -rf .yarn .pnp.*

重新安装依赖：
yarn install