<?php

namespace PHPDish\Bundle\CoreBundle\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\Routing\Router;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

final class KernelExceptionListener
{
    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    /**
     * @var AuthorizationCheckerInterface
     */
    protected $authorizationChecker;

    /**
     * @var Router
     */
    protected $router;

    public function __construct(TokenStorageInterface $tokenStorage, AuthorizationCheckerInterface $authorizationChecker, Router $router)
    {
        $this->tokenStorage = $tokenStorage;
        $this->authorizationChecker = $authorizationChecker;
        $this->router = $router;
    }

    /**
     * {@inheritdoc}
     */
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        //忽略子请求
        if (!$event->isMasterRequest()) {
            return;
        }
        $response = $event->getResponse();
        $request =  $event->getRequest();
        $isRequestApi = $request->getRequestFormat() === 'json' || $request->isXmlHttpRequest();
        $filteredResponse = false;
        if ($isRequestApi) {
            switch ($response->getStatusCode()) {
                //403
                case Response::HTTP_FORBIDDEN:
                    $filteredResponse  = $this->createForbiddenResponseForAPI();
                    break;
                // 404处理
                case Response::HTTP_NOT_FOUND:
                    $filteredResponse = $this->createNotFoundResponseForAPI();
                    break;
            }
        }
        $filteredResponse && $event->setResponse($filteredResponse);
        $event->stopPropagation();
    }

    /**
     * 创建接口 403 response
     * @return JsonResponse
     */
    protected function createForbiddenResponseForAPI()
    {
        if ($this->authorizationChecker->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
            $response = new JsonResponse([
                'error' => 'Access denied'
            ], Response::HTTP_FORBIDDEN);
        } else {
            $response = new JsonResponse([
                'error' => 'Please sign in first',
                'redirect' => $this->router->generate('login')
            ], Response::HTTP_FORBIDDEN);
        }
        return $response;
    }

    /**
     * 创建接口 404 response
     * @return JsonResponse
     */
    protected function createNotFoundResponseForAPI()
    {
        return new JsonResponse([
            'error' => 'The requested resource does not exist',
        ], Response::HTTP_NOT_FOUND);
    }
}