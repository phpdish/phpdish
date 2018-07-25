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

use FOS\MessageBundle\Entity\MessageMetadata as BaseMessageMetadata;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableInterface;

class MessageMetadata extends BaseMessageMetadata implements IdentifiableInterface
{
}
