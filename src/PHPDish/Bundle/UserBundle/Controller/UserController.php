<?php
namespace PHPDish\Bundle\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * @Route("/users/{username}", name="user_home", requirements={"username": "\w+"})
     * @param string $username
     * @return Response
     */
    public function viewAction($username)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $user = $em->getRepository('PHPDishUserBundle:User')->findOneBy(['username'=> $username]);
        return $this->render('PHPDishWebBundle:User:view.html.twig', [
            'user' => $user
        ]);
    }
}