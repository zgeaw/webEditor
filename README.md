
# webEditor

## 介绍

**webEditor** —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。


## 下载

- 使用`npm`下载：`npm install webeditor2`
- 使用`bower`下载：`bower install webeditor2`


## 使用

```javascript
var E = window.webEditor
var editor = new E('#div1')
editor.create()
```


## 运行 demo

- 安装或者升级最新版本 node（最低`v6.x.x`）
- 进入目录，安装依赖包 `cd webEditor && npm i`
- 安装包完成之后，windows 用户运行`npm run dev`，Mac 用户运行`npm run example`
- 打开浏览器访问[localhost:3000/index.html](http://localhost:3000/index.html)