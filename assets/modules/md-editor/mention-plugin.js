'use strict';

function findUser(){
    let users = $('[data-username]').map(function(){
        return $(this).data('username');
    });
    return _.uniq(users);
}

export default function(){
    const users = findUser();
    this.textComplete.register([
        {
            match: /\B@(\S*)$/,
            search: function(term, callback) {
                callback(users.filter((username)=> {
                    return username.startsWith(term)
                        || username.toLowerCase().startsWith(term.toLowerCase());
                }));
            },
            index: 1,
            replace: function(mention) {
                return `@${mention} `;
            }
        }
    ]);
};