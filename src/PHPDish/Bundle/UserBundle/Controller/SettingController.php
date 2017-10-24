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
     * 修改资料
     * @Route("/settings", name="setting_profile")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function editProfileAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->getUser();
        $form = $this->createForm(ChangeUserProfileType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getUserManager()->saveUser($user);
            $this->addFlash('success', '资料修改成功');
            return $this->redirectToRoute('setting_profile');
        }
        return $this->render('PHPDishWebBundle:Setting:profile.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * 绑定社交账户
     * @Route("/settings/social-binding", name="setting_social_binding")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function bindSocialSiteAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        return $this->render('PHPDishWebBundle:Setting:bind_social.html.twig', [
        ]);
    }
}
