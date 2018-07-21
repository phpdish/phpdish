<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\PaymentBundle\Model\Payment as BasePayment;

class Payment extends BasePayment
{
    const SUBJECT_FOLLOW_USER = 'follow_user';

    const SUBJECT_FOLLOW_CATEGORY = 'follow_category';

    const SUBJECT_REPLY_TOPIC = 'reply_topic';

    const SUBJECT_VOTE_TOPIC = 'vote_topic';

    const SUBJECT_VOTE_REPLY= 'vote_reply';

    const SUBJECT_COMMENT_POST = 'comment_post';

    const SUBJECT_MENTION_USER_IN_TOPIC = 'mention_user_in_topic';

    const SUBJECT_MENTION_USER_IN_POST = 'mention_user_in_post';

    const SUBJECT_VOTE_POST = 'vote_post';

    const SUBJECT_VOTE_COMMENT = 'vote_comment';

    const SUBJECT_HANDLE_WITHDRAW = 'handle_withdraw';
}