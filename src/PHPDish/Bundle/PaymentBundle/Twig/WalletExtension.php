<?php

namespace PHPDish\Bundle\PaymentBundle\Twig;

use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PaymentBundle\Model\WalletHistoryInterface;

class WalletExtension extends \Twig_Extension
{
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
                $text = '购买书籍';
                break;
            case PaymentInterface::TYPE_FOLLOW_CATEGORY:
                $text = '订阅专栏';
                break;
            case PaymentInterface::TYPE_CATEGORY_INCOME:
                $text = '专栏收入';
                break;
            case PaymentInterface::TYPE_BOOK_INCOME:
                $text = '书籍收入';
                break;
            case PaymentInterface::TYPE_WITHDRAW:
                $text = '提现';
                break;
            default:
                $text = '未知';
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
                    $text = '已到账';
                } elseif ($history->getType() === PaymentInterface::TYPE_WITHDRAW) {
                    $text = '已打款';
                } else {
                    $text = '已支付';
                }
                break;
            case PaymentInterface::STATUS_WAITING:
                if ($history->getType() === PaymentInterface::TYPE_WITHDRAW) {
                    $text = '处理中';
                } else {
                    $text = '未支付';
                }
                break;
            case PaymentInterface::STATUS_CLOSED:
                $text = '已关闭';
                break;
            default:
                $text = '未知';
        }
        return $text;
    }
}