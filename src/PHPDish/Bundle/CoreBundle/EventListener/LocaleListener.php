<?php

namespace PHPDish\Bundle\CoreBundle\EventListener;

use PHPDish\Bundle\CoreBundle\Locale\LocaleManager;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class LocaleListener
{
    /**
     * @var LocaleManager
     */
    protected $localeManager;

    public function __construct(LocaleManager $localeManager)
    {
        $this->localeManager = $localeManager;
    }

    /**
     * 处理request
     *
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();
        $locale = $request->getPreferredLanguage($this->localeManager->all());
        if ($locale !== null) {
            $request->setLocale($locale);
        }
    }
}