<?php
namespace PHPDish\Bundle\WebBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;

interface SongInterface extends IdentifiableInterface, DateTimeInterface
{
    /**
     * 设置歌曲名
     * @param string $name
     * @return SongInterface
     */
    public function setName($name);

    /**
     * 获取歌曲名
     * @return string
     */
    public function getName();

    /**
     * 获取歌曲链接
     * @return string
     */
    public function getSrc();

    /**
     * @param string $src
     * @return SongInterface
     */
    public function setSrc($src);

    /**
     * @param string $srcId
     * @return SongInterface
     */
    public function setSrcId($srcId);

    /**
     * 获取歌曲id
     * @return number
     */
    public function getSrcId();
}