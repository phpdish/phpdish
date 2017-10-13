<?php

namespace PHPDish\Bundle\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class SettingController extends Controller
{
    /**
     * @Route("/settings/basic", name="setting_basic")
     */
    public function basicAction()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

    }
}
