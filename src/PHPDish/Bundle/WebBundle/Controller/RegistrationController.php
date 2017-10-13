<?php

namespace PHPDish\Bundle\WebBundle\Controller;

use PHPDish\Bundle\UserBundle\Entity\User;
use PHPDish\Bundle\UserBundle\Form\Type\UserType;
use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RegistrationController extends Controller
{
    /**
     * @Route("/register", name="register")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function registerAction(Request $request)
    {
        $user = $this->getUserManager()->createUser();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $password = $this->get('security.password_encoder')
                ->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            $this->getUserManager()->saveUser($user);

            return $this->redirectToRoute('user_view', [
                'username' => $user->getUsername(),
            ]);
        }

        return $this->render('PHPDishWebBundle:Registration:register.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @return UserManagerInterface
     */
    protected function getUserManager()
    {
        return $this->get('phpdish.manager.user');
    }
}
