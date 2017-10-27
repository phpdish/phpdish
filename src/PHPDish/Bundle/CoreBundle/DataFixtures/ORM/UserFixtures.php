<?php

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Util\UserManipulator;

class UserFixtures extends AbstractFixtures
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $user1 = $this->getUserManipulator()->create('优雅的风', '123456', 'user1@phpdish.com', true, false);
        $this->getUserManipulator()->create('风中的少年', '123456', 'user2@phpdish.com', true, false);
        $this->addReference('general-user', $user1);
    }

    /**
     * @return UserManipulator
     */
    protected function getUserManipulator()
    {
        return $this->container->get('fos_user.util.user_manipulator');
    }
}
