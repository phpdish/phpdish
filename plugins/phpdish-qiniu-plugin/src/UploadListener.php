<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\QiNiuPlugin;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

class UploadListener
{
    public function onUpload(FilterResponseEvent $event)
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        $event->setResponse(new Response('hello world'));
    }
}