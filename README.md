<p align="center">
  <a href="https://www.phpdish.com/">
    <img alt="PHPDish" src="https://raw.githubusercontent.com/slince/phpdish/master/assets/img/logo2.png"/>
  </a>
</p>

PHPDish 是一个基于Symfony框架开发的内容社区系统；得益于大量的前端以及后端的第三方类库的使用使得PHPDish有着高质量的代码，敏捷实现；
由于PHPDish目前规划了很多碎片化的功能因此没有采取标准的代码版本的概念；你可以使用composer或者直接下载本仓库进行程序的安装。
QQ群号：138307655，欢迎进群讨论。

## Features

- 社区话题/回复
- 专栏文章/评论
- Notification通知
- Markdown编辑器
- Github风格Emoji表情支持
- 在回复中@他人
- 个人主页
- 更多 ...

关于部分功能的使用以及实现请关注”[PHPDish开发手记](https://www.phpdish.com/categories/phpdish-development-notes)“专栏，我会在该专栏内记录一些开发经历与使用方法；

PHPDish功能仍在继续实现中，陆续会有新的功能发布出来，欢迎关注，欢迎贡献代码。如果你有好的建议或者问题需要反馈,
可以在[Issue](https://github.com/slince/phpdish/issues) 发布新贴；或者到PHPDish社区 [http://www.phpdish.com](http://www.phpdish.com) 
发布新的话题。如果没有及时回复你可以在PHPDish私信我[@slince](http://www.phpdish.com/users/slince)；


## Requirements:

- PHP 5.5.9+
- MYSQL 5.6+

## Installation

### 使用 Composer

```bash
$ composer create-project phpdish/phpdish -s dev
```

### 使用 GIT 克隆

```bash
$ git clone https://github.com/slince/phpdish.git
```

下载完成之后，安装依赖

```bash
$ composer install
```

修改 `/app/config/parameters.yml` 下的数据库连接参数.

### 执行安装命令

```bash
$ php bin/console phpdish:install
```

根据向导执行安装操作，如果你在安装过程中遇到问题，可以通过上面提到的方式进行反馈；

### 构建前端资源（可选）

前端资源默认已经构建，如果你需要定制自己的样式则需要自行构建才可生效，PHPDish 前端资源基于 Webpack 构建；
 
 - 安装前端依赖
 
```bash
$ npm install
```

 - 执行构建命令
    
```bash
$ npm run build  // 构建生产环境
```
  
```bash
$ npm run build:dev // 构建开发环境
```

### 运行程序

开发环境执行下面命令即可启动

```bash
$ php bin/console server:run
```

生产环境请自行配置 Apache 或者 Nginx

## 联系我

- 邮箱：taosikai@yeah.net
- Github： https://github.com/slince
- Gitee： https://gitee.com/slince
- 微信：

<img src="https://raw.githubusercontent.com/slince/phpdish/master/app/Resources/assets/wechat.jpg" width="320"/>


## License

1. 你可以将 PHPDish 用于非商业用途而不必支付费用，希望但非必须保留页尾“Powered by PHPDish”标识；
2. 在未获取商业授权之前不得将 PHPDish 用于商业项目（包括但不限于企业网站、经营性网站、以营利为目或实现盈利的网站），如果需要商用请联系本人获取商业授权；
3. 无论你是否获得商业授权你都可以随意对本系统进行修改以适应你的业务需求，比如文案修改或者网站美化，但不得再次公开发行或者出售。
4. 获取商业授权之后你可以终身免费升级。
5. 其它功能可以联系本人定制。