<?php

namespace PHPDish\Bundle\ChatBundle\Controller;

use FOS\MessageBundle\FormModel\NewThreadMessage;
use PHPDish\Bundle\ChatBundle\Entity\Chat;
use PHPDish\Bundle\ChatBundle\Form\Type\NewChatType;
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
     * 添加新的聊天
     * @Route("/chats/new", name="add_chat")
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

        return $this->container->get('templating')->renderResponse('PHPDishWebBundle:Chat:newChat.html.twig', array(
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
     * @Route("/chats", name="chats")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function indexAction(Request $request)
    {
        return $this->render('PHPDishChatBundle:Default:index.html.twig');
    }
}
