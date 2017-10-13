<?php

namespace PHPDish\Bundle\CoreBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;

class RestController extends FOSRestController
{
    const HTTP_BAD_REQUEST = 400;
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;
}
