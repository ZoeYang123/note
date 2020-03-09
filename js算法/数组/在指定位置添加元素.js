/**
 * 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
 * 输入[1, 2, 3, 4], 'z', 2
 * 输出[1, 2, 'z', 3, 4]
 */

function insert(arr, item, index) {
	var newArr=arr.slice(0);
	newArr.splice(index,0,item)
	return newArr;
}

function insert(arr, item, index) {
	var newArr=[];
	for(var i=0;i<arr.length;i++){
		if(i!=index){
			newArr.push(arr[i]);
		}else{
			newArr.push(item);
			newArr.push(arr[i])
		}
	}
	return newArr;
}

function insert(arr, item, index) {
	return arr.slice(0,index).concat(item,arr.slice(index));
}

