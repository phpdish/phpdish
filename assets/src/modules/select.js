'use strict';

/**
 * checkbox select
 */
function Select(){
    this.selectAll = function(src, target){
        if(typeof src == 'undefined'){
            src = '[data-role="select-all"]';
        }
        $(src).on('click', function(){
            var $this = $(this);
            if(typeof target == 'undefined'){
                target = $this.data('target');
            }
            var $targets = $(target);
            if($this.is(':checked')){
                $targets.each(function(){
                    $(this).prop('checked', true);
                });
            }else{
                $targets.each(function(){
                    $(this).prop('checked', false);
                });
            }
        });
    }
}
module.exports = Select;