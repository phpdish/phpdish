<?php

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;

use Carbon\Carbon;
use Doctrine\Common\Persistence\ObjectManager;
use PHPDish\Bundle\ForumBundle\Service\TopicManagerInterface;

class TopicFixtures extends AbstractFixtures
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $title = '基于 PHP 的内网穿透工具 “Spike”';
        $body = <<<EOT
Spike [ https://github.com/slince/spike]( https://github.com/slince/spike);
之前由于要与一个同事远程协作开发一款app需要用到内网穿透服务，在网上找到了frp与ngrok；后来我在想能不能用php也写出来一个这样的服务软件？大家都知道php多进程多线程不够友好，在window上还不支持；写服务确实很吃力；不过幸运的是有[ReactPHP](https://github.com/reactphp)的存在，关于ReactPHP不做赘述有兴趣的同学可以自行百度。

基于ReactPHP的IO多路复用，使得Spike并没有比Frp性能差太多；下面是我简单做的一个benchmark，基于apache ab检验http隧道的服务性能；客户端与服务端都搭在本地，代理同事电脑上的http服务。不是特别符合应用场景，大家简单看一下。

Spike:
```
Concurrency Level:      10
Time taken for tests:   37.727 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      2569900 bytes
HTML transferred:       2514600 bytes
Requests per second:    2.65 [#/sec] (mean)
Time per request:       3772.747 [ms] (mean)
Time per request:       377.275 [ms] (mean, across all concurrent requests)
Transfer rate:          66.52 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       3
Processing:   533 3602 591.9   3714    4096
Waiting:      516 3587 592.3   3701    4076
Total:        534 3602 591.9   3715    4097

Percentage of the requests served within a certain time (ms)
  50%   3715
  66%   3791
  75%   3822
  80%   3844
  90%   3970
  95%   4015
  98%   4053
  99%   4097
 100%   4097 (longest request)
```

Frp:
```
Concurrency Level:      10
Time taken for tests:   38.230 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      2569900 bytes
HTML transferred:       2514600 bytes
Requests per second:    2.62 [#/sec] (mean)
Time per request:       3823.045 [ms] (mean)
Time per request:       382.304 [ms] (mean, across all concurrent requests)
Transfer rate:          65.65 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       1
Processing:   379 3650 644.4   3809    4140
Waiting:      360 3633 645.5   3789    4124
Total:        380 3650 644.4   3809    4140

Percentage of the requests served within a certain time (ms)
  50%   3809
  66%   3847
  75%   3909
  80%   3923
  90%   4026
  95%   4053
  98%   4129
  99%   4140
 100%   4140 (longest request)
```

从上面可以看出Spike性能要稍微好点，不过这个地方有点不公平，我在做spike的测试时只开启了服务端的日志，客户端的日志是关闭的；而FRP的两端日志都是开启的；我不知道怎么关frp的日志；

在这里简单提一点由于Spike的日志IO是同步的所以日志的读写会耗掉部分性能，提升日志等级减少日志写入可以提升不少的性能；

最后再次附上项目地址： [https://github.com/slince/spike](https://github.com/slince/spike) 欢迎star，欢迎fork
EOT;

        $this->createTopic($title, $body);

        $title = 'Composer 的源管理工具 Composer Registry Manager';
        $body = <<<EOT
惯例先附上项目地址： [https://github.com/slince/composer-registry-manager](https://github.com/slince/composer-registry-manager)
之前使用的是简称，由于crm容易与常说的crm系统混淆，所以这次改成全称并重新在packagist发布了；
如果以前安装的同学请先使用下面命令卸载
```bash
$ composer global remove slince/crm
```
使用下面命令安装
```bash
$ composer global require slince/composer-registry-manager ^1.2
```
此次在1.2版本中做了个不小的重构，API没有做任何改变，主要改善了下以前的一些写法，重写了部分单元测试；除此之外将源管理配置从库文件的位置移出：
Windows下移至 `C:\Users\用户名下\AppData\Roaming\ComposerRegistryManager\crm.json`
Linux下移至`~/.config/composer-registry-manager/crm.json`
从而修复了因版本升级导致原先做的配置丢失的问题；

上一张GIF图:
![screenshot](https://github.com/slince/composer-registry-manager/raw/master/assets/screenshot.gif)
感谢[NRM](http://cnodejs.org/topic/5326e78c434e04172c006826)给的灵感；
再次附上地址； 欢迎star，欢迎fork；[https://github.com/slince/composer-registry-manager](https://github.com/slince/composer-registry-manager)
EOT;

        $this->createTopic($title, $body);
    }

    /**
     * 创建话题.
     *
     * @param string $title
     * @param string $body
     */
    protected function createTopic($title, $body)
    {
        $manager = $this->getTopicManager();
        $topic = $manager->createTopic($this->getReference('general-user'));
        $topic->setUpdatedAt(Carbon::now())
            ->setTitle($title)
            ->setOriginalBody($body)
            ->setThreads([$this->getReference('thread-share')])
            ->setEnabled(true);
        $manager->saveTopic($topic);
    }

    /**
     * @return TopicManagerInterface
     */
    protected function getTopicManager()
    {
        return $this->container->get('phpdish.manager.topic');
    }

    /**
     * {@inheritdoc}
     */
    public function getDependencies()
    {
        return [
            UserFixtures::class,
            ThreadFixtures::class,
        ];
    }
}
