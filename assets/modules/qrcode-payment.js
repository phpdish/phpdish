'use strict';

import Util from './util.js';

class QRPayment
{
    constructor(qrcode){
        this.qrcode = qrcode;
        const html = require('../templates/qrcode_payment.njk');
        Util.dialog.create(false, html.render({
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
        }, 2000); //3s后开始查询
    }

    loopPaymentResult(qrId){

        if (this.loopLock) {
            return false;
        }

        Util.request('payment.result', {}, {'qr_id': qrId}).done((response)=>{
            if (response.result) {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                Util.dialog.create(false, '<div class="payment-result"><i class="if i-success"></i> <p>支付成功</p></div>', {
                    width: 180,
                    okValue: '确定',
                    ok: ()=>{
                        location.reload();
                    },
                    cancelValue: '取消',
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