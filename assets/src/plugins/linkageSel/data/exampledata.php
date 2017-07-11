<?php
// UTF-8
// 两种方式创建数据
// 直接创建json字符串，必须使用双引号
$data1 = '{
	"2": {"name": "北京市", "code": 110000,
    		"cell": { 
    			"37": {"name": "东城区", "code": 110101, "zip": 100000} ,
    			"53": {"name": "密云县", "code": 110228, "zip": 101500} 
    		}
    },
    "23": {"name": "重庆市", "code": "510000", 
    		"cell": {
    			"2243": {"name": "万州区", "code": 500101, "zip": 404100},
    			"2245": {"name": "渝中区", "code": 500103, "zip": 400000},
    		}
   	}
}';


//  创建数组
$data2 = array(
	'23'=> array( 'name'=> '重庆市', 'code'=> 510000,
		'cell' => array(
			'2243'=> array("name"=> "万州区", "code"=> 500101, "zip"=> 404100),
			'2245'=> array("name"=> "渝中区", "code"=> 500103, "zip"=> 400000)		
		)
	),
	'4'=> array( 'name'=> '河北省', 'code'=> 130000,
		'cell' => array(
			'73'=> array('name'=> '石家庄市', 'code'=> 130100, 'zip'=> 50000,
				'cell'=> array(
					'74'=> array('name'=> "长安区", 'code'=> 130102, 'zip'=> 50000),
					'91'=> array('name'=> '赵县', 'code'=> 130133, 'zip'=> 51530)
				)
			),
			'97'=> array('name'=> '唐山市', 'code'=> 130200, 'zip'=> 63000)		
		)
	)
);
header( 'Content-Type: application/json; charset=UTF-8' );
// echo ($data1);
echo json_encode($data2);

?>
