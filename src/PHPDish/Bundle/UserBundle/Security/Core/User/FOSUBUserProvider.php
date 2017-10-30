<?php

namespace PHPDish\Bundle\UserBundle\Security\Core\User;

use Carbon\Carbon;
use FOS\UserBundle\Model\UserManagerInterface;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider as BaseFOSUBProvider;
use PHPDish\Component\Media\Downloader\FileDownloaderInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class FOSUBUserProvider extends BaseFOSUBProvider
{
    /**
     * @var FileDownloaderInterface
     */
    protected $fileDownloader;

    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    public function __construct(
        UserManagerInterface $userManager,
        TokenStorageInterface $tokenStorage,
        FileDownloaderInterface $fileDownloader,
        array $properties
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->fileDownloader = $fileDownloader;
        parent::__construct($userManager, $properties);
    }

    /**
     * {@inheritdoc}
     */
    public function connect(UserInterface $user, UserResponseInterface $response)
    {
        $this->userManager->updateUser($user);
    }

    /**
     * {@inheritdoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        //如果当前用户已经登录，则直接绑定到当前账户否则从数据库尝试加载
        if (!$user = $this->getAuthenticatedUser()) {
            $username = $response->getUsername();
            $user = $this->getAuthenticatedUser() ?: $this->userManager->findUserBy(array($this->getProperty($response) => $username));
        }
        //如果数据库没有则创建新用户
        if (is_null($user)) {
            $user = $this->createNewUser($response);
        }
        $serviceName = $response->getResourceOwner()->getName();
        $accessTokenSetter = 'set'.ucfirst($serviceName).'AccessToken';
        $user->$accessTokenSetter($response->getAccessToken());
        $idSetter = 'set'.ucfirst($serviceName).'Id';
        $user->$idSetter($response->getUsername());

        return $user;
    }

    /**
     * 创建一个新用户.
     *
     * @param UserResponseInterface $response
     *
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

        try {
            $avatar = $this->fileDownloader->download($response->getProfilePicture());
            $user->setAvatar($avatar->getKey());
        } catch (\Exception $exception) {
            $user->setAvatar('');
        }

        return $user;
    }

    /**
     * 生成用户名.
     *
     * @param UserResponseInterface $response
     *
     * @return string
     */
    protected function generateUsername(UserResponseInterface $response)
    {
        $username = $response->getNickname();

        return $this->userManager->findUserByUsername($username)
            ? $username.$response->getUsername()
            : $username;
    }

    /**
     * 获取当前登录的用户
     * @return UserInterface
     */
    protected function getAuthenticatedUser()
    {
        return ($token = $this->tokenStorage->getToken())
            ? ($token->getUser() instanceof UserInterface ? $token->getUser() : null)
            : null;
    }
}
