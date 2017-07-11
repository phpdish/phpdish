<!DOCTYPE html>
<html lang="zh-CN">
<head>
<title><?=$pageTitle;?></title>
<?php if(!empty($pageKeywords)):?>
<meta name="keywords" content="<?=$pageKeywords?>"/>
<?php endif;?>
<?php if(!empty($pageDesc)):?>
<meta name="description" content="<?=$pageDesc?>"/>
<?php endif;?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="HandheldFriendly" content="True" />
<meta name="MobileOptimized" content="320" />
<meta http-equiv="Cache-Control" content="max-age=7200" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<?php
echo $this->Html->css('/plugins/artDialog/css/ui-dialog.css');
echo $this->Html->css('util/base.css');
echo $this->Html->css('/js/css/common.css');
echo $this->fetch('css');
?>
<style></style>
<!--[if lt IE 9]>
<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<!-- Favicons -->
</head>
<body>
<header class="navbar navbar-default header" role="banner">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="../" class="navbar-brand">Json.<span style="color:#555;">cn</span></a>
        </div>
        <nav class="navbar-collapse collapse navbar-responsive-collapse" role="navigation">
            <ul class="nav navbar-nav">
                <li>
                    <a href="/" data-placement="bottom">在线解析</a>
                </li>
                <li>
                    <a href="/json/wiki.html" data-placement="bottom">什么是Json</a>
                </li>
                <li>
                    <a href="/json/code.html" data-placement="bottom">Json解析代码</a>
                </li>
                <li>
                    <a href="/json/component.html" data-placement="bottom">Json组件</a>
                </li>
            </ul>
        </nav>
    </div>
</header>
<?=$this->fetch('content')?>
<footer>
    <div class="container">
        ©2014 Json.cn All right reserved.
        <a href="http://www.miitbeian.gov.cn/" style="font-size:12px;" target="_blank">京ICP备15025187号-1</a>
    </div>
</footer>
<script type="text/javascript" src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="//cdn.bootcss.com/lodash.js/4.17.2/lodash.min.js"></script>
<script type="text/javascript" src="//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<?=$this->Html->script('/plugins/artDialog/dist/dialog-plus-min.js');?>
<?=$this->Html->script('common.js')?>
<?=$this->fetch('script');?>
<?=$this->element('analysis');?>
</body>
</html>