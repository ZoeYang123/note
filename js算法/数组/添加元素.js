/**
 * 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
 * 输入 [1, 2, 3, 4],  10
 * 输出 [1, 2, 3, 4,10]
 */

function append(arr, item) {
	var a=arr.slice();
	a[a.length]=item;
	return a;
}

function append(arr, item) {
	var a=arr.slice();
	a.push(item);
	return a;
}

function append(arr, item) {
	return arr.concat(item)
}

function append(arr, item) {
	return [...arr,item]
}

