/*
 * 删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组
 * 输入[1, 2, 3, 4]
 * 输出
 * [1, 2, 3]
 */

function truncate(arr) {
	return arr.slice(0,-1)
}

function truncate(arr) {
	var a=arr.slice(0)
	a.splice(a.length-1,1);
	return a;
}

function truncate(arr) {
	var a=arr.slice(0);
	a.pop();
	return a;
}


function truncate(arr, item) {
    var newArr=[];
    for(var i=0;i<arr.length-1;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}

console.log(truncate([1,2,3,4]));
