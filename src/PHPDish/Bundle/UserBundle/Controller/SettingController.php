<?php

namespace PHPDish\Bundle\UserBundle\Controller;

use PHPDish\Bundle\UserBundle\Form\Type\ChangeUserProfileType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class SettingController extends Controller
{
    use ManagerTrait;

    /**
     * @Route("/settings/basic", name="setting_profile")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function editProfileAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $form = $this->createForm(ChangeUserProfileType::class, $this->getUser());
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

        }
        return $this->render('PHPDishWebBundle:Setting:profile.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
