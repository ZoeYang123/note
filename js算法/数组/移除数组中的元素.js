/**
 * 移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
 * 输入 [1, 2, 3, 4, 2], 2
 * 输出 [1, 3, 4]
 */

function remove(arr, item) {
	return arr.filter((value, index) => {
		return value != item;
	})
}

function remove(arr,item){
	var a=[];
	for(var i=0;i<arr.length;i++){
		if(arr[i]!=item){
			a.push(arr[i])
		}
	}
	return a;
}

function remove(arr,item){
	var a=arr.slice(0);
	for(var i=0;i<a.length;i++){
		if(a[i]==item){
			a.splice(i,1);
			i--
		}
	}
	return a;
}
