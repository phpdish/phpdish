<?php

namespace PHPDish\Bundle\WebBundle\Controller;

use Algolia\AlgoliaSearchBundle\SearchResult\SearchResult;
use Pagerfanta\Adapter\ArrayAdapter;
use Pagerfanta\Pagerfanta;
use PHPDish\Component\Algolia\Pagerfanta\Adapter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class SearchController extends Controller
{
    /**
     * @Route("/search", name="search")
     * @param Request $request
     * @return Response
     */
    public function searchAction(Request $request)
    {
        $keyword = $request->query->get('q');
        $searchResult = $this->searcFromAlgolia($keyword, [
            'hitsPerPage' => 2,
            'page' => $request->query->getInt('page', 1) - 1
        ]);
        $pagerfanta = $this->createPagerfanta($searchResult);
        return $this->render('PHPDishWebBundle:Search:result.html.twig', [
            'searchResult' => $pagerfanta,
            'keyword' => $keyword
        ]);
    }

    /**
     * 创建分页
     * @param SearchResult $searchResult
     * @return Pagerfanta
     */
    protected function createPagerfanta(SearchResult $searchResult)
    {
        $adapter = new Adapter($searchResult);
        $pagerfanta  = new Pagerfanta($adapter);
        $pagerfanta->setMaxPerPage($searchResult->getHitsPerPage())
            ->setCurrentPage($searchResult->getPage() + 1);
        return $pagerfanta;
    }

    /**
     * 从Algolia获取搜索结果
     * @param string $keyword
     * @param array $options
     * @return SearchResult
     */
    protected function searcFromAlgolia($keyword, $options)
    {
        return $this->get('algolia.indexer')->search(
            $this->get('doctrine.orm.entity_manager'),
            'PHPDishPostBundle:Post',
            $keyword,
            $options
        );
    }
}
