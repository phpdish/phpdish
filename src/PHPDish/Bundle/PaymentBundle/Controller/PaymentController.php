<?php

namespace PHPDish\Bundle\PaymentBundle\Controller;

use FOS\RestBundle\Context\Context;
use JMS\Serializer\SerializationContext;
use PHPDish\Bundle\CoreBundle\Controller\RestController;
use PHPDish\Bundle\PaymentBundle\Form\Type\PaymentType;
use PHPDish\Bundle\PaymentBundle\Service\PaymentManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends RestController
{
    use ManagerTrait;

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
     * 处理消息推送
     * @Route("/payments/notify", name="payment_notify")
     * @param Request $request
     * @return Response
     */
    public function notifyAction(Request $request)
    {
        $youZanPay = $this->get('phpdish.payment_gateway.youzan');
        try {
            $result = $youZanPay->verifyWebhook($request);
            $trade = $youZanPay->getTrade($result['id']);
            if ($trade) { //如果支付成功，则通知
                $this->getPaymentManager()->notifyPayment($trade->getQrId());
                $return = [
                    'result' => 'success'
                ];
            } else {
                $return = [
                    'result' => 'error',
                ];
            }
        } catch (\InvalidArgumentException $exception) {
            $return = [
                'result' => 'error',
                'message' => $exception->getMessage()
            ];
        }
        $this->get('logger')->debug(print_r($return, true));
        return $this->json($return);
    }

    /**
     * 处理消息推送
     * @Route("/wallet/withdraw", name="wallet_withdraw")
     * @param Request $request
     * @return Response
     */
    public function withdrawAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $walletManager = $this->getWalletManager();
        $wallet = $walletManager->getUserWallet($this->getUser());
        $history = $walletManager->withdraw($wallet,
            $request->request->get('amount'),
            $request->request->get('alipay_account')
        );
        $view = $this->view([
            'history' => $history
        ])->setContext((new Context())->setGroups(['Default']));
        return $this->handleView($view);
    }

    /**
     * 处理消息推送
     * @Route("/wallet", name="user_wallet")
     * @param Request $request
     * @return Response
     */
    public function getWalletAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $wallet = $this->getWalletManager()->getUserWallet($this->getUser());
        $histories = $this->getWalletManager()->findUserWalletHistories($wallet,
            $request->query->getInt('page', 1)
        );
        return $this->render('PHPDishWebBundle:Wallet:index.html.twig', [
            'wallet' => $wallet,
            'histories' => $histories
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
