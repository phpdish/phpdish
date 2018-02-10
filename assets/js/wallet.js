import lockButton from '../modules/button-lock.js';
import Util from '../modules/util.js';

const $walletInfo = $('[data-role="wallet-info"]');

$walletInfo.length > 0 && (function($){
    const $withdraw = $walletInfo.find('[data-role="withdraw"]');
    const $balance = $walletInfo.find('[data-amount]');
    const btnLock = lockButton($withdraw);
    $withdraw.on('click', function(){
        if (btnLock.isDisabled()) {
            return false;
        }
        btnLock.lock();
        const balance = $balance.data('amount');
        Util.dialog.inputs('提现', [
            {name: 'amount', required: true, placeholder: '提现金额'},
            {name: 'alipay_account', required: true, placeholder: '支付宝账号'},
        ], {
            rules: {
                amount: {
                    required: true,
                    digits:true,
                    min: 100,
                    max: Math.floor(balance / 100)
                }
            },
            messages: {
                amount: {
                    required: '请输入提现金额',
                    digits: '提现金额只能是整数',
                    min: '提现金额不得少于{0}元',
                    max: '提现超出当前余额'
                },
                alipay_account: {
                    required: '请输入支付宝账号'
                },
            }
        }, {
            width: 300
        }).then((data)=>{
            data.amount = data.amount * 100;
            Util.request('wallet.withdraw', {}, data).done((response)=>{
                Util.dialog.message('提现成功，请等待处理').flash(()=>{
                    location.reload();
                })
            }).fail((response)=>{
                Util.dialog.message(response.responseJSON.error).flash(()=>{
                    // location.reload();
                })
            }).always(()=>{
               btnLock.release();
            });
        }, ()=>{
            btnLock.release();
        });
    });
})($);