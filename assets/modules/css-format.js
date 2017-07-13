'use strict';

/**
 * 自定义css处理
 * @type {{format: module.exports.format, packAdv: module.exports.packAdv, pack: module.exports.pack}}
 */
module.exports = {
    format: function(s) {
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
        s = s.replace(/;\s*;/g, ";");
        s = s.replace(/\,[\s\.\#\d]*{/g, "{");
        s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
        s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
        s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
        return s;
    },
    compress: function(s) {
        s = s.replace(/\/\*(.|\n)*?\*\//g, "");
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
        s = s.replace(/\,[\s\.\#\d]*\{/g, "{");
        s = s.replace(/;\s*;/g, ";");
        s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
        return (s == null) ? "": s[1];
    },
    compressToMultiLine: function(s) {
        s = s.replace(/\/\*(.|\n)*?\*\//g, "");
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
        s = s.replace(/\,[\s\.\#\d]*\{/g, "{");
        s = s.replace(/;\s*;/g, ";");
        s = s.replace(/;\s*}/g, "}");
        s = s.replace(/([^\s])\{([^\s])/g, "$1{$2");
        s = s.replace(/([^\s])\}([^\n]s*)/g, "$1}\n$2");
        return s;
    }
};