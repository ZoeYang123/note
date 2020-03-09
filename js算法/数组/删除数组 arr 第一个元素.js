/**
 * 删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组
 * 输入 [1, 2, 3, 4]
 * 输出 [2, 3, 4]
 */

function curtail(arr) {
	var newArr=arr.slice(0);
	newArr.shift();
	return newArr;
}

function curtail(arr) {
	var newArr=arr.slice(0);
	for(var i=0;i<arr.length-1;i++){
		newArr[i]=newArr[i+1];
	}
	newArr.length=arr.length-1;
	return newArr;
}

function curtail(arr) {
	return arr.slice(1);
}

function curtail(arr) {
	var newArr=[];
	for(var i=1;i<arr.length;i++){
		newArr.push(arr[i]);
	}
	return newArr;
}


console.log(curtail([1,2,3,4]));
