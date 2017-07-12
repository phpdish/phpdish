<?php
namespace PHPDish\Bundle\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class UserController extends Controller
{
    /**
     * @Route("/users/{username}", name="user_view", requirements={"username": "\w+"})
     */
    public function viewAction($username)
    {

    }
}