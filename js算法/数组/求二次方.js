/**
 * 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
 * 输入[1, 2, 3, 4]
 * 输出[1, 4, 9, 16]
 */

function square(arr) {
   return arr.reduce((pre,cur)=>{
   	 pre.push(cur*cur)
   	 return pre;
   },[])
}

function square(arr) {
   return arr.map(item=>{
   	return item*item;
   })
}

