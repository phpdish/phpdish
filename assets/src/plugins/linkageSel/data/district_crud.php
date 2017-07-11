<?php
/******************
 *
 * 管理国家区划区域
 *
 * @author waiting@xiaozhong.biz
 * @date 2013.03.05
 *
 ******************/
// @todo 前序列表节点的转移

require 'config.inc.php';

$act = isset($_GET['aj']) ? $_GET['aj'] : null;
$oper = isset($_POST['oper'])  ? strtolower(trim($_POST['oper'])) : null;
if (null === $act) { exit(); }
$p = get_postvalue($act, $oper);
unset($_POST, $_REQUEST);	// no get


$dat = array();
// 1:省,2:直辖市,3:自治区,4:特别行政区, 5:市, 6:市辖区, 7:县
//$dat[] = array('pcode'=> 420000,  'code'=> 420300, 'name'=> '十堰市', 'type'=> 5 );

switch ($act) {
	case 15 :	// 获取指定id下一级节点
		get_data($p);
		break;

	default:
		echo 'err';
		kickuout(0);
		break;
}




// 获取下级数据
function get_data($p) {
	global $dbh;

	$id = (int) $p['id'];
	unset($p);

	$id OR ($id = 1);

	// 先获取节点信息
	$stmt = $dbh->query('SELECT * FROM tb_district WHERE id='. $id);
	$res = $stmt->fetch();
	$left	= $res['lft'];
	$right	= $res['rgt'];
	$level	= $res['level'] + 1;

	// 获取下一级子节点, hidden=true的过滤
	$where = array(
		'lft>' => $left,
		'rgt<' => $right,
		'level=' => $level,
		'hidden' => 0,
	);
	// 获取下一级子节点, hidden=true的过滤
	$stmt = $dbh->query("SELECT * FROM tb_district WHERE lft> $left AND rgt< $right AND level= $level AND hidden=0 ORDER BY ordr DESC, id");
	$res = $stmt->fetchAll();

	$arr = array();
	if (count($res)) {
		foreach ($res as $row) {
			$arr[$row['id']] = array('name'=> $row['name'], 'code'=> $row['code'], 'zip'=> $row['zip'], 'callcode'=> $row['callcode']);
		}
	}
	header("Content-Type: application/json; charset=UTF-8");
	echo json_encode($arr);
}



/*
 * 获取post提交值
 * 对于非数字字段强行strval()!
 * 需要严格检查数据,后台有使用extract()
 */
function get_postvalue($act, $oper = '') {
	switch ($act) {
		case 1 :
			$p['id'] = !isset($_POST['nodeid']) || intval($_POST['nodeid'])<1 ? 1 : intval($_POST['nodeid']);
			break;
		case 15 :
			$p['id'] = !isset($_GET['id']) || intval($_GET['id'])<1 ? 1 : intval($_GET['id']);
			break;

		default:
			return null;
			break;
	}
	return $p;
}

