/**
 * 合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组
 * 输入 [1, 2, 3, 4], ['a', 'b', 'c', 1]
 * 输出 [1, 2, 3, 4, 'a', 'b', 'c', 1]
 */

//function concat(arr1, arr2) {
// return arr1.concat(arr2);
//}

//function concat(arr1, arr2) {
//	var newArr = arr1.slice(0);
//	for(var i = 0; i < arr2.length; i++) {
//		newArr.push(arr2[i]);
//	}
//	return newArr;
//}

//function concat(arr1, arr2) {
//  var str=arr1.toString()+","+arr2.toString();
//  return str.split(",");
//}

function concat(arr1, arr2) {
    return[...arr1,...arr2]
}

console.log(concat([1, 2, 3, 4], ['a', 'b', 'c', 1]));