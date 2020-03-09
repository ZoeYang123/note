/**
 * 在数组 arr 中，查找值与 item 相等的元素出现的所有位置
 * 输入'abcdefabc' 'a'
 * 输出[0, 6]
 */

function findAllOccurrences(arr, target) {
	
	return arr.reduce((pre,cur,index)=>{
		if(cur==target){
			pre.push(index)
		}
		return pre;
	},[])
}


function findAllOccurrences(arr, target) {
    var newArr = [];
    arr.forEach(function(item,index){
        item !== target ||  newArr.push(index); //如果item不等于target是真就不需要执行newArr.push(index)，否则需要执行
    });
    return temp;
}

console.log(findAllOccurrences('abcdefabc', 'a'))