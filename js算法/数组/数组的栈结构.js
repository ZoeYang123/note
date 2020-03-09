function Stack(){
	var item=[];
	this.push=function(ele){
		item.push(ele)
	}
	
}

var stack=new Stack();
stack.push(5);
console.log(stack)
