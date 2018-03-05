<?php

namespace PHPDish\Bundle\UserBundle\Controller;

use FOS\UserBundle\Controller\ChangePasswordController as FOSChangePasswordController;
use Symfony\Component\HttpFoundation\Request;

class ChangePasswordController extends FOSChangePasswordController
{
    public function __construct() {
        $eventDispatcher = $this->get('event_dispatcher');
        $formFactory = $this->get('fos_user.change_password.form.factory');
        $userManager = $this->get('fos_user.user_manager');
        parent::__construct($eventDispatcher, $formFactory, $userManager);
    }

    public function changePasswordAction(Request $request)
    {
        return parent::changePasswordAction($request);
    }
}