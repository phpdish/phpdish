<?php
/**
 * Created by PhpStorm.
 * User: taosikai
 * Date: 2017/10/26
 * Time: 10:32
 */

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Model\UserManagerInterface;

class UserFixtures extends AbstractFixtures
{

    /**
     * 获取fos user manager
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->container->get('fos.user_manager');
    }

    public function load(ObjectManager $manager)
    {
        $user =  $this->getUserManager()->createUser();
        $user->setEmail('admin@phpdish.com')
            ->setUsername('admin')
            ->setPlainPassword('admin');
    }
}