<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\NotificationBundle\Controller;

use PHPDish\Bundle\NotificationBundle\Service\NotificationManagerInterface;
use PHPDish\Bundle\ResourceBundle\Controller\ResourceConfigurationInterface;
use PHPDish\Bundle\ResourceBundle\Controller\ResourceController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class NotificationController extends ResourceController
{
    /**
     * @var NotificationManagerInterface
     */
    protected $notificationManager;

    public function __construct(ResourceConfigurationInterface $configuration, NotificationManagerInterface $notificationManager)
    {
        parent::__construct($configuration);
        $this->notificationManager = $notificationManager;
    }

    /**
     * 当前用户的通知.
     *
     * @Route("/notifications", name="notifications")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $meta = $this->notificationManager->findNotificationMetadataPager($this->getUser(),null,
            $request->query->getInt('page', 1)
        );
        //将当前页置为已读
        $this->notificationManager->markAsSeen($meta->getCurrentPageResults());
        return $this->render($this->configuration->getTemplate('Notification:index.html.twig'), [
            'notificationMeta' => $meta,
        ]);
    }
}
