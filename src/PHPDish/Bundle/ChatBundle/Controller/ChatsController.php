<?php

namespace PHPDish\Bundle\ChatBundle\Controller;

use FOS\MessageBundle\FormModel\NewThreadMessage;
use FOS\MessageBundle\Provider\ProviderInterface;
use PHPDish\Bundle\ChatBundle\Entity\Chat;
use PHPDish\Bundle\ChatBundle\Form\Type\NewChatType;
use PHPDish\Bundle\ChatBundle\Message\Provider;
use PHPDish\Bundle\UserBundle\Controller\ManagerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ChatsController extends Controller
{
    use ManagerTrait;

    /**
     * 收件箱
     * @Route("/chats/inbox", name="chat_inbox")
     * @param Request $request
     * @return Response
     */
    public function inboxAction(Request $request)
    {
        $threads = $this->getProvider()->getInboxThreadsPaginator(
            $request->query->get('page', 1)
        );
        return $this->render('PHPDishWebBundle:Chat:inbox.html.twig', [
            'threads' => $threads
        ]);
    }

    /**
     * 发送箱
     * @Route("/chats/sent", name="chat_sent")
     * @param Request $request
     * @return Response
     */
    public function sentAction(Request $request)
    {
        $threads = $this->getProvider()->getSentThreadsPaginator(
            $request->query->get('page', 1)
        );
        return $this->render('PHPDishWebBundle:Chat:sent.html.twig', [
            'threads' => $threads
        ]);
    }

    /**
     * 添加新的聊天
     * @Route("/chats/new", name="chat_add")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $username = $request->query->get('mail_to');
        $user = $this->getUserManager()->findUserByName($username);
        if (is_null($user)) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(NewChatType::class, $this->createBlankThreadMessage($user));
        $formHandler = $this->container->get('fos_message.new_thread_form.handler');

        if ($message = $formHandler->process($form)) {
            return new RedirectResponse($this->container->get('router')->generate('fos_message_thread_view', array(
                'threadId' => $message->getThread()->getId(),
            )));
        }

        return $this->container->get('templating')->renderResponse('PHPDishWebBundle:Chat:new_chat.html.twig', array(
            'form' => $form->createView(),
            'recipient' => $user,
            'data' => $form->getData(),
        ));
    }

    protected function createBlankThreadMessage($user)
    {
        $threadMessage = new NewThreadMessage();
        $threadMessage->setRecipient($user);
        $threadMessage->setSubject('短消息');
        return $threadMessage;
    }

    /**
     * Gets the provider service.
     *
     * @return Provider
     */
    protected function getProvider()
    {
        return $this->get('phpdish.chat.message_provider');
    }
}
