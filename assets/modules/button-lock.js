'use strict';

class ButtonLock{
    constructor($element){
        this.element = $element;
    }
    text(text){
        this.element.data('_oldText', this.element.html());
        this.element.html(text);
        return this;
    }
    isEnable(){
        return this.element.data('_lock') !== true;
    }

    isDisabled(){
        return this.element.data('_lock') === true;
    }

    lock(){
        this.element.addClass('disabled').attr('disabled', true).data('_lock', true);
        return this;
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