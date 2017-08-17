'use strict';

class ButtonLock{
    constructor($element){
        this.element = $element;
        this.lock();
    }
    text(text){
        this.element.data('_oldText', this.element.html());
        this.element.html(text);
        return this;
    }
    isEnable(){
        return this.element.data('_lock') !== true;
    }
    lock(){
        this.element.addClass('disabled').attr('disabled', true).data('_lock', true);
    }
    release(){
        const oldText = this.element.data('_oldText');
        if (oldText){
            this.element.html(oldText);
        }
        this.element.removeClass('disabled').attr('disabled', false).data('_lock', false);
    }
}

export default function($element){
    return new ButtonLock($element);
};