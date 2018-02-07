<?php

namespace PHPDish\Bundle\PaymentBundle\Controller;

use PHPDish\Bundle\PaymentBundle\Form\Type\PaymentType;
use PHPDish\Bundle\PaymentBundle\Service\PaymentManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    /**
     * 创建交易
     * @Route("/payments", name="payment_add" method="POST")
     * @param Request $request
     * @return Response
     */
    public function createAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $manager = $this->getPaymentManager();
        $payment = $manager->createPayment($this->getUser());
        $form = $this->createForm(PaymentType::class, $payment);
        $form->handleRequest($request);
        if ($form->isValid() && $form->isSubmitted()) {
            $manager->savePayment($payment);

            $qrCode = $manager->charge($payment);

            return $this->json([
                'payment' => $payment,
                'qrcode' => $qrCode
            ]);
        }
        throw new \InvalidArgumentException('Invalid request');
    }

    /**
     * 获取交易管理
     * @return PaymentManagerInterface
     */
    protected function getPaymentManager()
    {
        return $this->get('phpdish.manager.payment');
    }
}
