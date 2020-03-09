/**
 * 找出数组 arr 中重复出现过的元素
 * 输入[1, 2, 4, 4, 3, 3, 1, 5, 3]
 * 输出[1, 3, 4]
 */

function duplicates(arr) {
	var newArr = [...new Set(arr)]; //去重
	var a = [];
	for(var i = 0; i < newArr.length; i++) {
		if(arr.indexOf(newArr[i]) != arr.lastIndexOf(newArr[i])) { //第一次出现的位置和最后一次出现的位置是否一致，不一致就是重复元素
			a.push(newArr[i])
		}
	}
	return a;
}

function duplicates(arr) {
	return arr.filter(function(item, index, array) {
		return array.indexOf(item) !== array.lastIndexOf(item) && array.indexOf(item) === index;  //第一次出现的位置为index
	})
}

function duplicates(arr) {
	return arr.reduce((pre,cur)=>{
		if(arr.indexOf(cur) !== arr.lastIndexOf(cur) && pre.indexOf(cur) ==-1){
			pre.push(cur)
		}
		return pre;
	},[])
}


console.log(duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3]))