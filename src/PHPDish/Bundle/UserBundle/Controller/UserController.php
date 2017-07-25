<?php
namespace PHPDish\Bundle\UserBundle\Controller;

use PHPDish\Bundle\UserBundle\Service\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * @Route("/users/{username}", name="user_view", requirements={"username": "\w+"})
     * @param string $username
     * @return Response
     */
    public function viewAction($username)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('PHPDishUserBundle:User')->findOneBy(['username'=> $username]);
        return $this->render('PHPDishWebBundle:User:view.html.twig', [
            'user' => $user
        ]);
    }

    /**
     * @param int $limit
     * @return Response
     */
    public function latestUsersAction($limit)
    {
        $users = $this->getUserManager()->findLatestUsers($limit);
        return $this->render('PHPDishWebBundle:User:latest.html.twig', [
            'users' => $users
        ]);
    }

    /**
     * @return UserManager
     */
    protected function getUserManager()
    {
        return $this->get('phpdish.manager.user');
    }
}