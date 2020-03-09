/**
 * 计算给定数组 arr 中所有元素的总和
 * 数组中的元素均为 Number 类型
 * 输入 [ 1, 2, 3, 4 ] 
 * 输出 10
 */

function sum(arr) {
	return arr.reduce((pre,cur)=>{
		return pre+cur
	})
}

function sum(arr) {
	var s=0;
	for(var i=0;i<arr.length;i++){
		s+=arr[i];
	}
	return s;
}

function sum(arr){
	return eval(arr.join("+"));  
}

function sum(arr){
	var s=0;
	arr.forEach(function(item,index){
		s+=item;
	})
	return s;
}

