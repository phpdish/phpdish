<?php

declare(strict_types=1);

namespace PHPDish\Bundle\WebBundle\Twig;

use PHPDish\Bundle\WebBundle\Service\SongManagerInterface;

class SongExtension extends \Twig_Extension
{
    /**
     * @var SongManagerInterface
     */
    protected $songManager;

    public function __construct(SongManagerInterface $songManager)
    {
        $this->songManager = $songManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('get_latest_song', [$this->songManager, 'getLatestSong'])
        ];
    }
}