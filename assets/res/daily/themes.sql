/*
Navicat MySQL Data Transfer

Source Server         : ixiju
Source Server Version : 50169
Source Host           : slince.gotoftp2.com:3306
Source Database       : slince

Target Server Type    : MYSQL
Target Server Version : 50169
File Encoding         : 65001

Date: 2015-01-28 12:18:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for themes
-- ----------------------------
DROP TABLE IF EXISTS `themes`;
CREATE TABLE `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(15) NOT NULL DEFAULT '' COMMENT '话题名',
  `slug` varchar(15) NOT NULL DEFAULT '' COMMENT '区分',
  `description` mediumtext COMMENT '描述',
  `show_pic` varchar(200) NOT NULL DEFAULT '' COMMENT '配图',
  `parent_id` int(11) DEFAULT NULL COMMENT '父类id',
  `left_id` int(11) DEFAULT NULL COMMENT '左边记录d',
  `right_id` int(11) DEFAULT NULL COMMENT '右边记录d',
  `sort` tinyint(2) NOT NULL DEFAULT '0' COMMENT '分类优先级',
  `accept_submission` tinyint(1) NOT NULL DEFAULT '0' COMMENT '接受回复',
  `attention_nums` int(11) NOT NULL DEFAULT '0' COMMENT '关注人数',
  `question_nums` int(11) NOT NULL DEFAULT '0' COMMENT '问题总数',
  `is_lock` tinyint(1) NOT NULL DEFAULT '0' COMMENT '锁定编辑',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `last_update_time` char(10) NOT NULL DEFAULT '' COMMENT '最后更新时间',
  `create_time` char(10) NOT NULL DEFAULT '' COMMENT '创建时间',
  `modify_time` char(10) NOT NULL DEFAULT '' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='话题表';

-- ----------------------------
-- Records of themes
-- ----------------------------
INSERT INTO `themes` VALUES ('1', '戏剧家园', 'xijuhome', '戏剧家园是一个从事戏剧资讯传播的网站，在这里您可以发布您知道的信息资讯，比如演出、剧照或者比赛等信息，让大家更多的了解戏曲动态', 'http://www.ixiju.com.cn/img/favicon.png', null, '1', '2', '88', '1', '1', '0', '1', '1', '', '1422414207', '1422414207');
INSERT INTO `themes` VALUES ('2', '戏曲', 'xiqu', '中国戏曲主要是由民间歌舞、说唱和滑稽戏三种不同艺术形式综合而成。它起源于原始歌舞，是一种历史悠久的综合舞台艺术样式。经过汉、唐到宋、金才形成比较完整的戏曲艺术，它由文学、音乐、舞蹈、美术、武术、杂技以及表演艺术综合而成，约有三百六十多个种类。', '/files/images/origin/20150128/142241702346.png', null, '3', '4', '66', '1', '0', '0', '1', '1', '', '1422417038', '1422417038');
