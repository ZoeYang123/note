/**
 * 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
 * 输入 [1, 2, 3, 4], 10
 * 输出 [10, 1, 2, 3, 4]
 */

function prepend(arr, item) {
	var a=arr.slice(0);
	a.unshift(item);
    return a;
}

function prepend(arr, item) {
    return [item,...arr];
}

function prepend(arr, item) {
    return [item].concat(arr);
}

function prepend(arr, item) {
	var a=[];
	a[0]=item;
    for(var i=0;i<arr.length;i++){
    	a[i+1]=arr[i]
    }
    return a;
}

