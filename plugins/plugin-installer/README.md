# PHPDish 插件安装器

[![Latest Stable Version](https://img.shields.io/packagist/v/phpdish/plugin-installer.svg?style=flat-square&label=stable)](https://packagist.org/packages/phpdish/plugin-installer)
[![Total Downloads](https://img.shields.io/packagist/dt/phpdish/plugin-installer.svg?style=flat-square)](https://packagist.org/packages/phpdish/plugin-installer)
[![MIT License](https://img.shields.io/packagist/l/phpdish/plugin-installer.svg?style=flat-square)](https://packagist.org/packages/phpdish/plugin-installer)
[![Scrutinizer](https://img.shields.io/scrutinizer/g/phpdish/plugin-installer.svg?style=flat-square)](https://scrutinizer-ci.com/g/phpdish/plugin-installer/?branch=master)

该插件会自动将 PHPDish 应用下的`plugins` 目录下的类型为 `phpdish-plugin` 的库索引给 `composer`, 使得你可以在本地调试插件或者安装收费等私有插件；同时也可以借助 `composer` 进行插件的版本约束。主要应用在于帮助 PHPDish 用户使用 `composer` 安装不公开在 [packagist.org](https://packagist.org) 上注册的插件。


## Installation

使用 Composer 安装

```bash
$ composer require phpdish/plugin-installer
```

安装完成之后插件将会自动工作。

## License
   
采用 [MIT](https://opensource.org/licenses/MIT) 开源许可证
