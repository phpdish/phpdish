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

use PHPDish\Bundle\CoreBundle\Plugin\ListenerRegistry;
use PHPDish\Bundle\CoreBundle\Plugin\SimplePlugin;

class QiNiuPlugin extends SimplePlugin
{
    public function registerListeners(ListenerRegistry $registry)
    {
        $registry->addListener('kernel.response2', [UploadListener::class, 'onUpload']);
    }
}