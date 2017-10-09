<?php

namespace PHPDish\Bundle\UserBundle\Security\Core\User;

use Carbon\Carbon;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider as BaseFOSUBProvider;
use PHPDish\Component\Media\Manager\FileManagerInterface;
use PHPDish\Component\Media\Model\Image;
use Symfony\Component\Security\Core\User\UserInterface;

class FOSUBUserProvider extends BaseFOSUBProvider
{
    /**
     * @var FileManagerInterface
     */
    protected $fileManager;

    /**
     * {@inheritDoc}
     */
    public function connect(UserInterface $user, UserResponseInterface $response)
    {
        $this->userManager->updateUser($user);
    }

    /**
     * {@inheritDoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        $username = $response->getUsername();
        $user = $this->userManager->findUserBy(array($this->getProperty($response) => $username));
        if (is_null($user)) {
            $user = $this->createNewUser($response);
        }

        $serviceName = $response->getResourceOwner()->getName();
        $accessTokenSetter = 'set' . ucfirst($serviceName) . 'AccessToken';
        $user->$accessTokenSetter($response->getAccessToken());
        $idSetter = 'set' . ucfirst($serviceName) . 'Id';
        $user->$idSetter($response->getUsername());

        return $user;
    }

    /**
     * 创建一个新用户
     * @param UserResponseInterface $response
     * @return \PHPDish\Bundle\UserBundle\Model\UserInterface
     */
    protected function createNewUser(UserResponseInterface $response)
    {
        $user = $this->userManager->createUser()
            ->setEnabled(true)
            ->setUsername($this->generateUsername($response))
            ->setPassword('')
            ->setEmail($response->getEmail() ?: '')
            ->setCreatedAt($now = Carbon::now())
            ->setUpdatedAt($now);

        $avatar = $this->downloadAvatar($response->getProfilePicture());
        $user->setAvatar();
        return $user;
    }

    /**
     * 生成用户名
     * @param UserResponseInterface $response
     * @return string
     */
    protected function generateUsername(UserResponseInterface $response)
    {
        $username = $response->getNickname();
        return $this->userManager->findUserByUsername($username)
            ? $username . $response->getUsername()
            : $username;
    }

    /**
     * 下载用户的头像
     * @param string $avatarUrl
     * @return Image
     */
    protected function downloadAvatar($avatarUrl)
    {
        $image = new Image();
        $image->setContent(file_get_contents($avatarUrl))
            ->setKey(md5(uniqid() . $avatarUrl) . strrchr($avatarUrl, '.'));

        $this->fileManager->upload($image);
        return $image;
    }
}