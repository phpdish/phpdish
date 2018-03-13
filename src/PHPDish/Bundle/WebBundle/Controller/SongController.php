<?php

namespace PHPDish\Bundle\WebBundle\Controller;

use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class SongController extends Controller
{
    public function getSongAction()
    {
        $manager = $this->get('phpdish.manager.song');
        return $this->render('PHPDishWebBundle:Common:_song_partial.html.twig', [
            'song' => $manager->getLatestSong()
        ]);
    }
}
