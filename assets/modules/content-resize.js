'use strict';

function ContentResize($contentContainer, $resize){
    function handle(){
        var $this = $(this);
        $this.addClass("disabled");
        $this.siblings().removeClass("disabled");
        $contentContainer.css($this.data("type") == "small" ? {
            "font-size": "initial"
        }: {
            "font-size": "larger"
        })
    }
    $resize.on("click", function() {
        handle.apply(this);
    });
    $resize.on("click", function() {
        handle.apply(this);
    });
}

module.exports = ContentResize;