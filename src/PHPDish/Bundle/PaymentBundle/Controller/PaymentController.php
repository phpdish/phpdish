<?php

namespace PHPDish\Bundle\PaymentBundle\Controller;

use PHPDish\Bundle\PaymentBundle\Form\Type\PaymentType;
use PHPDish\Bundle\PaymentBundle\Service\PaymentManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    /**
     * 创建交易
     * @Route("/payments", name="payment_add")
     * @Method("POST")
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
     * 检查支付结果
     * @Route("/payments/result", name="payment_result")
     * @param Request $request
     * @return Response
     */
    public function getPaymentResultAction(Request $request)
    {
        $qrId = $request->query->get('qr_id');
        if (!$qrId) {
            throw new \InvalidArgumentException("Bad Request");
        }
        $result = $this->get('phpdish.payment_gateway.youzan')->checkQRStatus($qrId);
        if ($result) { //如果支付成功，则通知
            $this->getPaymentManager()->notifyPayment($qrId);
        }
        return $this->json([
            'result' => $result
        ]);
    }

    /**
     * 检查支付结果
     * @Route("/payments/test", name="payment_test")
     * @param Request $request
     * @return Response
     */
    public function testAction()
    {
        $this->getPaymentManager()->notifyPayment('6410820');
        return $this->json([
            'result' => 'success'
        ]);
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
