var spreadSheet, mergedCellsSheet, sheetEdge;
var _cell, _xEdgeCell, _yEdgeCell, _sheetUnit, _mergedCell, cellNum;
var pastCurPosX, pastCurPosY; 
var contents = [];
var isMouseDown = false;
var target;

var init = function(){
	document.body.style.height = window.innerHeight + 200;
	document.body.style.width = window.innerWidth + 200;

	spreadSheet = document.getElementById('spread_sheet');
	sheetEdge = document.getElementById('sheet_edge');
	mergedCellsSheet = document.getElementById('merged_cells_sheet');
	_cell = {type: 'div', className : 'cell', length : 20};
	_xEdgeCell = {type: 'div', className : 'x_edge_cell'};
	_yEdgeCell = {type: 'div', className : 'y_edge_cell'};
	_sheetUnit = {type : 'div', className : 'sheet_unit', length : 500};
	_mergedCell = {type: 'div', className :'merged_cell', length : 60};
	cellNum = ((window.innerHeight+200)/_cell.length)*((window.innerWidth+200)/_cell.length);
	createSheet(_cell, cellNum);
	createEdge(_xEdgeCell, _yEdgeCell);
	createMergedCell(_sheetUnit, cellNum);

	contents.push(document.getElementById('information'));
	contents.push(document.getElementById('countdown'));
	contents.push(document.getElementById('introduction'));
	setMouseEvent(contents);

	window.onmousemove = checkRefresh;
	window.onmouseup = function(){ put(); isMouseDown = false; window.onmousemove = checkRefresh; };
	countDownTimer('10/31/2014 09:00 AM', 'countdown');
};

var createSheet = function(obj, num){
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
	var i = 0;
	var j = 0;
	var k = 0;
	while( i<Math.floor((window.innerWidth+200)/_cell.length)){
		var xEdgeCell = document.createElement(objX.type);
		xEdgeCell.className = objX.className;
		if(i>1){	
			if(i>=28){
				xEdgeCell.innerHTML = String.fromCharCode(97+j)+String.fromCharCode(97+k);
				if( k<25 ){ k++; }else{ j++; k=0; };
			}else{
				xEdgeCell.innerHTML = String.fromCharCode(97+i-2);
			}
		}
		sheetEdge.appendChild(xEdgeCell);
		i++;
	}
	i = 0;
	while( i<Math.floor((window.innerHeight+200)/_cell.length)){
		var yEdgeCell = document.createElement(objY.type);
		yEdgeCell.className = objY.className;
		yEdgeCell.style.top = 20*i;
		if(i>0){
			yEdgeCell.innerHTML = i;
		}
		sheetEdge.appendChild(yEdgeCell);
		i++;
	}
};

var createMergedCell = function(obj, num){
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
	if(distanceX>50 && distanceY>50){ createMergedCell(_sheetUnit, cellNum); };
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

var setMouseEvent = function(arr){
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