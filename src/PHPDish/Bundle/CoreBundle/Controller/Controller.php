<?php
namespace PHPDish\Bundle\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller as BaseController;
use Symfony\Component\HttpFoundation\JsonResponse;

class Controller extends BaseController
{
    public function createJsonResponse($data, $status = 200)
    {
        $response =  new JsonResponse($data, $status);
        return $response;
    }
}