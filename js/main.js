var mergedCellsSheet;
var _cell, _xEdgeCell, _yEdgeCell, _sheetUnit, _mergedCell; 
var xCellNum, yCellNum, totaltotalCellNum;
var pastCurPosX, pastCurPosY; 
var contents = [];
var isMouseDown = false;
var target;

var init = function(){
	document.body.style.height = window.innerHeight + 200;
	document.body.style.width = window.innerWidth + 200;
	setMoving();

	_cell = {type: 'div', className : 'cell', length : 20};
	_xEdgeCell = {type: 'div', className : 'x_edge_cell'};
	_yEdgeCell = {type: 'div', className : 'y_edge_cell'};
	_sheetUnit = {type : 'div', className : 'sheet_unit', length : 500};
	_mergedCell = {type: 'div', className :'merged_cell', length : 60};

	xCellNum = Math.floor((window.innerWidth+200)/_cell.length);
	yCellNum = Math.floor((window.innerHeight+200)/_cell.length);
	totalCellNum = (xCellNum*yCellNum);
	createSheet(_cell, totalCellNum);
	createEdge(_xEdgeCell, _yEdgeCell);
	createMergedCell(_sheetUnit, totalCellNum);

	countDownTimer('10/31/2014 09:00 AM', 'countdown');
	setMouseEvent(contents);
	window.onmousemove = checkRefresh;
	window.onmouseup = function(){ put(); isMouseDown = false; window.onmousemove = checkRefresh; };
};

var createSheet = function(obj, num){
	var spreadSheet = document.getElementById('spread_sheet');
	var i = 0;
	while( i<num ){
		var cell = document.createElement(obj.type);
		cell.className = obj.className;
		cell.style.width = obj.length;
		cell.style.height = obj.length;
		spreadSheet.appendChild(cell);		
		i++;
	}	
};

var createEdge = function(objX, objY){
	var sheetEdge = document.getElementById('sheet_edge');
	var j = 0;
	var k = 0;
	for( var i=0 ; i<xCellNum ; i++ ){
		var xEdgeCell = document.createElement(objX.type);
		xEdgeCell.className = objX.className;
		if(i>1){	
			if(i>=28){
				xEdgeCell.innerHTML = String.fromCharCode(97+j)+String.fromCharCode(97+k);
				if( k<25 ){ k++; }else{ j++; k=0; };
			}else{ xEdgeCell.innerHTML = String.fromCharCode(97+i-2); }
		}
		sheetEdge.appendChild(xEdgeCell);
	}

	for( var i=0 ; i<yCellNum ; i++ ){
		var yEdgeCell = document.createElement(objY.type);
		yEdgeCell.className = objY.className;
		yEdgeCell.style.top = 20*i;
		if(i>0){ yEdgeCell.innerHTML = i; }
		sheetEdge.appendChild(yEdgeCell);
	}
};

var createMergedCell = function(obj, num){
	var mergedCellsSheet = document.getElementById('merged_cells_sheet');
	while(mergedCellsSheet.hasChildNodes()){ mergedCellsSheet.removeChild(mergedCellsSheet.firstChild); }	
	var i = 0;
	while( i<num/600 ){
		var sheetUnit = document.createElement(obj.type);
		sheetUnit.className = obj.className;
		sheetUnit.style.width = obj.length;
		sheetUnit.style.height = obj.length;
		mergedCellsSheet.appendChild(sheetUnit);
		sheetUnit.appendChild(setMergedCell(_mergedCell));
		i++;
	}
};

var setMergedCell = function(obj){
	var mergedCell = document.createElement(obj.type);
	mergedCell.className = obj.className;
	mergedCell.style.width = obj.length * (Math.floor(Math.random()*5)+1);
	mergedCell.style.height = obj.length * (Math.floor(Math.random()*5)+1);
	var num = Math.floor(Math.random()*26)+1;
	var source = num==24 ? './source/gifs/'+num+'.jpg' : './source/gifs/'+num+'.gif';
	mergedCell.style.backgroundImage = 'url('+source+')';
	mergedCell.style.left = (_cell.length) * Math.floor(Math.random()*((_sheetUnit.length-parseInt(mergedCell.style.width))/(_cell.length)+1)); 
	mergedCell.style.top = (_cell.length) * Math.floor(Math.random()*((_sheetUnit.length-parseInt(mergedCell.style.height))/(_cell.length)+1));
	return mergedCell;
};

var checkRefresh = function(e){
	var distanceX = Math.abs(e.pageX-pastCurPosX);
	var distanceY = Math.abs(e.pageY-pastCurPosY);
	if(distanceX>50 && distanceY>50){ createMergedCell(_sheetUnit, totalCellNum); };
	pastCurPosX = e.pageX;
	pastCurPosY = e.pageY;
};

var countDownTimer = function(dt, id){
	var end = new Date(dt);
	var _second = 1000;
	var timer;
	var showRemaining = function(){
		var now = new Date();
		var distance = end - now;
		if(distance < 0){
			clearInterval(timer);
			document.getElementById(id).innerHTML = 'EXPIRED!';
			return;
		}
		var seconds = Math.floor(distance/_second);
		var container = document.getElementById(id);
		container.innerHTML = '오픈까지 <b>' + seconds + '</b>초 남았습니다';
		container.style.backgroundColor = 'rgb('+ Math.floor(Math.random()*257) +','+Math.floor(Math.random()*257)+','+Math.floor(Math.random()*257)+')';
	};
	timer = setInterval(showRemaining, 1000);
};

var setMoving = function(){
	var slowMovingImgs = document.getElementById('moving_images_slow');
	var mediumMovingImgs = document.getElementById('moving_images_medium');
	var fastMovingImgs = document.getElementById('moving_images_fast');
	var setSpeed = function(){
		for( i=0 ; i<slowMovingImgs.childNodes.length ; i++ ){
			var tmp = slowMovingImgs.childNodes[i];
			var x = (Math.floor(Math.random()*13)*40);
			var y = (Math.floor(Math.random()*13)*40);
			tmp.style.left = Math.random() < 0.5 ? tmp.offsetLeft-x : tmp.offsetLeft+x ;
			tmp.style.top = Math.random() < 0.5 ? tmp.offsetTop-y : tmp.offsetTop+y ;
		}
		for( i=0 ; i<mediumMovingImgs.childNodes.length ; i++ ){
			var tmp = mediumMovingImgs.childNodes[i];
			var x = (Math.floor(Math.random()*13)*80);
			var y = (Math.floor(Math.random()*13)*80);
			tmp.style.left = Math.random() < 0.5 ? tmp.offsetLeft-x : tmp.offsetLeft+x ;
			tmp.style.top = Math.random() < 0.5 ? tmp.offsetTop-y : tmp.offsetTop+y ;
		}
		for( i=0 ; i<fastMovingImgs.childNodes.length ; i++ ){
			var tmp = fastMovingImgs.childNodes[i];
			var x = (Math.floor(Math.random()*10)*120);
			var y = (Math.floor(Math.random()*10)*120);
			tmp.style.left = Math.random() < 0.5 ? tmp.offsetLeft-x : tmp.offsetLeft+x ;
			tmp.style.top = Math.random() < 0.5 ? tmp.offsetTop-y : tmp.offsetTop+y ;
		}	
	};
	setSpeed();
	setInterval(setSpeed, 5000);
};

var setMouseEvent = function(arr){
	arr.push(document.getElementById('information1'));
	arr.push(document.getElementById('countdown'));
	arr.push(document.getElementById('introduction'));
	for(var i=0 ; i<arr.length ; i++){
		arr[i].onmousedown = function(e){ isMouseDown = true; pick(e, this); };
	}
};

var pick = function(e, obj){
	target = obj;
	target.style.left = e.pageX-20;
	target.style.top = e.pageY-20;
	window.onmousemove = drag;
};

var drag = function(e){
	target.style.left = e.pageX-20;
	target.style.top = e.pageY-20;
};

var put = function(){
	target.style.left = _cell.length * Math.round(target.offsetLeft/_cell.length);
	target.style.top = _cell.length * Math.round(target.offsetTop/_cell.length);
};

window.onload = function(){	init();};