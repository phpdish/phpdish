<?php

namespace PHPDish\Bundle\CoreBundle\Controller;

use Pagerfanta\Pagerfanta;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class SearchController extends Controller
{
    const TYPE_POST = 'post';

    const TYPE_TOPIC = 'topic';

    const TYPE_USER = 'user';

    /**
     * 搜索页面
     *
     * @Route("/search", name="search")
     * @param Request $request
     * @return Response
     */
    public function searchAction(Request $request)
    {
        $keyword = $request->query->get('q');
        $type = $request->query->get('type', static::TYPE_TOPIC);
        $searchResult = $this->searcFrom($keyword, $type, [
            'length' => 10,
            'page' => $request->query->getInt('page', 1)
        ]);
        return $this->render('PHPDishWebBundle:Search:result.html.twig', [
            'searchResult' => $searchResult,
            'keyword' => $keyword
        ]);
    }

    /**
     * 从搜索服务获取搜索结果
     *
     * @param string $keyword
     * @param string $type
     * @param array $options
     * @return Pagerfanta
     */
    protected function searcFrom($keyword, $type, $options)
    {
        $searchService = $this->get('phpdish.searcher');

        if ($type === static::TYPE_TOPIC) {
            $searchResult = $searchService->queryTopics($keyword, $options);
        } elseif ($type === static::TYPE_USER) {
            $searchResult = $searchService->queryUsers($keyword, $options);
        } else {
            $searchResult = $searchService->queryPosts($keyword, $options);
        }

        return $searchResult;
    }
}
