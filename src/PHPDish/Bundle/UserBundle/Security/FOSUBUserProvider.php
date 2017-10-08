<?php

namespace PHPDish\Bundle\UserBundle\Security;

use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider as BaseFOSUBProvider;
use Symfony\Component\Security\Core\User\UserInterface;

class FOSUBUserProvider extends BaseFOSUBProvider
{
    /**
     * {@inheritDoc}
     */
    public function connect(UserInterface $user, UserResponseInterface $response)
    {
        $property = $this->getProperty($response);
        $username = $response->getUsername(); // get the unique user identifier

        $existingUser = $this->userManager->findUserBy(array($property => $username));

        if (null !== $existingUser) {
            $this->userManager->updateUser($existingUser);
        }  else {
        }
        $this->userManager->updateUser($user);
    }
}