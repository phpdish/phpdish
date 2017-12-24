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