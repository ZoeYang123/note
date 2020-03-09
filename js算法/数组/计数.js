/**
 * 统计数组 arr 中值等于 item 的元素出现的次数
 * 输入 [1, 2, 4, 4, 3, 4, 3], 4
 * 输出 3
 */
function count(arr, item) {
	var count = 0;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === item) {
			count++;
		}
	}
	return count;
}

function count(arr, item) {
	var newArr = arr.filter(ele => {
		return ele === item;
	})
	return newArr.length;
}

function count(arr, item) {
	return arr.reduce(function(pre, cur) {
		return cur === item ? pre + 1 : pre;
	}, 0)
}

console.log(count([1, 2, 4, 4, 3, 4, 3], 4))