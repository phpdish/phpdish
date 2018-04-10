<?php

namespace PHPDish\Bundle\PaymentBundle\Twig;

use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;
use Symfony\Component\Translation\TranslatorInterface;

class WalletExtension extends \Twig_Extension
{
    /**
     * @var TranslatorInterface
     */
    protected $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('wallet_history_type', [$this, 'translateWalletHistoryType']),
            new \Twig_SimpleFilter('wallet_history_status', [$this, 'translateWalletHistoryStatus']),
        ];
    }

    /**
     * 翻译钱包历史类型
     * @param WalletHistoryInterface $history
     * @return string
     */
    public function translateWalletHistoryType($history)
    {
        switch ($history->getType()) {
            case PaymentInterface::TYPE_BUY_BOOK:
                $text = $this->translator->trans('payment.type.buy_book');
                break;
            case PaymentInterface::TYPE_FOLLOW_CATEGORY:
                $text = $this->translator->trans('payment.type.subscribe_category');
                break;
            case PaymentInterface::TYPE_CATEGORY_INCOME:
                $text = $this->translator->trans('payment.type.category_income');
                break;
            case PaymentInterface::TYPE_BOOK_INCOME:
                $text = $this->translator->trans('payment.type.book_income');
                break;
            case PaymentInterface::TYPE_WITHDRAW:
                $text = $this->translator->trans('payment.type.withdraw');
                break;
            default:
                $text =$this->translator->trans('payment.type.unknown');
        }
        return $text;
    }

    /**
     * 翻译钱包历史状态
     * @param WalletHistoryInterface $history
     * @return string
     */
    public function translateWalletHistoryStatus(WalletHistoryInterface $history)
    {
        switch ($history->getStatus()) {
            case PaymentInterface::STATUS_OK:
                if ($history->isIncome()) {
                    $text = $this->translator->trans('payment.status.have_received');
                } elseif ($history->getType() === PaymentInterface::TYPE_WITHDRAW) {
                    $text = $this->translator->trans('payment.status.have_tansfer');
                } else {
                    $text = $this->translator->trans('payment.status.paid');
                }
                break;
            case PaymentInterface::STATUS_WAITING:
                if ($history->getType() === PaymentInterface::TYPE_WITHDRAW) {
                    $text = $this->translator->trans('payment.status.processing');
                } else {
                    $text = $this->translator->trans('payment.status.unpaid');
                }
                break;
            case PaymentInterface::STATUS_CLOSED:
                $text = $this->translator->trans('payment.status.closed');
                break;
            default:
                $text = $this->translator->trans('payment.status.unknown');
        }
        return $text;
    }
}