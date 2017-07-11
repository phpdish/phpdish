/**
 * javascript Infinite Level Linkage Select
 * javascript 无限级联动多功能菜单
 * 
 * Version 2.4 (2014-10-04)
 * @requires jQuery v1.6.0 or newer
 *
 * https://github.com/waitingsong/LinkageSel
 * Examples at: http://linkagesel.xiaozhong.biz/index_en.html
 * @Author waiting@xiaozhong.biz
 *
 * @copyright
 * Copyright (C) 2014 Waiting Song
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
"use strict";

var LinkageSel = function(opts) {
	var $ = jQuery;
	var that		= this;
	this.bindEls	= [];	// [ {"obj": jqobj, "defValue": 0, "value": 0} ] 保存被绑定select的对象及相关信息 value当前值
	//this.data		= {'0': {'name': 'root', val: 0, cell: {}} };		// 数据根 ajax get0时需要后台处理为获取DB第一级
	this.data		= {'0': {}};		// 数据根 ajax get0时需要后台处理为获取DB第一级
	this.recycle	= [],	// 保存被删除的<option>对象以便复用
	this.st = {
			mvcQuery	: false,		// false: 'url?id=n' ; true: 'url/n'
			ie6			: false,		// ie6-8 TRUE when jQuery1.9
			url			: '',			// url to get ALL data (only once execute)
			ajax		: '',			// ajax url to get level-data json 
			autoBind	: true,		// 自动生成下级<select>
			autoHide	: true,		// 自动隐藏下级菜单.若false,则可配合level固定值使用
			hideWidth	: true,	// true-display:none|| false- visibility:hidden
			autoLink	: true,		// 如果只有唯一选项则选中并联动下级
			cache		: true,		// ajax cache
			defVal		: [],			// 默认选择项可多级
			data		: null,
			head		: 'Please select..',		// {str|''|false} 自动添加第一个选择项,非字符串或false表示不使用
			level		: 20,			// 限定层级防止死循环
			loaderImg	: 'images/ui-anim_basic_16x16.gif',
			loader_duration: 100,		// loaderImg show/hide()动画持续时间
			root		: [],			// 根所在位置,决定获取数据入口.不适用于ajax模式
			minWidth	: 120,
			maxWidth	: 300,
			fixWidth	: 0,		// fix <select> width
			select		: [],			// [ ['selector', defValue], [] .. ] || 'selector'
			selClass	: 'LinkageSel',		// 应用于自动创建的<select> class. 若初始化之前就存在的<select>会自动添加上
			selStyle	: '',
			onChange	: false,	// callback function when change
			trigger		: true,	// onChange时是否触发用户自定义回调函数，配合 instance.changeValues()
			triggerValues: [],	// changeValues使用的数据属组
			err			: false,		// 保存出错信息供debug
			abort		: false,		// ajax.abort()
			dataReader	: {}			// 数据结构键名
	};
	
	if(opts && typeof opts === 'object') {  
		$.extend(this.st, opts); 
	}

	if (! this.st.dataReader) {
		this.st.dataReader = {			// 数据结构键名
				id: 'id',		// 若不存在此键名则使用对象的序列值 ，同时影响ajax URL的查询字符串的键名	
				name: 'name',	// 用于<optio>的text值
				cell: 'cell'	// 子元素对象的键名
			};
	}
	else {
		(typeof this.st.dataReader.id === 'undefined' || ! this.st.dataReader.id) && (this.st.dataReader.id = 'id');
		(typeof this.st.dataReader.name === 'undefined' || ! this.st.dataReader.name) && (this.st.dataReader.name = 'name');
		(typeof this.st.dataReader.cell === 'undefined' || ! this.st.dataReader.cell) && (this.st.dataReader.cell = 'cell');
	}

	this.st.selClass = $.trim(this.st.selClass);
	
	//if ($.browser.msie && $.browser.version == '6.0') {
	//	this.st.ie6 = true;
	//}
	if (/msie/.test(navigator.userAgent.toLowerCase())) {
		if ($.browser && $.browser.version && $.browser.version == '6.0') {
			this.st.ie6 = true;	// ie6
		}
		else if (!$.support.leadingWhitespace) {
			this.st.ie6 = true;	// ie6-8! jQuery 1.9+
		}
	}

	// 数据根 ajax get0时需要后台处理为获取DB第一级
	this.data[0][this.st.dataReader.name] = 'root';
	this.data[0][this.st.dataReader.val] = 0;
	this.data[0][this.st.dataReader.cell] = this.st.data;
	
	this.innerCallback = this.st.onChange;
	/* 清空供用户在实例化之后再定义
	 *  eg. var linkageSel = new LinkageSel(opts);
	 *  linkageSel.onChange(function(instance) {
	 *  	// do something
	 *  	instance 为 instance
	 *  });
	 * 
	 */ 
	this.st.onChange = false;	
	
	
	var loader = $('#linkagesel_loader');
	if (!loader || !loader[0]) {
		$(document.body).append('<img id="linkagesel_loader" style="display: none; position: absolute;"  src="' + 
				encodeURI(this.st.loaderImg || 'ui-anim_basic_16x16.gif') + '" />');
		this.loader = $('#linkagesel_loader') || null;
	}
	else {
		this.loader = loader;
	}
	
	if (typeof this.st.select === 'string') {		// selct: 'selector'
		this.st.select = [this.st.select];
	}
	else if (!isArray(this.st.select)) {
		this.st.select = [];
	}
	// void else 	// select: [ 'selctor1', 'selctor2' ]
	
	if ( isNumber(this.st.defVal) ) {
		this.st.defVal = [this.st.defVal];
	}
	else if (! isArray(this.st.defVal)) {
		this.st.defVal = [];
	}
	// void [n1, n2]
	
	if (isNumber(this.st.root)  || ! isNaN(+this.st.root)) {
		this.st.root = [this.st.root];
	}
	else if (!isArray(this.st.root)) {
		this.st.root = [];
	}
	
	var selLen = this.st.select.length;
	if (selLen < 1) {
		alert('没有对象被绑定到mLinkageSel()!');
		return false;
	}
	for (var i = 0; i < selLen; i++) {
		this.bind((this.st.select)[i]);
	}
	
	selLen = opts = loader = null;
	
	this.clean(0);
	// this.fill(0, this.st.select[0][1]); // 生成第一个下拉内容
	this.fill(0, this.st.defVal[0]); // 生成第一个下拉内容
	
	this.outer = {
		// @todo 判断元素是否已绑定
		
		// @todo
		// appendData: function() {},
		
		/**
		 * 手动改变选单值,可选触发onchange回调函数
		 * @param {int|Array}	一级或者多级选单值
		 * @param {bool}		是否触发用户自定义onchange回调函数, 默认TRUE
		 */
		changeValues: function(parm, change) {
			//window.setTimeout(that._changeValues, 2000, parm, change, that);	// FIX 当表单中动态更新linkageSel并且 .dialog('open')时FF下页面闪动
			that._changeValues(parm, change); // 2parm?
			return this;
		},
		
		
		/**
		 * 获得select选择value
		 * @param {int} idx[option]<p>
		 *  不带参数: 获得联动select中'最后一个'有选择<select>的选择值
		 *  idx >= 0	: 获得第 idx 个菜单(从0开始)选择值
		 * 		如果都无有选择则返回 null
		 * </p>
		 * 
		 * return {int|null}	null: 从未选择任何,处于初始化状态
		 */
		getSelectedValue: function(idx) {
			return that._getSelectedValue(idx);
		},

		// 返回数组包含所有select选择值
		getSelectedArr: function() {
			return that._getSelectedArr();
		},
		
		
		/**
		 * 获得第bindIdx级（从0开始）菜单所选项目的所有值的数据对象
		 * 
		 * @param {str} key 返回指定键名的值
		 * @param {int} bindIdx[option]<p>
		 * 	空则返回当前最后一个有选择项选单的选项项值对象包
		 * 	</p>
		 * 
		 * @return {instance|str|null}<p>
		 *  未指定key返回整个对象: 
		 *  {'name': 名称
		 *   'val': 值
		 *   'others': 其他值
		 *  }
		 *  指定key返回对象关联值: instance[key]
		 *  无数据、数据对象无指定key、指定<select>无选择,返回null
		 *  </p>
		 */
		getSelectedData: function(key, bindIdx) {
			return that._getSelectedData(key, bindIdx);
		},
		
		
		/*
		 * 获得所有有选择菜单的数据对象或对象值,遇到第一个未选择的停止
		 * @param {str} key[option]	可选数据对象key
		 * @return {array}<p>
		 *  array记录格式
		 *  	如果指定key则返回 data[key] 对应值: int|str|null
		 *  	如果未指定key返回数据对象data: obj|null
		 * </p>
		 */
		getSelectedDataArr: function(key) {
			return that._getSelectedDataArr(key);
		},
		
		
		onChange: function(callback) {
			if (callback && typeof callback === 'function')	{
				that.st.onChange = callback;
			}
			return this;
		},
		
		
		// 回复到初始状态
		reset: function () {
			that._reset();
			return this;
		},
		
		// 回复到初始状态,包括默认选择项及默认数据
		resetAll: function() {
			that._reset(true);
			return this;
		}
	};
	
	return this.outer;
	
};


LinkageSel.prototype.bind = function(selector) {
	var that = this,
		st = this.st,
		bindEls = this.bindEls,
		bindIdx = bindEls.length || 0,	// 当前被添加对象的index
		defValue = st.defVal && st.defVal[bindIdx] || null,
		elm;
	
	if (!selector) {
		return false;
	}
	
	if (typeof selector === 'string') {
		elm = jQuery(selector).eq(0);
	}
	else if (typeof selector === 'object') {
		elm = selector.jquery ? selector.eq(0) : jQuery(selector).eq(0);
	}
	if (!elm[0] || !elm.is('select')) {
		return false;
	}

	st.selClass && (! elm.hasClass(st.selClass)) && elm.addClass(st.selClass);
	
	// 将绑定的元素放入数组
	bindEls.push({
		obj		: elm,
		value	: defValue,
		defValue: defValue
	});
		
	elm.data('bindIdx', bindIdx)	// 在DOM元素上保存index值,和bindEls中对应
	.change(that, function(e) {				// 当前对象绑定事件，change时清空下级select接着生成或填充
		// e.stopPropagation();
		// e.preventDefault();
		// console.log(that);
		var st = that.st,
			bindEls = that,
			bindIdx = jQuery(this).data('bindIdx'),
			nextEl = bindEls[bindIdx+1] && bindEls[bindIdx+1].obj || null,
			selected_value = null;
		
		if (!nextEl || !nextEl.find('option').length ) {	// 第一次生成
			selected_value = st.defVal && st.defVal[bindIdx + 1] || null;
		}
		that.clean(bindIdx);
		that.fill(bindIdx + 1, selected_value);
	});
	
	if (elm.is(':visible')) {
		this.setWidth(elm);	// 先初始化'静态sel'默认宽度改善页面显示效果,等填充了内容后再判断一次
	}

	// 未加载js本地数据则对一级做一次更新
	bindIdx == 0 && ! st.data && elm.change();
	
	return true;
};
	
	
	// 创建select对象,供动态创建下级菜单
LinkageSel.prototype.creatSel = function(bindIdx, callback) {
	var st = this.st,
		bindEls = this.bindEls,
		str = '';
	
	if (bindIdx <= 0) {
		return false;
	}
	if (bindIdx >= st.level) {
		this.custCallback();		// 超限最后触发一次
		return false;
	}
	
	var id = 'linkagesel_' + (''+Math.random()).slice(-6),
		str = '<select id="' + id + '" style="display: none;'  + st.selStyle + '" class="' + st.selClass + '" ></select>',
		elm = bindEls[bindIdx - 1]['obj'].after(str);
	
	st.select.push( ['#' + id] );		// 保存新条目
	this.bind( '#' + id );			// 绑定新生成的select对象
	
	if (typeof callback === 'function') {
		callback(bindIdx, this);
	}
	
	return true;
};


	
/**
 * 生成option填充select
 * @param {int} bindIdx	bindEls属组索引值
 * @param {int|array} selValue	匹配selected条目的值, 但函数内优先使用st.triggerValues[bindIdx]的值
 */
LinkageSel.prototype.fill = function (bindIdx, selValue) {
	var bindEls = this.bindEls,
		st = this.st,
		head = st.head,
		data = this.getData(bindIdx),
		tarr = [],
		bindEl,
		elm,
		row,
		recycle = this.recycle,
		recycleLen = recycle.length || 0;
	
	this.setLoader(false);
	if (bindIdx >= st.level) {
		this.custCallback();
		return false;
	}
	//console.log([999, bindIdx, selValue]);

	if (st.triggerValues.length) {		// changeSelectedValue()函数调用到这儿
		selValue = st.triggerValues[bindIdx] || null;	// 不使用shift()!! 涉及到remote
	}
	else {								// 普通调用
		selValue = typeof selValue !== 'undefined' && selValue !== '' ? selValue : null;	// select默认值
	}

	// 触发事件的(上级)select无值或空值则不操作直接跳过
	if ( bindIdx > 0 && (bindEls[bindIdx - 1].value === null || bindEls[bindIdx - 1].value === '') ) {
		//console.log([bindIdx, bindEls[bindIdx -1]]);
		bindEl = bindEls[bindIdx] || {};
		elm = bindEl['obj'];
		if (elm && elm[0] && st.autoHide) {
			st.hideWidth && elm.hide() || elm.css('visibility', 'hidden');
		}
		st = bindEls = data = null;
		this.custCallback();
		this.resetTrigger(true);	// 还原默认， 顺序!
		return;
	}
	
	if (data === false) {	// false: ajax尝试无值,以后不再尝试
		this.clean(bindIdx - 1);
		// change事件到底触发用户定义change事件回调函数
		this.custCallback();
		this.resetTrigger(true);	// 还原默认， 顺序!
		return;
	}
	else if (data === null) {	// null: 无值,可ajax获取
		// this.clean(bindIdx - 1);	// 不需要
		if (st.url || st.ajax) {	// getjson|ajax get
			this.getRemoteData(bindIdx - 1, function(idx, inst) {	// instance为实例对象
				typeof inst.bindEls[idx] === 'undefined' && inst.creatSel(idx);
				var defValue = inst.bindEls[idx] && inst.bindEls[idx].defValue || null;
				inst.fill(idx, defValue);
				// inst.custCallback();	// 不需要
			});
		}
		else {
			this.custCallback();
			this.resetTrigger(true);	// 还原默认， 顺序!
		}
		st = bindEls = null;
		return;
	}
	else if (data && typeof data === 'object') {	// 有数据
		if (bindEls.length - 1 < bindIdx) {	// select不存在但存在待生成数据
//			this.creatSel(bindIdx, function(bindIdx, thisElm) {
//				thisElm.fill(bindIdx);
//			});
			this.creatSel(bindIdx);
		}
		bindEl = bindEls[bindIdx] || {};
		elm = bindEl.obj;
		if (! elm || ! elm[0]) {
			return;
		}
		// elm.width('');
			
		if (head || typeof head === 'string') {		// accept blank value
			head = '<option value="">' + head.entityify() + '</option>';
		}
		
		// 开始生成 <option>
		var tOption,
			index = 1,
			selectedIdx = 0,
			name = st.dataReader.name,
			id = st.dataReader.id;

		for (var x in data) {
			if (! data.hasOwnProperty(x)) { continue; }
			row = data[x];
			// 若有id键则使用id键的值作为sequence
			typeof row[id] !== 'undefined' && row[id] && (x = row[id]);
			
			if (recycleLen > 0) {
				tOption = recycle.pop();
				if (typeof tOption === 'object') { 
					//tOption = jQuery(tOption).val(x).text(row.name).removeAttr('selected').get(0) ;		// for jQuery pre 1.6
					tOption = jQuery(tOption).val(x).text(row[name]).prop('selected', false).get(0) ;	// for jQuery 1.6+
				}
				else {
					tOption = jQuery('<option>').val(x).text(row[name]).get(0);
				}
				recycleLen--;
			}
			else {
				tOption = jQuery('<option>').val(x).text(row[name]).get(0) ;
			}
			tarr.push(tOption);
			
			if (selValue !== null && selValue == x) {
				selectedIdx = index;
			}
			index++;
		}
		row = tOption = null;
		
		if (st.autoLink && index === 2) {		// 只有一个选项的直接选中 并且联动下级
			selectedIdx--;	// !
			bindEl.value = x;
			elm.append(tarr).show().css('visibility', '');
			setTimeout(function(){
				elm.change();	// 手动触发以便生成下级菜单 不延迟无法触发
			}, 0);
		}
		else {
			elm.append(head).append(tarr).css('visibility', '').show();	// jQuery.append 可接受DOM数组参数
			if ( ! head && head !== '') {
				setTimeout(function(){
					elm.change();	// 无论默认选择值都触发
				}, 0);
			}
			else if (selValue && ! st.ie6) {	// ie6在下方触发?
				setTimeout(function(){
					elm.change();	// 有默认选择值即触发
				}, 0);
			}
			// 第一级不执行用户定义回调函数
			bindIdx && this.custCallback();
		}
		tarr = recycle = null;
		
		if (! st.ie6) {
			typeof elm[0].options[selectedIdx] === 'object' && (elm[0].options[selectedIdx].selected = true);
		}
		else {
			setTimeout(function(){
				typeof elm[0].options[selectedIdx] === 'object' && (elm[0].options[selectedIdx].selected = true);
				if (selValue) {		// ie6
					elm.change();
				}
			}, 0);	
		}
		this.setWidth(elm);
	}
	st = bindEls = data = bindEl = null;
};


/**
 * 查找数据入口,用于用户自定义root设置
 * @return {obj}
 */
LinkageSel.prototype.findEntry = function(data) {
	var st = this.st,
		root = st.root,
		len = root && root.length || 0;
	
	if (data && len) {	// 有定义默认数据入口
		for (var i = 0; i < len; i++) {
			if (! root[i] || ! data[root[i]] || ! data[root[i]][st.dataReader.cell]) {	// 只要出现即终止
				break;
			}
			else {
				data = data[ root[i] ][st.dataReader.cell];
			}
		}
	}
	
	return data;
};


/**
 * 获得该级菜单数据,路径为上级菜单数据.cell
 * 对于顶级菜单 bindIdx==-1(getRemoteData调用)时也能正常处理,并且可以自定义入口位置
 * @param {int} bindIdx	菜单对象在 bindEls属组中索引值
 * @return {Object||null||false} <p>
 * 		Object	: 有值 { "id1":{ name: 'xx', val: 'xx', cell:{}}, "id2":{ name: 'xx', val: 'xx', cell:{}}  }
 * 		null	: 无值,如果定义ajax属性则通过getjson获取
 * 		false	: 上级菜单选中项目无下级条目(无需通过ajajx继续获取值);
 * 
 */
LinkageSel.prototype.getData = function(bindIdx) {
	var st = this.st,
		bindEls = this.bindEls,
		data = this.data[0][st.dataReader.cell],
		len = bindEls.length,
		pValue,
		key;
	
	if (typeof bindIdx === 'undefined' || bindIdx >= st.level) {
		return false;
	}
	if (bindIdx == -1) {	// 无本地数据定义,ajax获取包括第一级菜单首次加载时
		return this.data;	// 返回根
	}
	
	data = this.findEntry(data);	// ajax模式时不使用入口功能
	
	for (var i = 1; i <= bindIdx; i++ ) {// 跳过bindIdx==0/-1的情况
		pValue = bindEls[i-1].value;
		if (pValue && data && data[pValue]) {	// 'data[pValue] &&' 避免 root值和默认值无法组成正确路径!
			if (data[pValue][st.dataReader.cell] === false) {
				data = false;
			}
			else {
				data = data[pValue][st.dataReader.cell] || null;
			}
		}
		else {
			data = false;	// 阻止继续尝试,包括ajax尝试
			break;
		}
	}
	
	st = bindEls = null;
	return data;
};
	

LinkageSel.prototype.getRemoteData = function(pBindIdx, callback) {
	var $ = jQuery,
		that = this,
		st = this.st,
		bindEls = this.bindEls,
		bindValue = pBindIdx >= 0 ? bindEls[pBindIdx].value : 0,	// 第一级菜单无内容则0
		data,
		dv,
		cell,
		cache = st.cache ? true : false;
	
	if (pBindIdx >= st.level) {
		return false;
	}
	
	// 先获得上级菜单data路径 包括pBindIdx==-1情况
	data = this.getData(pBindIdx);
	dv = data[bindValue];
	if (! dv || typeof dv !== 'object'  || dv[st.dataReader.cell] === false) {	// cell===false已经尝试过无数据,直接退出
		this.setLoader(false);
		this.custCallback();
		this.resetTrigger(true);
		return false;
	}
	
	// 计算items元素个数
	var itemCount = 0;
	for (var x in data) {
		if (+x > 0) {
			itemCount++;
			break;	// only one calc
		}
	}
	if (st.ajax) {
		var settings = {
			cache	: cache,
			type	: 'GET',
			dataType: 'json',
			mode	: this.st.abort ? 'abort' : '',
			context	: that,
			beforeSend: function() {
				this.setLoader(pBindIdx + 1);	
			},
			success	: function(resp) {
				var that = this,
					loader_duration = that.loader_duration + 20;

				setTimeout(function(){
					that.setLoader(false);
				}, loader_duration);
				

				// 后台变量是以非零id为数字key的数组(默认情况), 或非数字键名数组 ,则json_encode()返回json格式str,可以直接转化为json
				// 若后台变量是以0开始连续数字key数组, 则返回的是数组格式,不能直接转化json
				if (resp && typeof resp === 'object' && ! isArray(resp) ) {
					dv[st.dataReader.cell] = resp;
					callback(pBindIdx + 1, this);	// 有数据才回调,防止展开到底之后仍旧不断触发ajax
				}
				else {
					if (dv[st.dataReader.cell] === null) {	// 已经尝试过
						dv[st.dataReader.cell] = false;	// false 以后不再尝试
					}
					else {
						dv[st.dataReader.cell] = null;	// 标记已尝试
					}
					that.custCallback();	// 无数据才回调用户函数
					that.resetTrigger(true);
				}
			},
			complete : function() {
				this.setLoader(false);
			}
		};
		if (st.mvcQuery) {
			settings.url = st.ajax + '/' + bindValue;
		}
		else {
			settings.url = st.ajax;
			settings.data = {};
			settings.data[st.dataReader.id] = bindValue;
		}

		$.ajax(settings);
	} 
	else if(st.url) {
		$.getJSON(st.url , function(resp) {
			that.setLoader(false);
			if (resp && typeof resp === 'object' && !isArray(resp) ) {
				dv[st.dataReader.cell] = resp;
				st.url = '';	// 有数据则只读一次
				callback(pBindIdx + 1, that);
			}
			else {
				if (dv[st.dataReader.cell] === null) {
					dv[st.dataReader.cell] = false;	
				}
				else {
					dv[st.dataReader.cell] = null;
					st.url = '';
				}
				that.custCallback();
			}				
		});
	}
};
	
	
LinkageSel.prototype._reset = function(type) {
	var st = this.st,
		bindEls = this.bindEls,
		bindEl = bindEls[0] || {},
		elm = bindEl.obj || null,
		defValue = bindEl.defValue;
	
	if (elm) {
		this.clean(0);
		if (defValue) {	// 有默认值
			//elm.find("option[value='" + defValue + "']").eq(0).attr('selected', true);
			elm.find("option[value='" + defValue + "']").eq(0).prop('selected', true);	// for jQuery 1.6+
			elm.change();
		}
		else {
			//elm.attr('selectedIndex', 0).change();
			elm.prop('selectedIndex', 0).change();
		}
		
		if (type) {	// 数据也初始化
			this.data[0][st.dataReader.cell] = st.data;
			this.clean(0);
			this.fill(0, st.select[0][1]); // 生成第一个下拉内容
		}
	}
	st = bindEls = bindEl = elm = null;
};
	

/**
 * 如果设定隐藏选项,则隐藏所有下级菜单并清空
 * 更新当前对象在bindEls中value值
 * select宽度在每次fill之前会清空一次,生成内容后再计算宽度,避免border影响取值
 */
LinkageSel.prototype.clean = function(bindIdx) {
	var st = this.st,
		bindEls = this.bindEls || [],
		len = bindEls.length,
		bindEl,
		elm,
		recycle = this.recycle,
		topt;
	
	if (bindIdx < 0) { 
		return false; 
	}
			
	if (!len || bindIdx >= st.level) {
		this.custCallback();
		return false;
	}
	
	for (var i = len - 1; i > bindIdx; i--) {
		bindEl = bindEls[i] || {};
		elm = bindEl.obj;
		if (elm[0] && elm.length) {	// ?length
			//elm.empty().scrollTop(0);	// 重置scrollTop,否则jqueryUI.dialog会导致FF下模态窗口打开时页闪!
			elm.scrollTop(0);
			topt = elm.children();		
			topt.remove();
			//topt.length && ( jQuery.merge(recycle, topt.filter('option').toArray()) ); // <optgroup label="">  
			topt.length && ( jQuery.merge(recycle, topt.filter('option').toArray()) ); // <optgroup label="">  
			
			if (st.autoHide) {
				st.hideWidth && elm.hide() || elm.css('visibility', 'hidden');
			}
			if (st.fixWidth) {
				elm.width(st.fixWidth);
			}
			else if (st.minWidth) {		// 有默认最小值则恢复
				elm.width(st.minWidth);	// 不清空宽度则可能会越变越小
			} 
			bindEl.value = '';
		}
	}
	
	// 更新当前对象值
	bindEls[bindIdx] && bindEls[bindIdx].obj && (bindEls[bindIdx].value = bindEls[bindIdx].obj.val()); // 更新所选值,否则将无法联动
	
	st = bindEls = bindEl = elm = topt = null;
	return true;
};
	

/**
 * 计算select宽度
 * @param {obj} n 获得的元素宽度值
 * @return {int|false}<p>
 * 	false: 元素当前宽度在预设最小与最大值之间,
 * 	需要清空元素当前已定义的宽度以便其使用自动宽度
 * 	避免取值不精确导致边框宽度影响
 * </p>
 * 
 */
LinkageSel.prototype.calcWidth = function(n) {
	var st = this.st,
		fixW = +st.fixWidth,
		minW = +st.minWidth,
		maxW = +st.maxWidth;

	if (minW > 0 && maxW > 0) {
		minW = Math.min(minW, maxW);
		maxW = Math.max(minW, maxW);
	}
	
	if (fixW > 0) {	// 首先固定
		n = fixW;
	}
	else if (minW > 0 && n < minW) {
		n = minW;
	}
	else if (maxW > 0 && n > maxW) {
		n = maxW;
	}
	else {
		n = -1;	// 清空设定值,使用自动
	}
	
	st = null;
	return n < 0 ? false : n;
};
	

/**
 * 设定宽度
 * select宽度在每次fill之前会清空一次,生成内容后再计算宽度,避免border影响取值
 * 不良影响是如果某条记录过长会先生成一个大宽度的select然后再缩小到maxWidth值
 * 视觉上不理想
 */
LinkageSel.prototype.setWidth = function(elm) {
	if (!elm || !elm[0]) { return false; }
	var w = this.calcWidth( elm.width() );
	if (w === false) {
		elm.width('');	// 宽度在minWidth/maxWidth之间则清空宽度设置
	}
	else {
		elm.width(w);
	}
};
	
	
/**
 * 在当前selsect后面显示,如果当前sel不存在则上级, 如果有下级sel则为下级 ajax loader显示位置
 * @param {int} bindIdx|false 需要显示loader的select对象index, false则隐藏
 */
LinkageSel.prototype.setLoader = function(bindIdx) {
	var loader = this.loader;
	if (! loader) {
		return;
	}
	if (bindIdx === false) {
		loader.offset({top: 0, left: 0}).hide();
	}
	else {
		var bindEls = this.bindEls,
			elm,
			offset,
			tmp,
			width,
			loader_duration = this.loader_duration;
		
		if (!bindEls) {
			return;
		}
		
		// 降序循环读取sel对象,取最后一个可见元素
		for (var i = bindEls.length-1; i >= bindIdx; i--) {
			tmp = bindEls[i] && bindEls[i].obj;
			if (tmp && tmp.is(':visible')) {	// 最后一个可见元素
				elm = tmp;
				break;
			}
		}
		if (!elm && bindIdx > 0) {
			elm = bindEls[bindIdx - 1].obj;	// 没有合乎要求的则使用上一级元素作基准
		}
		
		if (elm && elm.is(':visible')) {	// 外层隐藏时不loaderImg
			offset = elm.offset();
			width = elm.width();
			// 必须先show()再offset 若顺序相反则offset值会自动翻倍!
			//loader.show(350).offset({top: (parseInt(offset.top) + 3), left: (parseInt(offset.left + width + 5))});
			loader.offset({top: (parseInt(offset.top) + 3), left: (parseInt(offset.left + width + 5))}).show(loader_duration);
		}
		else {
			loader.hide(loader_duration).offset({top: 0, left: 0});
		}
		bindEls = elm = tmp = null;
	}
};
	

// 执行用户自定义change事件末回调函数
LinkageSel.prototype.custCallback = function() {
	var st = this.st;
	if (!st.trigger) { return;}
	
	if (this.innerCallback && typeof this.innerCallback === 'function') {
		this.innerCallback(this);		// 把实例对象传递给回调函数
	}
	
	if (st.onChange && typeof st.onChange === 'function') {
		st.onChange.apply(this.outer);		// outer回调函数中this即为实例对象
	}
};
	

//获得所有<select>选择值,包含空值
LinkageSel.prototype._getSelectedArr = function(n) {
	var st = this.st,
		bindEls = this.bindEls,
		len = bindEls.length,
		elm,
		value,
		arr = [];
	
	if (!len || n > len) {
		return null;
	}
	n = n - 1;
	if (!n) {	// 返回级联
		for (var i = 0; i < len; i++) {
			elm = bindEls[i] && bindEls[i].obj;
			if (elm && elm[0]) {
				arr.push(elm.val());	// 不做判断直接push
			}
			else {
				arr = null;	// 出错全部清除
				st.err = '_getSelectedArr: !elm';
				break;
			}
		}
	}
	else {	// 单个
		elm = bindEls[i] && bindEls[i].obj;
		value = elm && elm[0] && elm.val();
	}
	
	st = bindEls = elm = null;
	return (arr && arr.length > 0) ? arr : null;
};


// 获得最后一个或者指定idx(0开始)有效选择项值
LinkageSel.prototype._getSelectedValue = function(idx) {
	var arr = this._getSelectedArr(idx),
		len = arr.length,
		value = null,
		v;
	if (!arr || !len) {
		return null;
	}
	if (!idx) {
		for (var i = 0; i < len; i++) {
			v = arr[i];
			if (v || v === 0 || v === '0' ) {
				value = v;
			}
			else {
				break;
			}
		}
	}
	else {	// 返回指定位置
		value = arr[idx];
	}
	
	return value;
};


// 获得第bindIdx级（从0开始）菜单所选项目的所有值的数据对象
LinkageSel.prototype._getSelectedData = function(key, bindIdx) {
	var st = this.st,
		res = {},
		bindEls = this.bindEls,
		data = this.data[0][st.dataReader.cell],
		dc,
		len,
		pos,
		valueArr,
		value;
	
	// 小于0或者不是数字,直接返回
	if (bindIdx && isNaN(bindIdx) || bindIdx < 0  ) {
		return null;
	}
	
	// 先获得所有select选择值然后逐步搜索data,直到遇到第一个select空值
	valueArr = this._getSelectedArr();
	data = this.findEntry(data);
	len = valueArr.length;
	pos = bindIdx == null || bindIdx === '' ? len : bindIdx + 1;	// bindIdx+1!
	
	if (!len || !data || pos === null) {
		return null;
	}
	
	for (var i = 0; i < pos; i++) {
		value = valueArr[i];
		if (value !== '' && value != null ) {
			if (data[value]) {
				dc = data[value];
				data = data[value][st.dataReader.cell];
			}
			else {
				dc = null;
				break;
			}
		}
		else if (bindIdx >= 0) {	// 指定了位置,此路不通返回null
			dc = null;
			break;
		}
		else {		// 最后一个有效选择
			break;	// 遇到第一个无选择的跳出,数据路径为上次循环的位置
		}
	}
	data = null;
	
	if (dc === null) {
		res = null;
	}
	else {
		for (var x in dc) {
			if (dc.hasOwnProperty(x) && x !== [st.dataReader.cell]) {
				res[x] = dc[x];
			}
		}
		res =  key ? res[key] : res;
	}

	dc = bindEls = valueArr = null;
	return res;
};


// 获得所有有选择菜单的数据对象或对象值,遇到第一个未选择的停止
LinkageSel.prototype._getSelectedDataArr = function(key) {
	var bindEls = this.bindEls,
		len = bindEls.length,
		data,
		res = [];
	if (!len) { return null; }
	
	for (var i = 0; i < len; i++) {
		data = this._getSelectedData(key, i);
		if (data == null) {
			break;
		}
		res[i] = data;
	}
	
	data = bindEls = null;
	return res;
};


// 改变菜单选择项 trigger默认false
LinkageSel.prototype._changeValues = function(parm, trigger, obj) {
	if (obj && typeof obj === 'object') {
		var that = obj;
	}
	else {
		var that = this;
	}
	
	var st = that.st,
		triggerValues = st.triggerValues,
		bindEls = that.bindEls,
		len = Math.min(bindEls.length, parm.length),
		v = [],
		elm;
	
	trigger = trigger ? true : false;
	if ( isNumber(parm) || typeof parm === 'string' ) {
		parm = [parm];
	}
	else if (isArray(parm)) {
		parm = parm;
	}
	else {
		parm = [];	
	}
	that.resetTrigger(trigger, parm);
		
	for (var i = 0; i < len; i++) {
		elm = bindEls[i]['obj'];
		if (elm.val() !== parm[i]) {	// 如果数值与当前选项相同则不变更,直到第一个不相同的更改并退出循环
			//elm && elm.find("option[value='" + parm[i]  + "']").eq(0).attr('selected', true);		// for jQuery pre 1.6
			elm && elm.find("option[value='" + parm[i]  + "']").eq(0).prop('selected', true);		// for jQuery 1.6+
			break;
		}
	}
	elm.change();
};


// 设置changeValues()相应参数
LinkageSel.prototype.resetTrigger = function(trigger, value) {
	var st = this.st;
	trigger = trigger || typeof trigger === 'undefined' ? true : false;
	value = isArray(value) ? value : (typeof value === 'undefined' ? [] : [value]);
	st.triggerValues = value;
	st.trigger = trigger;	// 让onChange回调函数能执行
};


var isArray = function(v){ return Object.prototype.toString.apply(v) === '[object Array]';};
var isNumber = function(o) { return typeof o === 'number' && isFinite(o); };

if (typeof String.prototype.deentityify !== 'function') {
	String.prototype.deentityify = function() {
		var entity = {
			quot	: '"',
			'#039'	: '\'',
			lt		: '<',
			gt		: '>'
		};
			
		return function () {
			return this.replace(/&([^&;]+);/g, 
				function(a, b) {
					var r = entity[b];
					return typeof r === 'string' ? r : a;
				}
			);
		};
	}();
}

if (typeof String.prototype.entityify !== 'function') {
	String.prototype.entityify = function() {
		var character = {
			'<'		: '&lt;',
			'>'		: '&gt;',
			'&'		: '&amp;',
			'"'		: '&quot;',
			"'"		: '&#039;'
		};
			
		return function () {
			return this.replace(/[<>&"']/g, 
				function(c) {
					return character[c];
				}
			);
		};
	}();
}

if (typeof module != 'undefined') {
	module.exports = LinkageSel;
}
