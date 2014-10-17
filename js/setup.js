//gif image sources
var gifs = ['https://m1.behance.net/rendition/modules/122909483/disp/9a9dcdea95f41c0b92269c29d0c78aba.gif',
'https://gimmebar-assets.s3.amazonaws.com/4eb10df8e40ad.gif',
'https://m1.behance.net/rendition/modules/128238361/disp/65a2703d68e718dc4882a5b6e4e11653.gif',
'https://m1.behance.net/rendition/modules/127120759/disp/fa9b639ee4a106c0b1fb56babc348e50.gif',
'https://m1.behance.net/rendition/modules/128018007/disp/5778ff668a733e083f6a3b7d100f14a4.gif',
'https://m1.behance.net/rendition/modules/128250889/disp/ba093005e7475f96e0a940abc2d7b601.gif',
'https://m1.behance.net/rendition/modules/127120755/disp/340d9b3ce2b251edd9eed3ace1d9436c.gif',
'https://m1.behance.net/rendition/modules/128174239/disp/ae29c0b89c02e133ae2af462ce253d3d.gif'];

var spreadSheet, mergedCellsSheet;
var _cell, _sheetUnit, _mergedCell, cellNum;
var pastCurPosX, pastCurPosY; 

var init = function(){
	document.body.style.height = window.innerHeight + 200;
	document.body.style.width = window.innerWidth + 200;

	spreadSheet = document.getElementById('spread_sheet');
	mergedCellsSheet = document.getElementById('merged_cells_sheet');
	_cell = {type: 'div', className : 'cell', length : 20};
	_sheetUnit = {type : 'div', className : 'sheet_unit', length : 200};
	_mergedCell = {type: 'div', className :'merged_cell', length : 40};
	cellNum = ((window.innerHeight+200)/_cell.length)*((window.innerWidth+200)/_cell.length);

	createSheet(_cell, cellNum);
	createMergedCell(_sheetUnit, cellNum);

	document.onmousemove = checkRefresh;
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

var createMergedCell = function(obj, num){
	while(mergedCellsSheet.hasChildNodes()){ mergedCellsSheet.removeChild(mergedCellsSheet.firstChild); }	
	var i = 0;
	while( i<num/5 ){
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
	mergedCell.style.background = 'url('+gifs[Math.floor(Math.random() * gifs.length)]+') center center';
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

window.onload = function(){	init();};