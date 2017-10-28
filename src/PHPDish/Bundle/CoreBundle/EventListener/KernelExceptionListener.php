<?php

namespace PHPDish\Bundle\CoreBundle\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\Routing\Router;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

final class KernelExceptionListener
{
    /**
     * 默认的状态码
     *
     * @var string
     */
    const DEFAULT_STATUS_CODE = Response::HTTP_INTERNAL_SERVER_ERROR;

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;

    /**
     * @var Router
     */
    private $router;

    public function __construct(TokenStorageInterface $tokenStorage, AuthorizationCheckerInterface $authorizationChecker, Router $router)
    {
        $this->tokenStorage = $tokenStorage;
        $this->authorizationChecker = $authorizationChecker;
        $this->router = $router;
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        //忽略子请求
        if (!$event->isMasterRequest()) {
            return;
        }

        //当前请求
        $request = $event->getRequest();
        $isRequestApi = $request->getRequestFormat() === 'json' || $request->isXmlHttpRequest();

        $filteredResponse = false;
        if ($isRequestApi) {
            $exception = $event->getException();
            $statusCode = $this->resolveStatusCode($exception);
            switch ($statusCode) {
                //403
                case Response::HTTP_FORBIDDEN:
                    $filteredResponse = $this->createForbiddenResponseForAPI();
                    break;

                // 404处理
                case Response::HTTP_NOT_FOUND:
                    $filteredResponse = $this->createNotFoundResponseForAPI($exception);
                    break;

                // 400处理
                case Response::HTTP_BAD_REQUEST:
                    $filteredResponse = $this->createBadRequestResponseForAPI($exception);
                    break;

                // 500处理
                case Response::HTTP_INTERNAL_SERVER_ERROR:
                    $filteredResponse = $this->createServerErrorResponseForAPI($exception);
                    break;
            }
        }
        $filteredResponse && $event->setResponse($filteredResponse);
    }

    /**
     * 计算该异常对应的错误码
     *
     * @param \Exception $exception
     *
     * @return int
     */
    private function resolveStatusCode(\Exception $exception)
    {
        if ($exception instanceof HttpExceptionInterface) {
            $statusCode = $exception->getStatusCode();
        } else {
            if (in_array($exception->getCode(), array_keys(Response::$statusTexts))) {
                $statusCode = $exception->getCode();
            } else {
                $statusCode = static::DEFAULT_STATUS_CODE;
            }
        }

        return $statusCode;
    }

    /**
     * 创建接口 403 response.
     *
     * @return JsonResponse
     */
    private function createForbiddenResponseForAPI()
    {
        if ($this->authorizationChecker->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
            $response = new JsonResponse([
                'error' => '访问拒绝',
            ], Response::HTTP_FORBIDDEN);
        } else {
            $response = new JsonResponse([
                'error' => '请先登录',
                'redirect' => $this->router->generate('login'),
            ], Response::HTTP_FORBIDDEN);
        }

        return $response;
    }

    /**
     * 创建接口 404 response.
     *
     * @param \Exception $exception
     *
     * @return JsonResponse
     */
    private function createNotFoundResponseForAPI(\Exception $exception)
    {
        return new JsonResponse([
            'error' => $exception->getMessage() ?: '您所请求的资源不存在',
        ], Response::HTTP_NOT_FOUND);
    }

    /**
     * 创建接口 400 response.
     *
     * @param \Exception $exception
     *
     * @return JsonResponse
     */
    private function createBadRequestResponseForAPI(\Exception $exception)
    {
        return new JsonResponse([
            'error' => $exception->getMessage() ?: '错误请求',
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * 创建接口 500 response.
     *
     * @param \Exception $exception
     *
     * @return JsonResponse
     */
    private function createServerErrorResponseForAPI(\Exception $exception)
    {
        return new JsonResponse([
            'error' => $exception->getMessage() ?: '服务器内部错误',
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
