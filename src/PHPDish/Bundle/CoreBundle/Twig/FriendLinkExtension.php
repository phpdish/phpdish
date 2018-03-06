<?php

/*
 * This file is part of the PHPDish package.
 *
 * (c) Tao <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Twig;

use PHPDish\Bundle\CoreBundle\Service\FriendLinkManagerInterface;

class FriendLinkExtension extends \Twig_Extension
{
    /**
     * @var FriendLinkManagerInterface
     */
    protected $friendLinkManager;

    public function __construct(FriendLinkManagerInterface $friendLinkManager)
    {
        $this->friendLinkManager = $friendLinkManager;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters(): array
    {
        return [
            new \Twig_SimpleFilter('get_all_friend_links', [$this->friendLinkManager, 'findAllEnabledFriendLinks']),
        ];
    }
}