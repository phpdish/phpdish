<?php

namespace PHPDish\Bundle\AdminBundle\Controller;

use PHPDish\Bundle\AdminBundle\Form\Type\WithdrawType;
use PHPDish\Bundle\PaymentBundle\Controller\ManagerTrait;
use Sonata\AdminBundle\Controller\CRUDController as Controller;

class PaymentController extends Controller
{
    use ManagerTrait;

    /**
     * 处理提现
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function withdrawAction($id)
    {
        $form = $this->createForm(WithdrawType::class);
        $history = $this->admin->getSubject();
        $request = $this->getRequest();
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $walletManager = $this->getWalletManager();
            $action = $form->getData()['action'];
            $note = $form->getData()['note'];
            if ($action === 'approve') {
                $walletManager->approveWithdraw($history, $note);
                $this->addFlash('sonata_flash_success', '提现已经被确认');
            } else {
                $walletManager->refuseWithdraw($history, $note);
                $this->addFlash('sonata_flash_success', '提现已经拒绝');
            }
            return $this->redirect($this->admin->generateUrl('list', ['filter' => $this->admin->getFilterParameters()]));
        }
        $formView = $form->createView();
        return $this->renderWithExtraParams('PHPDishAdminBundle:Payment:handle_withdraw.html.twig', [
            'action' => 'withdraw',
            'form' => $formView,
            'history' => $history
        ], null);
    }
}
