<?php

namespace PHPDish\Bundle\UserBundle\Controller;

use FOS\UserBundle\Controller\ResettingController as FOSResettingController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ResettingController extends FOSResettingController
{
    /**
     * 重置密码
     *
     * @Route("/resetting/request", name="resetting_request")
     * {@inheritdoc}
     */
    public function requestAction()
    {

    }
}