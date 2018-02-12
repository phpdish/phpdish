<?php

namespace PHPDish\Bundle\AdminBundle\Controller;

use PHPDish\Bundle\PaymentBundle\Controller\ManagerTrait;
use Sonata\AdminBundle\Controller\CRUDController as Controller;

class PaymentController extends Controller
{
    use ManagerTrait;

    /**
     * 通过审核
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function approveAction($id)
    {
        $history = $this->admin->getSubject();

        if (!$history) {
            $this->createNotFoundException(sprintf('unable to find the object with id: %s', $id));
        }
        $walletManager = $this->getWalletManager();
//        $history = $walletManager->findWalletHistoryById($id);
        $walletManager->approveWithdraw($history);
        $this->addFlash('sonata_flash_success', '确认提现成功');
        return $this->redirect($this->admin->generateUrl('list', ['filter' => $this->admin->getFilterParameters()]));
    }

    public function edit2Action($id = null)
    {
        $request = $this->getRequest();
        // the key used to lookup the template
        $templateKey = 'edit';

        $id = $request->get($this->admin->getIdParameter());
        $existingObject = $this->admin->getObject($id);
    }

    /**
     * 通过审核
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function declineAction($id)
    {
        $history = $this->admin->getSubject();

        if (!$history) {
            $this->createNotFoundException(sprintf('unable to find the object with id: %s', $id));
        }
        $walletManager = $this->getWalletManager();
//        $history = $walletManager->findWalletHistoryById($id);
        $walletManager->refuseWithdraw($history);
        $this->addFlash('sonata_flash_success', '提现已经拒绝');
        return $this->redirect($this->admin->generateUrl('list', ['filter' => $this->admin->getFilterParameters()]));
    }
}
