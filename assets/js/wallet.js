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
        Util.dialog.inputs(Translator.trans('wallet.withdraw'), [
            {name: 'amount', required: true, placeholder: Translator.trans('wallet.withdraw_amount')},
            {name: 'alipay_account', required: true, placeholder: Translator.trans('wallet.alipay_account')},
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
                    required: Translator.trans('wallet.validation.amount.required'),
                    digits: Translator.trans('wallet.validation.amount.digits'),
                    min: Translator.trans('wallet.validation.amount.min'),
                    max: Translator.trans('wallet.validation.amount.max')
                },
                alipay_account: {
                    required: Translator.trans('wallet.validation.alipay_account.required')
                },
            }
        }, {
            width: 300
        }).then((data)=>{
            data.amount = data.amount * 100;
            Util.request('wallet.withdraw', {}, data).done((response)=>{
                Util.dialog.message(Translator.trans('wallet.withdraw_apply_success')).flash(()=>{
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