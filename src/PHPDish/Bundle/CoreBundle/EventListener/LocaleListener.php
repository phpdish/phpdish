<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\EventListener;

use PHPDish\Bundle\CoreBundle\Locale\LocaleManager;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

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
        $locale = null;
        if (!$request->hasPreviousSession()) {
            $locale = $this->getClientPreferredLocale($request);
        } elseif (!$request->attributes->get('_locale')) {
            $locale = $request->getSession()->get('_locale', $this->getClientPreferredLocale($request));
        }

        if ($locale !== null) {
            $request->setLocale($locale);
        }
    }

    protected function getClientPreferredLocale(Request $request)
    {
        return $request->getPreferredLanguage($this->localeManager->all());
    }
}