var wu = wu || {};
wu.tmpl = function(tpl, data) {
    var fn = tpl.replace(/&lt;/g, '<').replace(/&gt;/g, '>') //    转义 <>
        .replace(/(<%=)([\s\S]*?)(%>)/g, '$1_html_+= ($2)\n$3') // <%= %>  [\s\S]允许换行
        .replace(/(<%)(?!=)([\s\S]*?)(%>)/g, '$1\n\t$2\n$3') // <% js code %>  (?!=)不要匹配到<%= %>
        .replace(/(^|%>|%>)([\s\S]*?)(<%=|<%|$)/g, function($, $1, $2, $3) { // 边界符外的html, html 中的(\|"|\r|\n) 要转义
            return '_html_+= "' + $2.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n') + '"\n'
        });
    return (fn = Function('data', 'with(data||{}){\nvar _html_=""\n' + fn + '\nreturn _html_\n}')), data ? fn(data) : fn
};