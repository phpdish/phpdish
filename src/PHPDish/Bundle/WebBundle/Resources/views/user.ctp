<?php
$this->extend('default');
$this->set('disableUserNav', true);
$this->set('bodyClass', 'ucenter_page ucenter-home');
$flag = isset($flag) ?  $flag : $this->request->param('controller');
?>
<div id="main" class="container" role="main">
    <div class="row">
        <article id="content">
            <div id="ucenter_tips"><?=$this->Flash->render();?></div>
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-3" id="ucenter_nav">
                    <img class="avatar ucenter_avatar" width="80" height="80" src="<?=$this->Url->thumbnail($globalUser['avatar'], 120, 120);?>">
                    <ul id="ucenter_menu">
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'Users', 'action'=>'display']);?>" class="h3 home <?php if($flag=='Users'):?>active<?php endif;?>"><?=$globalUser['username']?></a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'Feeds', 'action'=>'index']);?>" class="post <?php if($flag=='Feeds'):?>active<?php endif;?>">好友圈</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'Posts', 'action'=>'index']);?>" class="post <?php if($flag=='Posts'):?>active<?php endif;?>">文章</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'Messages', 'action'=>'index']);?>" class="message <?php if($flag=='Messages'):?>active<?php endif;?>" data-role="unread-msg-num">消息</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'Comments', 'action'=>'index']);?>" class="comment <?php if($flag=='Comments'):?>active<?php endif;?>">评论</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'Favorites', 'action'=>'index']);?>"  class="like <?php if($flag=='Favorites'):?>active<?php endif;?>">我喜欢</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'PointRecords', 'action'=>'index']);?>" class="credit <?php if($flag=='PointRecords'):?>active<?php endif;?>">积分</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'GiftRecords', 'action'=>'index']);?>" class="gift <?php if($flag=='GiftRecords'):?>active<?php endif;?>">礼品</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'TopicCollections', 'action'=>'index']);?>" class="gift <?php if($flag=='TopicCollections'):?>active<?php endif;?>">我关注的话题</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'QuestionCollections', 'action'=>'index']);?>" class="gift <?php if($flag=='QuestionCollections'):?>active<?php endif;?>">我收藏的帖子</a></li>
                        <li><a href="<?=$this->Url->build(['prefix'=>'user', 'controller'=>'Questions', 'action'=>'index']);?>"  class="gift <?php if($flag=='Questions'):?>active<?php endif;?>">我的帖子</a></li>
                    </ul>
                    <a class="logout_url hidden-sm hidden-xs" href="<?=$this->Url->build(['_name'=>'user.logout']);?>">« 退出</a>
                </div>
                <hr class="hidden-md hidden-lg">
                <div class="col-lg-10 col-md-10 col-sm-9" id="ucenter_page">
                    <div id="ucenter_page_content">
                        <?=$this->fetch('content');?>
                    </div>
                    <div class="text-left" id="ucenter_loading" style="display:none">
                        <div class="loading-indicator">正在加载，请稍后…</div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</div>