<?php

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use FOS\UserBundle\Model\UserManagerInterface;
use FOS\UserBundle\Util\UserManipulator;
use PHPDish\Bundle\ResourceBundle\AvatarGenerator\AvatarGeneratorInterface;

class UserFixtures extends Fixture
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $user1 = $this->getUserManipulator()->create('优雅的风', '123456', 'user1@phpdish.com', true, false);
        $user2 = $this->getUserManipulator()->create('风中的少年', '123456', 'user2@phpdish.com', true, false);

        $avatarGenerator = $this->getAvatarGenerator();
        $user1->setAvatar($avatarGenerator->generate('优雅的风')->getKey());
        $user2->setAvatar($avatarGenerator->generate('风中的少年')->getKey());

        $userManager = $this->getUserManager();
        $userManager->updateUser($user1);
        $userManager->updateUser($user2);
        $this->addReference('general-user', $user1);
    }

    /**
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->container->get('fos_user.user_manager');
    }

    /**
     * @return UserManipulator
     */
    protected function getUserManipulator()
    {
        return $this->container->get('fos_user.util.user_manipulator');
    }

    /**
     * @return AvatarGeneratorInterface
     */
    protected function getAvatarGenerator()
    {
        return $this->container->get('phpdish.avatar_generator.user');
    }
}
