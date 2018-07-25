<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ChatBundle\Model;

use FOS\MessageBundle\Entity\ThreadMetadata as BaseThreadMetadata;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;

class ThreadMetadata extends BaseThreadMetadata implements IdentifiableInterface
{
}
