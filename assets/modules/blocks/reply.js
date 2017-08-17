import Util from '../util.js';
import MDEditor from '../md-editor/md-editor';

const $repliesPanel = $('[data-role="replies-panel"]');
const editor = new MDEditor($('[data-role="md-editor"]'));
//启用艾特和emoji
editor.registerMention().registerGithubEmoji().enablePlugin();
$repliesPanel.find('[data-role="reply"]').each(function(){
    const $this = $(this);
    const replyId = $this.data('reply-id');
    const username = $this.data('username');
    $this.find('[data-action="mention"]').on('click', function(){
        editor.append(`@${username} `);
        Util.goHash('#add-reply-form');
    });
});

export {editor}