<?php

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use PHPDish\Bundle\WebBundle\Entity\FriendLink;
use PHPDish\Bundle\WebBundle\Service\FriendLinkManagerInterface;

class FriendLinkFixtures extends Fixture
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $friendLink = new FriendLink();
        $friendLink->setName('PHPDish')->setUrl('https://www.phpdish.com');
        $this->getFriendLinkManager()->saveFriendLink($friendLink);
    }

    public function getFriendLinkManager()
    {
        return $this->container->get('phpdish.manager.friend_link');
    }
}