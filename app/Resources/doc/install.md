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

### 开发环境

执行下面命令即可启动服务

```bash
$ php bin/console server:run
```
在浏览器中输入控制台输出的结果即可

### 生产环境

如果你是 Apache 用户，直接添加一个 vhost 配置即可；

> 注意web根目录是 `phpdish` 下的 `web` 目录

如果你是 Nginx 用户，拷贝本文件夹下的 `nginx/phpdish.conf`，按照提示修改你的配置
然后复制内容到你的 `nginx.conf` 文件里的 `http` 模块内即可。
