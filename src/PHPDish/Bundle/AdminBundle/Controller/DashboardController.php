<?php

namespace PHPDish\Bundle\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class DashboardController extends Controller
{
    /**
     * @Route("/", name="admin_dashboard")
     */
    public function indexAction()
    {
        return $this->render('PHPDishAdminBundle:Dashboard:index.html.twig');
    }
}