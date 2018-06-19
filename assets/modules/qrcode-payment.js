'use strict';

import Util from './util.js';

class QRPayment
{
    constructor(qrcode){
        this.qrcode = qrcode;
        const html = require('../templates/qrcode_payment.njk');
        this.paymentDialog = Util.dialog.create(false, html.render({
            'qrcode': qrcode,
        }), {
            width: 220,
            quickClose: true,
            onclose: () => {
                this.timeout && clearTimeout(this.timeout);
                this.timer && clearTimeout(this.timer);
            },
            onremove: () => {
                this.timeout && clearTimeout(this.timeout);
                this.timer && clearTimeout(this.timer);
            },
        });
        this.loopLock = false;
        //定时查询
        this.timeout = setTimeout(()=>{
            this.timer = setInterval(()=>{
                this.loopPaymentResult(qrcode.id);
            }, 2000);
        }, 1000); //1s后开始查询
    }

    loopPaymentResult(qrId){

        if (this.loopLock) {
            return false;
        }
        this.loopLock = true; //加上循环锁
        Util.request('payment.result', {}, {'qr_id': qrId}).done((response)=>{
            if (response.result) {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.paymentDialog && this.paymentDialog.close();
                Util.dialog.create(false, '<div class="payment-result"><i class="if i-success"></i> <p>'+Translator.trans('payment.pay_success')+'</p></div>', {
                    width: 180,
                    okValue: Translator.trans('ui.confirm'),
                    ok: ()=>{
                        location.reload();
                    },
                    cancelValue: Translator.trans('ui.cancel'),
                    cancel: ()=>{
                        location.reload();
                    },
                    padding: 10
                });
            }
        }).fail(()=>{
        }).always(()=>{
            this.loopLock = false;
        });
    }
}

export default QRPayment;