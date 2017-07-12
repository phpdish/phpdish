<?php
namespace PHPDish\Bundle\WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $query = $em->getRepository('PHPDishPostBundle:Post')->createQueryBuilder('P');
        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate($query, $request->query->get('page') ?: 1, 10);
        return $this->render('PHPDishWebBundle:Default:index.html.twig', [
            'pagination' => $pagination
        ]);
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {

    }
}
