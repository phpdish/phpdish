<p align="center">
  <a href="https://www.phpdish.com/">
    <img alt="PHPDish" width="400" src="https://raw.githubusercontent.com/slince/phpdish/master/assets/img/logo2.png"/>
  </a>
</p>

PHPDish 是一个基于Symfony框架开发的内容社区系统；得益于大量的前端以及后端的第三方类库的使用使得PHPDish有着高质量的代码，敏捷实现；
你可以使用composer或者直接下载本仓库进行程序的安装，注意切换到tag。
QQ群号：138307655，欢迎进群讨论。

[PHPDish 开发手册](https://www.phpdish.com/books/docs)

## Requirements:

- PHP 7.2.0+
- MYSQL 5.6.0+

## Features

- 社区话题/回复
- 专栏文章/评论
- Notification通知
- Markdown编辑器
- Github风格Emoji表情支持
- 在回复中@他人
- 个人主页
- 电子书编辑/阅读
- 专栏/电子书付费订阅
- 钱包管理

关于部分功能的使用以及实现请关注”[PHPDish开发手记](https://www.phpdish.com/categories/phpdish-development-notes)“专栏，我会在该专栏内记录一些开发经历与使用方法；

PHPDish功能仍在继续实现中，陆续会有新的功能发布出来，欢迎关注，欢迎贡献代码。如果你有好的建议或者问题需要反馈,
可以在[Issue](https://github.com/slince/phpdish/issues) 发布新贴；或者到PHPDish社区 [http://www.phpdish.com](http://www.phpdish.com) 
发布新的话题。如果没有及时回复你可以在PHPDish私信我[@slince](http://www.phpdish.com/users/slince)；

## 文档

安装文档查看这里 [/app/Resources/doc/install.md](./app/Resources/doc/install.md)

## 开源库

项目中使用的第三方库比较多不能一一列举，这里提一些比较核心功能使用到的库

- 后端

| 名称 | 说明 |
| --- | --- |
| [friendsofsymfony/user-bundle](https://github.com/FriendsOfSymfony/FOSUserBundle) | 用户管理基础组件 |
| [friendsofsymfony/message-bundle](https://github.com/FriendsOfSymfony/FOSMessageBundle) | 站内信实现的基础组件 |
| [knplabs/knp-markdown-bundle](https://github.com/KnpLabs/KnpMarkdownBundle) | Markdown 解析组件 |
| [knplabs/knp-gaufrette-bundle](https://github.com/KnpLabs/KnpGaufretteBundle) | 文件系统管理组件 |
| [knplabs/knp-menu-bundle](https://github.com/KnpLabs/KnpMenuBundle) | 菜单栏生成组件 |
| [hwi/oauth-bundle](https://github.com/hwi/HWIOAuthBundle) | OAuth登录 |
| [emojione/emojione](https://github.com/emojione/emojione) | Emoji 表情解析的后端组件 |
| [lincanbin/material-design-avatars](https://github.com/lincanbin/Material-Design-Avatars) | 字符头像生成库 |

- 前端

| 名称 | 说明 |
| --- | --- |
| [jquery-pjax](https://github.com/defunkt/jquery-pjax) | PJax |
| [marked](https://github.com/chjj/marked) | Markdown 解析组件，前端用 |
| [plupload](https://github.com/moxiecode/plupload) | 文件上传 |
| [twemoji](https://github.com/twitter/twemoji) | Emoji 解析 |
| [textcomplete](https://github.com/yuku-t/textcomplete) | 文本域内自动完成，@用户和emoji提示由此组件实现 |
| [store](https://github.com/marcuswestin/store.js) | 数据存储组件，可将数据写入到多个媒介 |
| [highlight.js](https://github.com/isagalaev/highlight.js) | 正文内代码高亮 |
| [inline-attachment](https://github.com/Rovak/InlineAttachment) | 粘贴板复制粘贴上传以及文件拖拽上传 |
| [codemirror](https://github.com/codemirror/CodeMirror) | 前端编辑器 |
| [simplemde](https://github.com/sparksuite/simplemde-markdown-editor) | Markdown编辑器 |

## 赞助 Donate

开源项目的发展离不开大家的支持，如果项目对你有所帮助你可以赞助我帮助我把 PHPDish 做的更好。

- 微信/支付宝

<img src="https://raw.githubusercontent.com/slince/phpdish/master/app/Resources/assets/alipay.png" height="350"/><img src="https://raw.githubusercontent.com/slince/phpdish/master/app/Resources/assets/wechat-pay.png" height="350"/>

- PayPal

[https://www.paypal.me/slince](https://www.paypal.me/slince)

捐赠时请留下您的 GitHub 或者个人主页等相关的个人信息 :heart:。

### Donate 列表

| 赞助者 | 赞助金额 (￥)|
| --- | --- |
| [Intern](https://www.xde.io) | 50 |
| 阳阳 | 10 |
| [アクア様が見てる@沟槽](https://www.phpdish.com/users/gouchaoer) | 200 + 200 |


## 联系我

- 邮箱：taosikai@yeah.net
- Github： https://github.com/slince
- Gitee： https://gitee.com/slince
- 微信：

<img src="https://raw.githubusercontent.com/slince/phpdish/master/app/Resources/assets/wechat.jpg" width="200"/>


## CHANGELOG

更新日志 [CHANGELOG](./CHANGELOG.md)

## License

PHPDish 采用 [MIT](https://opensource.org/licenses/MIT) 开源许可证，你可以在商业项目中免费使用 PHPDish 或者基于 PHPDish 二次
开发而不必支付费用。
