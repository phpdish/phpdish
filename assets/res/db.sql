drop database if exists slcms;
create database slcms default character set utf8 collate utf8_general_ci;
use slcms;
set names utf8;

-- 创建用户表
drop table if exists users;
create table users(
    id int not null auto_increment primary key comment '用户id',
    username varchar(10) not null default '' comment '用户名',
    pwd char(60) not null default '' comment '密码',
    gender tinyint(1) not null default 0 comment '性别',
    avatar varchar(100) not null default '' comment '用户头像地址',
    email varchar(50) not null default '' comment '邮箱',
    points int not null default 0 comment '积分',
    description varchar(255) not null default '' comment '自我描述',
    site_url varchar(255) not null default '' comment '站点url',
    follow_nums int not null default 0 comment '关注数量',
    followed_nums int not null default 0 comment '关注者数量',
    last_login_ip varchar(20) not null default '' comment '上次登录ip',
    create_time char(10) not null default '' comment '注册时间',
    modify_time char(10) not null default '' comment '修改时间',
    last_login_time char(10) not null default '' comment '上次登录时间',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '用户表';


-- 创建用户具体信息表
drop table if exists profiles;
create table profiles(
    id int not null auto_increment primary key comment 'id',
    user_id int not null default 0 comment '用户id',
    realname varchar(15) not null default '' comment '用户姓名',
    qq varchar(25) not null default '' comment 'qq',
    mobile_phone varchar(25) not null default '' comment 'qq',
    self_description varchar(255) not null default '' comment '一句话自述',
    birth_year smallint(4) unsigned not null default 1930 comment '出生年',
    birth_month tinyint(2) unsigned not null default 1 comment '出生月',
    birth_day tinyint(2)  unsigned not null default 1 comment '出生日',
    hobby varchar(50) not null default '' comment '兴趣爱好'
)engine innodb character set utf8 collate utf8_general_ci comment '用户具体信息表';

-- 创建用户动态
drop table if exists feeds;
create table feeds(
    id int not null auto_increment primary key comment '用户id',
    user_id int not null default 0 comment '用户id',
    type tinyint(2) not null default 0 comment '动态类型',
    resource_id int not null default 0 comment '资源id',
    resource_type tinyint(2) not null default 0 comment '资源类型',
    resource_user_id int not null default 0 comment '资源所属用户id',
    parent_resource_id int not null default 0 comment '父级资源id',
    parent_resource_type tinyint(2) not null default 0 comment '父级资源类型',
    parent_resource_user_id int not null default 0 comment '父级资源所属用户id',
    share_text varchar(500) not null default '' comment '转发或者分享时附加文字',
    views int not null default 0 comment '查看次数',
    create_time char(10) not null default '' comment '添加时间'
)engine innodb character set utf8 collate utf8_general_ci comment '用户动态';

-- 创建第三方网站
drop table if exists third_party_sites;
create table third_party_sites(
    id int not null auto_increment primary key comment '用户id',
    name varchar(10) not null default '' comment '网站名',
    code varchar(10) not null default '' comment 'code',
    icon varchar(10) not null default '' comment 'icon',
    arguments text null comment '配置参数',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '第三方网站';

-- 创建第三方网站用户
drop table if exists third_party_site_users;
create table third_party_site_users(
    id int not null auto_increment primary key comment '用户id',
    third_party_site_id int not null default 0 comment '第三方网站id',
    third_party_site_user_id bigint not null default 0 comment '第三方用户id',
    user_id int not null default 0 comment '用户id',
    create_time char(10) not null default '' comment '创建时间'
)engine innodb character set utf8 collate utf8_general_ci comment '第三方网站用户';

-- 创建关注者表
drop table if exists followers;
create table followers(
    id int not null auto_increment primary key comment 'id',
    user_id int not null default 0 comment '用户',
    follow_user_id int not null default 0 comment '关注用户',
    create_time char(10) not null default '' comment '添加时间',
    status tinyint(2) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '粉丝';


-- 创建消息表
drop table if exists messages;
create table messages(
    id int not null auto_increment primary key comment '消息id',
    receiver_id int not null default 0 comment '接收用户id',
    sender_id int not null default 0 comment '发送用户id',
    title varchar(200) not null default '' comment '信息标题',
    content text comment '信息内容',
    sender_username varchar(50) not null default '' comment '发信人用户名',
    type tinyint(2) not null default 1 comment '消息类型，1普通信息，2系统信息 3 群发消息',
    create_time char(10) not null default '' comment '创建时间',
    status tinyint(2) not null default 0 comment '状态，0未读，1已读'
)engine innodb character set utf8 collate utf8_general_ci comment '站内信表';

-- 创建消息模板表
drop table if exists message_templates;
create table message_templates(
    id int not null auto_increment primary key comment 'id',
    name varchar(200) not null default '' comment '模板名',
    title varchar(200) not null default '' comment '信息标题',
    content text comment '信息内容',
    type tinyint(2) default 1 comment '消息类型，1普通信息，2邮件信息',
    is_sys tinyint(1) not null default 0 comment '是不是系统自带，阻止删除',
    description varchar(255) not null default '' comment '描述',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '站内信表';


-- 创建用户角色组

drop table if exists roles;
create table roles(
    id int not null auto_increment primary key comment '角色id',
    name varchar(15) not null default '' comment '角色名',
    alias varchar(15) not null default '' comment '角色别名',
    status tinyint(1) not null default 0 comment '状态',
    create_time char(10) not null default '' comment '注册时间',
    modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '用户表';

-- 创建节点
drop table if exists nodes;
create table nodes(
    id int not null auto_increment primary key comment 'id',
    name varchar(50) not null default '' comment '节点名称',
    alias varchar(50) not null default '' comment '别名名称',
    url varchar(100) not null default '' comment '链接',
    prefix varchar(50) not null default '' comment '路由前缀',
    controller varchar(50) not null default '' comment '控制器名',
    action varchar(50) not null default '' comment '响应方法名',
    query varchar(50) not null default '' comment '相应的后缀',
    sort tinyint(2) not null default 0 comment '排序',
    description varchar(100) not null default '' comment '描述',
    parent_id int null default null comment '父类id',
    left_id int null default null comment '左边记录d',
    right_id int null default null comment '右边记录d',
    status tinyint(2) not null default 0 comment '状态',
    icon varchar(50) not null default '' comment '图标',
    show_in_nav tinyint(1) not null default 0 comment '是否在后台显示',
    create_time char(10) not null default '' comment '创建时间',
    modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '节点';

-- 创建access

drop table if exists roles_nodes;
create table roles_nodes(
    id int not null auto_increment primary key comment '主键',
    role_id int not null default 0 comment 'roles id',
    node_id int not null default 0 comment 'nodes id'
)engine innodb character set utf8 collate utf8_general_ci comment 'role和node的关系';

-- 创建角色关系

drop table if exists users_roles;
create table users_roles(
    id int not null auto_increment primary key comment '主键',
    user_id int not null default 0  comment 'roles id',
    role_id int not null default 0  comment 'nodes id'
)engine innodb character set utf8 collate utf8_general_ci comment 'role和node的关系';

-- 创建内容模型表
drop table if exists models;
create table models(
     id int  not null auto_increment primary key comment '模型id',
     zh_name varchar(20) not null default '' comment '模型中文名',
     en_name varchar(20) not null default '' comment '模型的英文名',
     slug varchar(15) not null default '' comment '区分',
     table_name varchar(10) null comment '模型的附加表',
     display_template varchar(30) not null default 'display' comment '内容首页模板',
     list_template varchar(30) not null default 'index' comment '内容列表页模板',
     show_template varchar(30) not null default 'show' comment '内容展示页模板',
     author varchar(20) not null default '' comment '模型的作者',
     version varchar(10) not null  default '1.0' comment '模型版本',
     is_sys tinyint(1) not null default 0 comment '是不是系统模型',
     is_default tinyint(1) not null default 0 comment '是否是默认模型',
     is_self_manage tinyint(1) not null default 0 comment '单独crud操作',
     status tinyint(1) not null default 0 comment '模型状态',
     create_time char(10) not null default '' comment '加入时间',
     modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '内容模型表';

drop table if exists fields;
create table fields(
    id int not null auto_increment primary key comment '字段id',
    model_id int not null default 0 comment '所属模型id', 
    field varchar(20) not null default '' comment '字段名称',
    name varchar(20) not null default '' comment '字段说明',
    form_type varchar(10) not null default '' comment '表单样式',
    regexp_rule varchar(200) not null default '' comment '验证规则',
    allow_empty tinyint(1) not null default 0 comment '允许为空',
    max_length int(10) not null default 0 comment '最大长度',
    min_length int(10) not null default 0 comment '最小长度',
    default_value text comment '默认值',
    status tinyint(1) not null default 0 comment '状态',
    error_tip varchar(255) not null default '' comment '输入错误时的提示'
)engine innodb character set utf8 collate utf8_general_ci comment '模型字段表';

-- 创建分类表
drop table if exists categories;
create table categories(
  id int not null auto_increment  primary key  comment '分类id',
  name varchar(15) not null default '' comment '分类名',
  slug varchar(15) not null default '' comment '区分',
  model_id int not null default 0 comment '所属模型id',
  description mediumtext null comment '分类描述',
  seo_title mediumtext null comment 'SEO标题',
  seo_description mediumtext null comment 'SEO描述',
  seo_keywords mediumtext null comment 'SEO描述',
  poster varchar(255) not null default '' comment '海报',
  parent_id int null default null comment '父类id',
  left_id int null default null comment '左边记录d',
  right_id int null default null comment '右边记录d',
  show_in_home tinyint(1) not null default 0 comment '在首页展示',
  sort tinyint(2) not null default 0 comment '分类优先级',
  accept_submission tinyint(1) not null default 0 comment '接受投稿',
  post_nums int not null default 0 comment '文档数量',
  status tinyint(1) not null default 0 comment '分类状态',
  create_time char(10) not null default '' comment '创建时间',
  modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '分类表';

-- 创建主内容表
drop table if exists posts;
create table posts(
 id int not null auto_increment primary key comment 'id',
 category_id int not null default 0 comment '所属分类id',
 model_id int not null default 0 comment '所属模型id',
 user_id int not null default 0 comment '作者',
 title varchar(200) not null default '' comment '文章标题',
 keywords varchar(200) null comment '关键词',
 description mediumtext null comment '摘要',
 seo_title mediumtext null comment 'SEO标题',
 seo_description mediumtext null comment 'SEO描述',
 seo_keywords mediumtext null comment 'SEO关键词',
 views int not null default 0 comment '点击次数',
 show_pic varchar(200) not null default '' comment '配图',
 show_pic_m varchar(200) not null default '' comment '中等图',
 show_pic_s varchar(200) not null default '' comment '配图的缩略图',
 is_recommend tinyint(1) not null default 0 comment '是否推荐',
 is_hot tinyint(1) not null default 0 comment '是否热推',
 is_new tinyint(1) not null default 0 comment '是否最新',
 create_time char(10) not null default '' comment '创建时间',
 modify_time char(10) not null default '' comment '修改时间',
 comment_checked int not null default 0 comment '已读评论数目',
 comment_unchecked int not null default 0 comment '未读评论数目',
 allow_comment tinyint(1) not null default 0 comment '是否允许评论',
 reprint_title varchar(50) not null default '' comment '转载标题',
 reprint_address varchar(200) not null default '' comment '转载地址',
 praise_nums int not null default 0 comment '赞的次数',
 stamp_nums int not null default 0 comment '踩的次数',
 status tinyint(2) not null default 0 comment '文章状态'
)engine innodb character set utf8 collate utf8_general_ci comment '主内容表';

-- 创建收藏
drop table if exists favorites;
create table favorites(
    id int not null auto_increment primary key comment '主键',
    user_id int not null default 0 comment '用户id',
    post_id int not null default 0 comment '文档id',
    create_time char(10) not null default '' comment '创建时间'
)engine innodb character set utf8 collate utf8_general_ci comment '收藏表';

-- 创建文章表

drop table if exists articles;
create table articles(
    id int not null auto_increment primary key comment '文章主键',
    post_id int not null default 0 comment '主表当中的id',
    content text null comment '文章内容'
)engine innodb character set utf8 collate utf8_general_ci comment '文章的附加表';

-- 创建视频表
drop table if exists videos;
create table videos(
    id int not null auto_increment primary key comment '视频主键',
    post_id int not null default 0 comment '文档id',
    video_album_id int not null default 0 comment 'id',
    introduce text null comment '剧情介绍',
    region tinyint(2) not null default 0 comment '地区',
    language tinyint(2) not null default 0 comment '语言类型',
    sharpness tinyint(2) not null default 0 comment '清晰度',
    first_letter char(1) not null default '' comment '首字母',
    issue_year int(4) not null default 0 comment '发行年份',
    issuer varchar(50) not null default '' comment '发行方',
    poster varchar(200) not null default '' comment '海报',
    total_episode int not null default 0 comment '集数',
    is_serial tinyint(1) not null default 0 comment '是否连载',
    update_episode int not null default 0 comment '更新到',
    serial_status tinyint(1) not null default 0 comment '连载状态',
    serial_update_time char(10) not null default 1234567890 comment '连载更新时间',
    address mediumtext null comment '视频地址'
)engine innodb character set utf8 collate utf8_general_ci comment '视频';

-- 创建视频专辑表
drop table if exists video_albums;
create table video_albums(
    id int not null auto_increment primary key comment '主键',
    name varchar(50) not null default '' comment '名称',
    front_cover varchar(200) not null default '' comment '封面图',
    description mediumtext null comment '专辑描述',
    user_id int not null default 0 comment '用户id',
    create_time char(10) not null default '' comment '创建时间',
    modify_time char(10) not null default '' comment '更新时间'
)engine innodb character set utf8 collate utf8_general_ci comment '视频专辑表';

-- 创建视频播放器
drop table if exists video_players;
create table video_players(
    id int not null auto_increment primary key comment '主键',
    code varchar(50) not null default '' comment '简码',
    name varchar(50) not null default '' comment '名称',
    logo varchar(200) not null default '' comment '名称',
    description varchar(255) null comment '介绍',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '视频播放器';


-- 创建明星表
drop table if exists actors;
create table actors(
    id int not null auto_increment primary key comment '主键',
    name varchar(50) not null default '' comment '名称',
    en_name varchar(50) not null default '' comment '名称英文',
    avatar varchar(200) not null default '' comment '头像',
    avatar_m varchar(200) not null default '' comment '中头像',
    avatar_s varchar(200) not null default '' comment '小头像',
    region tinyint(2) not null default 0 comment '地区',
    first_letter char(1) not null default '' comment '首字母',
    gender tinyint(1) not null default 0 comment '性别',
    job varchar(50) not null default '' comment '职业',
    height int(3) not null default 0 comment '身高',
    birthday varchar(20) not null default '' comment '生日',
    description text null comment '介绍',
    praise_nums int not null default 0 comment '赞的次数',
    stamp_nums int not null default 0 comment '踩的次数',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '明星表';

-- 创建剧集表
drop table if exists episodes;
create table episodes(
    id int not null auto_increment primary key comment '视频主键',
    video_id int not null default 0 comment '出自视频',
    name varchar(50) not null default '' comment '剧集名称',
    introduce text null comment '分集剧情介绍',
    address text null comment '播放地址',
    create_time char(10) not null default '' comment '创建时间',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '剧集表';

-- 创建角色表
drop table if exists characters;
create table characters(
    id int not null auto_increment primary key comment '主键',
    name varchar(50) not null default '' comment '名称',
    avatar varchar(200) not null default '' comment '头像',
    avatar_m varchar(200) not null default '' comment '头像',
    avatar_s varchar(200) not null default '' comment '小头像',
    description text null comment '描述',
    actor_id int not null default 0 comment '扮演者',
    video_id int not null default 0 comment '出自视频',
    praise_nums int not null default 0 comment '赞的次数',
    stamp_nums int not null default 0 comment '踩的次数',
    create_time char(10) not null default '' comment '创建时间',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '角色表';

-- 创建毕设表

drop table if exists bysjs;
create table bysjs(
    id int not null auto_increment primary key comment '主键',
    post_id int not null default 0 comment '主表当中的id',
    content text null comment '内容',
    taobao_url varchar(200) not null default '' comment '链接地址'
)engine innodb character set utf8 collate utf8_general_ci comment '毕设';

-- 创建图册

drop table if exists photos;
create table photos(
    id int not null auto_increment primary key comment '主键',
    post_id int not null default 0 comment '主表当中的id',
    content text null comment '内容'
)engine innodb character set utf8 collate utf8_general_ci comment '图册';

-- 创建图片表

drop table if exists pictures;
create table pictures(
    id int not null auto_increment primary key comment '主键',
    photo_id int not null default 0 comment '主表当中的id',
    attachment_id int not null default 0 comment '附件id',
    title varchar(100) not null default '' comment '标题',
    src varchar(200) not null default '' comment '图片地址',
    middle_src varchar(200) not null default '' comment '图片中等图地址',
    thumb_src varchar(200) not null default '' comment '图片缩略图地址',
    description text null comment '描述内容',
    width int not null default 0 comment '宽度',
    height int not null default 0 comment '高度',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '图册';

-- 创建排行榜

drop table if exists ranks;
create table ranks(
    id int not null auto_increment primary key comment '主键',
    post_id int not null default 0 comment '主表当中的id',
    announce text null comment '公告',
    start_time char(10) null comment '开始有效时间',
    end_time char(10) null comment '结束时间',
    vote_everyday tinyint(1) not null default 0 comment '有效期内每天可选',
    vote_logged tinyint(1) not null default 0 comment '允许未登录用户都票',
    limit_nums int not null default 1 comment '每次限选数量默认单选',
    show_result tinyint(1) not null default 1 comment '开放结果',
    allow_add_option tinyint(1) not null default 1 comment '允许别人添加选项',
    counts int not null default 0 comment '参与投票次数'
)engine innodb character set utf8 collate utf8_general_ci comment '排行榜';

-- 创建选项

drop table if exists items;
create table items(
    id int not null auto_increment primary key comment '主键',
    rank_id int not null default 0 comment '排行榜id',
    title varchar(100) not null default '' comment '标题',
    src varchar(200) not null default '' comment '图片地址',
    middle_src varchar(200) not null default '' comment '图片中等图地址',
    thumb_src varchar(200) not null default '' comment '图片缩略图地址',
    description varchar(255) not null default '' comment '描述内容',
    counts int not null default 0 comment '投票次数',
    status tinyint(2) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '选项';

-- 创建投票记录

drop table if exists records;
create table records(
    id int not null auto_increment primary key comment '主键',
    item_id int not null default 0 comment '选项id',
    rank_id int not null default 0 comment '排行榜id',
    user_id int not null default 0 comment '用户id',
    ip varchar(20) not null default '' comment '投票ip',
    create_time char(10) not null default '' comment '创建时间'
)engine innodb character set utf8 collate utf8_general_ci comment '投票记录';

-- 创建评论表
drop table if exists comments;
create table comments(
  id int not null auto_increment primary key comment '评论id',
  parent_id int not null default 0 comment '回复某人评论',
  user_id int not null default 0 comment '评论用户id',
  username varchar(50) not null default '' comment '用户名',
  email varchar(50) not null default '' comment '邮箱',
  post_id int not null default 0 comment '评论内容id',
  content text not null comment '评论内容',
  praise_nums int not null default 0 comment '赞的次数',
  stamp_nums int not null default 0 comment '踩的次数',
  ip varchar(15) not null default '' comment '用户ip',
  status tinyint(2) not null default 0 comment '评论审核状态',
  create_time char(10) not null default '' comment '评论时间'
)engine innodb character set utf8 collate utf8_general_ci comment '评论表';

-- 创建标签表

drop table if exists tags;
create table tags(
    id int not null auto_increment primary key comment 'tag主键',
    name varchar(25) not null default '' comment '标签名',
    hits int not null default 0 comment '点击次数',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '标签';

-- 创建用户标签关系表
drop table if exists users_tags;
create table users_tags(
    id int not null auto_increment primary key comment '主键',
    user_id int not null default 0 comment '用户id',
    tag_id int not null default 0 comment '标签id'
)engine innodb character set utf8 collate utf8_general_ci comment '用户标签关系表';

-- 创建文档标签关系表
drop table if exists posts_tags;
create table posts_tags(
    id int not null auto_increment primary key comment '主键',
    post_id int not null default 0 comment '文档id',
    tag_id int not null default 0 comment '标签id'
)engine innodb character set utf8 collate utf8_general_ci comment '文档标签关系表';


-- 创建友情链接
drop table if exists links;
create table links(
  id int not null auto_increment primary key comment '链接id',
  name varchar(50) not null default '' comment '链接名称',
  src varchar(100) not null default '' comment '链接图片地址',
  href varchar(100) not null default '' comment '链接地址',
  sort tinyint(2) not null default 0 comment '排序编号',
  status tinyint(1) not null default 0 comment '地址失效状态',
  create_time char(10) not null default '' comment '创建时间',
  modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '友情链接';


-- 自定义导航
drop table if exists navigators;
create table navigators(
    id  int not null auto_increment primary key comment '主键',
    name varchar(15) not null default '' comment '导航名',
    href varchar(100) not null default '' comment '导航地址',
    sort tinyint(2) not null default 0 comment '排序编号',
    parent_id int null default null comment '父类id',
    left_id int null default null comment '左边记录id',
    right_id int null default null comment '右边记录id',
    locate tinyint(2) not null default 1 comment '导航位置',
    open_type varchar(25) not null default '' comment '打开方式',
    icon varchar(50) not null default '' comment '图标',
    status tinyint(1) not null default 0 comment '状态',
    create_time char(10) not null default '' comment '创建时间',
    modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '首页导航';

-- 创建附件表
drop table if exists attachments;
create table attachments(
    id int not null auto_increment primary key comment '附件id',
    slug varchar(100) not null default '' comment '附件的hash之后的标记',
    name varchar(50) not null default '' comment '附件的文件名',
    file_path varchar(100) not null default '' comment '附件在服务器上的文件地址',
    file_size int(10) not null default 0 comment '附件大小',
    md5hash char(32) not null default '' comment '附件的md5散列值',
    ext varchar(5) not null default '' comment '文件扩展名',
    mimetype varchar(30) not null default 0 comment '文件mimitype',
    title varchar(100) not null default '' comment '附件标题',
    description text null comment '附件说明',
    create_time char(10) not null default '1234567890' comment '创建时间',
    counts int(5) not null default 0 comment '被引用次数',
    downloads int not null default 0 comment '被下载的次数'
) engine innodb character set utf8 collate utf8_general_ci comment '附件表';

-- 创建搜索热词表
drop table if exists keywords;
create table keywords(
     id int not null auto_increment primary key comment 'id',
     name varchar(50) not null default '' comment '热词名称',
     sort tinyint(2) not null default 0 comment '排序',
     status tinyint(2) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '搜索热词';

--  创建广告位表
drop table if exists ad_positions;
create table ad_positions(
     id int not null auto_increment primary key comment 'id',
     mark varchar(50) not null default '' comment '标识',
     name varchar(50) not null default '' comment '名称',
     width int(5) not null default 0 comment '广告位宽度',
     height int(5) not null default 0 comment '广告位高度',
     description text null comment '广告位详细说明',
     show_type tinyint(2) not null default 0 comment '多个广告显示方式',
     use_type tinyint(2) not null default 0 comment '广告调用方式',
     status tinyint(2) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '广告位';

-- 创建广告表
drop table if exists ads;
create table ads(
     id int not null auto_increment primary key comment 'id',
     ad_position_id int not null default 0 comment '广告位id',
     name varchar(50) not null default '' comment '后台显示',
     width int(5) not null default 0 comment '广告宽度',
     height int(5) not null default 0 comment '广告高度',
     type tinyint(2) not null default 0 comment '广告类型1图片2文字3flash4代码',
     advertisers varchar(50) not null default '' comment '广告主',
     src varchar(255) not null default '' comment '图片广告的图片地址',
     href varchar(255) not null default '' comment '广告链接',
     word varchar(255) not null default '' comment '文字广告内容',
     content mediumtext null comment '代码广告内容',
     start_time char(10) null comment '广告开始有效时间',
     end_time char(10) null comment '广告结束时间',
     sort tinyint(2) not null default 0 comment '排序',
     counts int not null default 0 comment '被点击次数',
     status tinyint(2) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '广告';

-- 创建公告表

drop table if exists announces;
create table announces(
    id int not null auto_increment primary key comment '公告主键',
    post_id int not null default 0 comment '主表当中的id',
    content text not null comment '公告内容'
)engine innodb character set utf8 collate utf8_general_ci comment '公告的附加表';

-- 创建图片轮播


drop table if exists carousels;
create table carousels(
    id int  not  null auto_increment primary key comment '轮播图id',
    name varchar(50) not null  default '' comment '图片说明',
    src varchar(100) not null default '' comment '轮播图地址',
    href varchar(100) not null default '' comment '链接地址',
    description text comment '简洁描述',
    sort tinyint(2) not null default 0 comment '排序编号',
    status tinyint(1) not null default 0 comment '地址失效状态',
    type tinyint(2) not null default 0 comment '轮播图类型',
    resource_id int not null default 0 comment '资源id',
    create_time char(10) not null default '' comment '创建时间',
    modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '轮播图';

-- 创建专题管理 
drop table if exists specials;
create  table specials(
    id  int not null auto_increment primary key comment '专题id',
    name varchar(50) not null default '' comment '专题名称',
    src varchar(100) not null default '' comment '链接图片地址',
    description text comment '简洁描述',
    subscript varchar(20) not null default '' comment '角标',
    is_active tinyint(1) not null default 1 comment '是否继续更新',
    sort tinyint(2) not null default 0 comment '排序编号',
    status tinyint(1) not null default 0 comment '地址失效状态',
    create_time char(10) not null default '' comment '创建时间',
    modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '专题管理';

-- 创建碎片
drop table if exists fragments;
create table fragments(
    id  int not null auto_increment primary key comment 'id',
    name varchar(50) not null default '' comment '名称',
    description varchar(100) not null default '' comment '说明',
    value text comment '值',
    status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '碎片管理';

-- 创建文档专题关系

drop table if exists posts_specials;

create table posts_specials(
    id int not null auto_increment primary key comment '主键',
    post_id int not null default 0  comment 'post id',
    special_id int not null default 0  comment 'special id'
)engine innodb character set utf8 collate utf8_general_ci comment 'post和special的关系';

-- 话题

-- 创建话题表
drop table if exists topics;
create table topics(
  id int not null auto_increment  primary key  comment '主键',
  name varchar(15) not null default '' comment '话题名',
  slug varchar(15) not null default '' comment '区分',
  description mediumtext null comment '描述',
  show_pic varchar(200) not null default '' comment '配图',
  parent_id int null default null comment '父类id',
  left_id int null default null comment '左边记录d',
  right_id int null default null comment '右边记录d',
  sort tinyint(2) not null default 0 comment '分类优先级',
  accept_submission tinyint(1) not null default 0 comment '接受回复',
  attention_nums int not null default 0 comment '关注人数',
  question_nums int not null default 0 comment '问题总数',
  is_lock  tinyint(1) not null default 0 comment '锁定编辑',
  status tinyint(2) not null default 0 comment '状态',
  last_update_time char(10) not null default '' comment '最后更新时间',
  create_time char(10) not null default '' comment '创建时间',
  modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '话题表';

-- 创建问题表
drop table if exists questions;
create table questions(
  id int not null auto_increment  primary key  comment '主键',
  title varchar(200) not null default '' comment '问题名',
  topic_id int not null default 0 comment '话题id',
  user_id int not null default 0 comment '用户id',
  content text null comment '问题内容',
  is_good  tinyint(1) not null default 0 comment '精华问题',
  is_top  tinyint(1) not null default 0 comment '置顶',
  is_global  tinyint(1) not null default 0 comment '公告',
  status tinyint(2) not null default 0 comment '分类状态',
  praise_nums int not null default 0 comment '赞的次数',
  stamp_nums int not null default 0 comment '踩的次数',
  reply_nums int not null default 0 comment '问题总数',
  attention_nums int not null default 0 comment '收藏人数',
  last_reply_time char(10) not null default '' comment '最后回复时间',
  create_time char(10) not null default '' comment '创建时间',
  modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '问题表';

-- 创建问题回复表
drop table if exists question_replies;
create table question_replies(
    id int not null auto_increment  primary key  comment '主键',
    question_id int not null default 0 comment '问题id',
    user_id int not null default 0 comment '用户id',
    content text null comment '回答内容',
    status tinyint(2) not null default 0 comment '分类状态',
    praise_nums int not null default 0 comment '赞的次数',
    stamp_nums int not null default 0 comment '踩的次数',
    create_time char(10) not null default '' comment '创建时间',
    modify_time char(10) not null default '' comment '修改时间'
)engine innodb character set utf8 collate utf8_general_ci comment '回复';

-- 创建话题收藏
drop table if exists topic_collections;
create table topic_collections(
    id int not null auto_increment primary key comment '主键',
    user_id int not null default 0 comment '用户id',
    topic_id int not null default 0 comment '话题id',
    create_time char(10) not null default '' comment '创建时间'
)engine innodb character set utf8 collate utf8_general_ci comment '话题收藏表';

-- 创建问题收藏
drop table if exists question_collections;
create table question_collections(
    id int not null auto_increment primary key comment '主键',
    user_id int not null default 0 comment '用户id',
    question_id int not null default 0 comment '问题id',
    create_time char(10) not null default '' comment '创建时间'
)engine innodb character set utf8 collate utf8_general_ci comment '问题收藏表';

-- 创建token
drop table if exists tokens;
create table tokens(
  id int not null auto_increment  primary key  comment '主键',
  code varchar(225) not null default '' comment 'token码',
  param varchar(225) not null default '' comment '绑定的参数',
  create_time char(10) not null default '' comment '创建时间',
  duration int(10) not null default 0 comment '有效时间',
  status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment 'token';

-- 创建订阅者
drop table if exists subscribers;
create table subscribers(
  id int not null auto_increment  primary key  comment '主键',
  email varchar(50) not null default '' comment '邮箱',
  create_time char(10) not null default '' comment '创建时间',
  status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment '订阅者';

-- 积分获取记录
drop table if exists point_records;
create table point_records(
  id int not null auto_increment  primary key  comment '主键',
  points int(10) not null default 0 comment '积分数量',
  type tinyint(2) not null default 0 comment '积分类型',
  resource_id int(10) not null default 0 comment '资源id',
  user_id int(10) not null default 0 comment '用户id',
  create_time char(10) not null default '' comment '创建时间',
  status tinyint(1) not null default 0 comment '状态'
)engine innodb character set utf8 collate utf8_general_ci comment 'point record';

-- 礼物
drop table if exists gifts;
create table gifts(
  id int not null auto_increment  primary key  comment '主键',
  post_id int not null default 0 comment '主表当中的id',
  points int(10) not null default 0 comment '消耗积分',
  limit_nums int(10) not null default 0 comment '限制次数',
  stock int(10) not null default 0 comment '库存',
  exchange_nums int(10) not null default 0 comment '兑换次数',
  hidden_content text null comment '隐藏内容',
  instruction text null comment '说明'
)engine innodb character set utf8 collate utf8_general_ci comment 'gifts';

-- 礼物兑换记录
drop table if exists gift_records;
create table gift_records(
  id int not null auto_increment  primary key  comment '主键',
  credence varchar(100) not null default '' comment '凭证',
  gift_id int(10) not null default 0 comment '礼物id',
  user_id int(10) not null default 0 comment '用户id',
  create_time char(10) not null default '' comment '创建时间'
)engine innodb character set utf8 collate utf8_general_ci comment 'gifts record';


-- rss源
drop table if exists rss_sites;
create table rss_sites(
  id int not null auto_increment  primary key  comment '主键',
  name varchar(50) not null default '' comment '源名称',
  url varchar(100) not null default '' comment 'rss地址',
  create_time char(10) not null default '' comment '创建时间'
)engine innodb character set utf8 collate utf8_general_ci comment 'rss_sites';