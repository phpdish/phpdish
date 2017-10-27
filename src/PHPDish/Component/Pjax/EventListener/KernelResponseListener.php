<?php

namespace PHPDish\Component\Pjax\EventListener;


use PHPDish\Component\Pjax\Helper\PjaxHelperInterface;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

final class KernelResponseListener
{
    /**
     * @var PjaxHelperInterface
     */
    protected $pjaxHelper;

    public function __construct(PjaxHelperInterface $pjaxHelper)
    {
        $this->pjaxHelper = $pjaxHelper;
    }

    /**
     * 监听响应
     * @param FilterResponseEvent $event
     */
    public function onKernelResponse(FilterResponseEvent  $event)
    {
        if (!$this->pjaxHelper->isPjaxRequest($event->getRequest())) {
            return;
        }
        $this->filterResponse($event->getRequest(), $event->getResponse());
    }

    /**
     * 过滤 response
     * @param Request $request
     * @param Response $response
     */
    protected function filterResponse(Request $request, Response $response)
    {
        $crawler = new Crawler($response->getContent());
        $body = $this->fetchBody($crawler, $this->pjaxHelper->getContainer($request));
        $response->setContent($this->makeTitle($crawler) . $body);
    }

    /**
     * 生成 title
     * @param Crawler $crawler
     * @return string
     */
    protected function makeTitle(Crawler $crawler)
    {
        $pageTitle = $crawler->filter('head > title');
        if (!$pageTitle->count()) {
            return '';
        }
        return "<title>{$pageTitle->html()}</title>";
    }

    /**
     * 提取 body
     * @param Crawler $crawler
     * @param $container
     * @return string
     */
    protected function fetchBody(Crawler $crawler, $container)
    {
        $content = $crawler->filter($container);
        if ($content->count() == 0) {
            return '';
        }
        return $content->html();
    }
}