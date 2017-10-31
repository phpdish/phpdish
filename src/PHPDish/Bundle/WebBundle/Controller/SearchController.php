<?php

namespace PHPDish\Bundle\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class SearchController extends Controller
{
    /**
     * @Route("/search", name="search")
     *
     * @param Request $request
     */
    public function searchAction(Request $request)
    {
        $keyword = $request->query->get('q');
        $posts = $this->get('algolia.indexer')->search(
            $this->get('doctrine.orm.entity_manager'),
            'PHPDishPostBundle:Post',
            $keyword
        );
        dump($posts);
        exit;
    }
}
