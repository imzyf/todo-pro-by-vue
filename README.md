# Todo by Vue2 webpack3

学习 [Vue+Webpack 打造 todo 应用教程 - 慕课网](https://www.imooc.com/video/16411) 项目。根据课程章节 `commit`，可查看提交历史。

## 如何体现前端的价值

- 搭建前端工程（搭建更加复杂，数据缓存，ES6，LESS）
- 网络优化（如何加快 HTTP 请求）
- API 定制
- 对 Node.js 的了解

## 创建项目

```
npm init
```

因为 webpack 已经是 4 了，但是老师的课程是 3，所以直接使用老师的 [package.js](https://github.com/Jokcy/vue-todo-tech/blob/master/webpack.config.js) 的 `dependencies`。

## 构建项目

```
npm run build
npm rum dev
```

## 发布到 Gitub Page

`.gitignore` 不要添加 `dist`。

```
# 切换分支
git checkout -b dist

# 构建项目
npm run build

# 提交项目
git add .
git commit -m "build project"

# 发布
git subtree push --prefix=dist origin gh-pages
``` 
