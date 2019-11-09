# TODO Pro By Vue

## 介绍

此项目是 [imzyf/todo-by-vue](https://github.com/imzyf/todo-by-vue) 的进阶项目，使用 _最新_ 的 `Webpack 4.41` `Vue 2.6`。

## 笔记

### Vue

文件夹 [practice]

```bash
npm run practice
```

## 发布到 Gitub Page

`.gitignore` 不要添加 `dist`。

```bash
# 切换分支
git checkout -b dist

# 构建项目
npm run prod

# 提交项目
git add .
git commit -m "build project"

# 发布
git subtree push --prefix=dist origin gh-pages
```
