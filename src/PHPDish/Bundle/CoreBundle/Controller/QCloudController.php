<?php

namespace PHPDish\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class QCloudController extends Controller
{
    /**
     * 提取关键词
     * @Route("/keywords/extract", name="keywords_extract")
     * @param Request $request
     */
    public function extractKeywordsAction(Request $request)
    {
        $content = $request->get('text');

        if (!$content) {
            throw new \InvalidArgumentException('参数不完整');
        }

        $wenZhi = $this->getQCloudFactory()->create(\QcloudApi::MODULE_WENZHI);
        $result = $wenZhi->TextKeywords([
            'title' => $content,
            'content' => $content,
            'channel' => 'CHnews_news_others'
        ]);

        if ($result === false) {
            dump($wenZhi->getResponse());
            dump($wenZhi->getError());exit;
        }
        dump($result);
        exit;
    }

    protected function getQCloudFactory()
    {
        return $this->get('phpdish.qcloud_factory');
    }
}
