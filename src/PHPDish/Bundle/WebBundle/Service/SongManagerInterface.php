<?php

namespace PHPDish\Bundle\WebBundle\Service;

use PHPDish\Bundle\WebBundle\Model\SongInterface;

interface SongManagerInterface
{
    /**
     * 获取最近的一首歌曲
     * @return SongInterface
     */
    public function getLatestSong();
}