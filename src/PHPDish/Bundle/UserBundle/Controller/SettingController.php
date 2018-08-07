<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Controller;

use PHPDish\Bundle\ResourceBundle\Controller\ResourceController;
use PHPDish\Bundle\UserBundle\Form\Type\ChangeUserProfileType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Translation\TranslatorInterface;

class SettingController extends ResourceController
{
    use ManagerTrait;

    /**
     * 修改资料.
     *
     * @Route("/settings", name="setting_profile")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function editProfileAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $user = $this->getUser();
        $form = $this->createForm(ChangeUserProfileType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getUserManager()->saveUser($user);
            /** @var TranslatorInterface */
            $translator = $this->get('translator');
            $this->addFlash('success', $translator->trans('profile.edit.success'));

            return $this->redirectToRoute('setting_profile');
        }

        return $this->render($this->configuration->getTemplate('Setting:profile.html.twig'), [
            'form' => $form->createView(),
        ]);
    }

    /**
     * 绑定社交账户.
     *
     * @Route("/settings/social-binding", name="setting_social_binding")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function bindSocialSiteAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        return $this->render($this->configuration->getTemplate('Setting:bind_social.html.twig'));
    }
}
