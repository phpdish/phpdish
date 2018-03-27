<?php

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use PHPDish\Bundle\PostBundle\Service\PostManagerInterface;

class PostFixtures extends Fixture
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $manager = $this->getCategoryManager();
        $post = $manager->createPost($this->getReference('general-user'));

        $body = <<<EOT
此次基准测试只是简单测算一下node与php在冒泡排序方面的时间损耗情况，基本思想是使用冒泡排序各自运算100次之后求出平均值；冒泡排序算法摘自网上，测试代码如下：

## 代码

JavaScript:

```javascript
function sort(arr){
    var n=arr.length; //获取数组的长度，即有n个数在排序
    var temp=null; //定义一个临时变量，交换数据用
    for(var i=0; i<n-1; i++){ //外层循环n-1次
        for(var j=0; j<n-1-i; j++){ //内层每次循环n-1-i次，每次循环完，都能从剩下的数当中找出一个最大的放在n-1-i的位置
            if(arr[j]>arr[j+1]){ //如果a[j]>a[j+1]则交换位置
                temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr; //返回排好序的数组
}

const array = [49, 38, 65, 97, 76, 13, 27,49, 38, 65, 97, 76, 13, 27];
const startTime = new Date();
for (let i = 0; i <= 99; i++) {
    const arr = sort(array);
}
console.log((new Date() - startTime) / 1000  / 100);
```

PHP:

```php
function bubble_sort(\$array)
{
    \$count = count(\$array);
    if (\$count <= 0) return false;
    for (\$i = 0; \$i < \$count; \$i++) {
        for (\$j = \$count - 1; \$j > \$i; \$j--) {
            //如果后一个元素小于前一个，则调换位置
            if (\$array[\$j] < \$array[\$j - 1]) {
                \$tmp = \$array[\$j];
                \$array[\$j] = \$array[\$j - 1];
                \$array[\$j - 1] = \$tmp;
            }
        }
    }
    return \$array;
}


\$array = [49, 38, 65, 97, 76, 13, 27,49, 38, 65, 97, 76, 13, 27];
\$startTime = microtime(true);
for (\$i = 0; \$i <= 99; \$i++) {
    \$arr = bubble_sort(\$array);
}
echo number_format((microtime(true) - \$startTime) / 100, 10);
```
注意：为了测试php5并没有采用php7的强调语法类型

## 测试结果

如图：

PHP5.6
![clipboard.png](https://sfault-image.b0.upaiyun.com/149/676/1496767840-59c89c789d4b7_articlex)

Node7.9:

![clipboard.png](https://sfault-image.b0.upaiyun.com/249/881/2498819097-59c89cb282dee_articlex)

PHP7.1

![clipboard.png](https://sfault-image.b0.upaiyun.com/378/208/3782083225-59c89d1b4f96b_articlex)


## 结论

三次测算的结果分别是：

| 环境 | 时间(s)|
| --- | --- |
|php5.6 | 0.0000207901|
|node7.9 | 0.0005099999999999999|
|php7.1 | 0.0000101209|

测试机器

![clipboard.png](https://sfault-image.b0.upaiyun.com/311/584/3115849489-59c89dbd5178b_articlex)

从本次测试的结果来看在执行速度上 PHP7.1 > PHP5.6 > Node7.9;
EOT;

        $post->setCategory($this->getReference('general-category'))
            ->setTitle('一个简单的NodeJs与PHP的benchmark')
            ->setOriginalBody($body);

        $manager->savePost($post);
    }

    /**
     * @return PostManagerInterface
     */
    protected function getCategoryManager()
    {
        return $this->container->get('phpdish.manager.post');
    }

    /**
     * {@inheritdoc}
     */
    public function getDependencies()
    {
        return [
            UserFixtures::class,
            CategoryFixtures::class,
        ];
    }
}
