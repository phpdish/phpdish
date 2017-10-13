<?php

/*
 * This file is part of the PHPDish package.
 *
 * (c) Tao <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Mention;

use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use PHPDish\Component\Mention\AdapterInterface;
use Symfony\Component\Routing\RouterInterface;

class Adapter implements AdapterInterface
{
    /**
     * @var UserManagerInterface
     */
    protected $userManager;

    /**
     * @var RouterInterface
     */
    protected $router;

    public function __construct(UserManagerInterface $userManager, RouterInterface $router)
    {
        $this->userManager = $userManager;
        $this->router = $router;
    }

    /**
     * {@inheritdoc}
     */
    public function findUsers($names)
    {
        return $this->userManager->findUsersByNames($names);
    }

    /**
     * {@inheritdoc}
     */
    public function createUserLink($user)
    {
        return sprintf('<a href="%s" target="_blank" data-username="%s">@%s</a> ', $this->router->generate('user_view', [
            'username' => $user->getUsername(),
        ]), $user->getUsername(), $user->getUsername());
    }
}
