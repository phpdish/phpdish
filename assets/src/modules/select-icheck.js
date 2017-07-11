'use strict';

/**
 * checkbox select
 */
function Select(){
    this.selectAll = function(src, target){
        if(typeof src == 'undefined'){
            src = '[data-role="select-all"]';
        }
        var $src = $(src);
        if(typeof target == 'undefined'){
            target = $src.data('target');
        }
        var $targets = $(target);
        var length = $targets.length;
        var i=0;
        $src.on('ifClicked', function(event){
            if(event.target.checked){
                $targets.iCheck('uncheck');
                i=0;
            }else{
                $targets.iCheck('check');
                i=length;
            }
        });

        $targets.on('ifClicked',function(event){
            event.target.checked ? i-- : i++;
            if(i==length){
                $src.iCheck('check');
            }else{
                $src.iCheck('uncheck');
            }
        })
    }
}
module.exports = Select;