<?php

namespace PHPDish\Bundle\ResumeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/resume/slince", name="resume_view")
     */
    public function indexAction()
    {
        $user = $this->get('phpdish.manager.user')->findUserByName('slince');
        return $this->render('PHPDishWebBundle:Resume:index.html.twig', [
            'user' => $user
        ]);
    }
}
