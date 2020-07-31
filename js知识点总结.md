# 总结

##### 1.js数据类型

> 原始数据类型 ( 直接存储在栈（stack）中 )

- undefined
- null
- Boolean
- Number
- String
- Symbol(es6新增)
- BigInt(es10新增)

> 引用数据类型 ( 同时存储在栈（stack）和堆（heap）中 )

- function
- Array
- Date
- Object

##### 2.js数据类型转换

- 转换为布尔值 - Boolean()
- 转换为数值 - Number()、parseInt()、parseFloat()
- 转换为字符串 - toString()、String()

##### 3.js数据类型的判断

> typeof

typeof对于原始类型来说，除了null都可以显示正确的类型

```javascript
typeof 2;                  //number
typeof true;               //boolean
typeof 'Yang';             //string
typeof [];                 //object
typeof function(){};       //function
typeof {};                 //object
typeof undefined;          //undefined
typeof null;               //object
typeof new Date();         //object
```

typeof对于对象来说，除了函数都会显示object，所以说typeof并不能准确判断变量到底是什么类型

> instanceof

instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上（某个对象的实例）

```javascript
2 instanceof Number;                   //false
true instanceof Boolean;               //false
'str' instanceof String;               //false
[] instanceof Array;                   //true
function(){} Function;                 //true;
{} instanceof Object;                  //true
```

instanceof可以精准判断引用数据类型（Array，Function，Object），而基本数据类型不能被instanceof精准判断。

instanceof运算符用来测试一个对象在其原型链中是否存在一个构造函数的prototype属性，判断一个对象是否是数据类型的实例

> constructor

```javascript
(2).constructor === Number;               //true
(true).constructor === Boolean;           //true
('str').constructor === String;           //true
([]).constructor === Array;               //true
(function(){}).constructor === Function;  //true
({}).constructor === Object;              //true

这里有一个坑，如果我创建一个对象，更改它的原型，constructor就会变得不可靠了
function Fn(){};

Fn.prototype=new Array();

var f=new Fn();

console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true
```

> Object.prototype.toString.call()

toString()方法返回一个表示该对象的字符串

```javascript
Object.toString()//"function Object() { [native code] }"
Object.prototype.toString()//"[object Object]"
//Object对象和它的原型链上各自有一个toString()方法，第一个返回的是一个函数，第二个返回的是值类型。

var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

##### 4.js内置对象





##### 5.null和undefined的区别

这两个都是基本数据类型，使用 typeof 进行判断的时候，null 类型化会返回

- undefined代表含义未定义。 一般变量声明了但没有定义，会返回undefined
- null代表的含义是空对象。主要用于赋值给一些可能会返回对象的变量，作为初始化

##### 6.{}和[]的valueOf()和toString()的结果是什么？

```javascript
{}.valueOf();     //{}
[].valueOf();     //[]
{}.toString();    //"[object Object]"
[].toString();    //""
```

##### 7.作用域和作用域链



##### 8.创建对象的7种方式

> 1.工厂模式

```javascript
function person(name, age, job){
    var p = new Object();
    p.name = name;
    p.age = age;
    p.job = job;
    p.sayName = function(){
        console.log(this.name);
    }
    return p;
}

var person1 = person("Yang", 18, "前端工程师");
var person2 = person("Wen", 20, "会计");
person1 instanceof person; //false
person1.constructor === person; //false
```

函数person()能够根据接受的参数来构建一个包含所有必要信息的person对象。可以无数次的调用这个函数，而每次返回一个包含三个属性一个方法的对象。工厂模式虽然解决了创建多个相似对象的问题，但却**没有解决对象识别**的问题（即怎样知道一个对象的类型）。



> 2.构造函数模式

```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    }
}

var p1 = new Person("Yang", 18, "前端工程师");
var p2 = new Person("Wen", 20, "会计");
p1.constructor === Person;//true
p1 instanceOf Person;//trus
/**
 *没有显示的创建对象
 *直接将属性和方法赋给了this对象
 *没有return语句
 */
```

创建Person的实例，必须使用new操作符。调用构造函数会经历一下四个步骤：

- 创建一个新对象
- 将构造函数中的作用域赋给新对象（this指向新对象）
- 执行构造函数中的代码（为这个对象添加属性）
- 返回新对象

**构造函数的问题**

使用每个方法都要在实例上重新创建一遍，p1和p2都有一个sayName()的方法，但这两个方法不是同一个Function的实例。



> 3.原型模式

```javascript
function Person(){
}
Person.prototype.name = "Yang";
Person.prototype.age = 18;
Person.prototype.job = "前端工程师";
Person.prototype.sayName = function(){
    console.log(this.name);
}
var person1 = new Person();
person1.sayName();//"Yang"
var person2 = new Person();
person2.sayName();//"Yang"
person1.sayName === Person2.sayName; //true
```

sayName()方法和所有属性直接添加到了Person的prototype属性中，构造函数成了空函数。通过构造函数来创建实例对象，具有相同的属性和方法。与构造函数模式的不同的是，新对象的这些属性和方法是由所有实例所共享。

> 4.组合使用构造函数模式和原型模式

```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.friends = ["Zoe","Lily"];
}
Person.prototype = {
    constructor:Person,
    sayName:function(){
        console.log(this.name);
    }
}

var person1 = new Person("Yang", 18, "前端工程师");
var person2 = new Person("Wen", 20, "会计");

person1.friends === person2.friends;  //false
person1.sayName === person2.sayName;  //true
```

实例属性都是在构造函数中定义，而由所有实例共享的属性constructor和方法sayName()则是在原型中定义。



> 5.动态原型模式

```javascript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    
    if(typeof this.sayName != "function"){
        //只会在初次调用构造函数时才会执行
        Person.prototype.sayName = function(){
            console.log(this.name)
        }
    }
}

var person = new Person("Yang",18,"前端工程师");
person.sayName(); //“Yang"
```

在sayName()方法不存在的情况下，才会将它添加到原型中。在初次调用构造函数的时候就完成原型对象的修改



> 6.寄生构造函数模式

```javascript
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
var person = new Person("Yang",18,"前端工程师");
person.sayName();//"Yang"
person instanceof Person;//false
```

除了用new操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样。构造函数在不返回值的情况下，默认会返回新对象实例。而通过构造函数的末尾添加一个return语句，可以重写调用构造函数的返回的值。

关于寄生构造函数模式，有一点需要说明：首先，返回的对象与构造函数或者与构造函数的原型属性之间没有关系；构造函数返回的对象与构造函数外部创建的对象没有什么不同。所以不能依赖instanceof操作符来确定对象类型。



> 7.稳妥构造函数模式

```javascript
function Person(name, age, job){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    }
    return o;
}
var person = new Person("Yang",18,"前端工程师");
person.sayName();//"Yang"
person instanceof Person; //false
```

变量person中保存的是一个稳妥对象，而除了调用sayName()方法外，没有别的方式可以访问其他数据成员。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传入到构造函数中的原始数据。稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环境。

##### 9.继承的几种实现方式

> 类式继承



> 借用构造函数

```javascript
function Person(name, age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log(this.name);
    }
    Person.prototype.getAge = function(){
		console.log(this.age)
	}
}

function Student(name, age, score){
    Person.call(this, name, age);
    this.score = score;
}
var student = new Student("Yang", 18, 90);
student.name; //"Yang"
student.sayName(); //"Yang"
student.getAge(); //TypeError: student.getAge is not a function
```

在Person原型中定义的方法，对于Student是不可见的。构造函数式继承并没有继承父类原型上的方法。



> 组合继承

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
    Person.prototype.getAge = function(){
		console.log(this.age)
	}
}
function Student(name, age, score){
    Person.call(this, name, age);
    this.score = score;
}
Student.prototype = new Person();
Student.prototype.constructor = Student;
var student = new Student("Yang", 18, 90);
student.getAge(); //18
```

组合继承避免了原型链和借用构造函数的缺陷，但是，父类的构造函数被调用了两次，一次是在创建Student原型的时候，另一次是是在Student构造函数内部。



> 原型式继承

```javascript
function object(o){
    function F(){}
    F.prototype = 0;
    return new F();
}
var person = {
    name:"Yang",
    frends:["Wen","Lily"]
}
var p = object(person);
p.name;//"Yang"
p.friends.push("Bob");
p.friends;//["Wen", "Lily", "Bob"]

```

与Object.create()类似

> 寄生式继承

```javascript
function createAnother(o){
    var clone = Object.create(o);
    clone.sayHi = function(){
        console.log('hi');
    }
    return clone;
}
var person = {
    name:"Yang",
    friends:["Wen","Lily"]
}
var anotherPerson = createAnother(person);
anotherPerson.sayHi();//"hi"
anotherPerson.friends.push("Bob");
person;//{name:"Yang",friends:["Wen","Lily","Bob"]}
```

使用寄生式继承为对象添加函数，会由于不能做到函数复用而降低效率，这一点与构造函数模式类似。



> 寄生组合式继承

```javascript
function inheritPrototype(subType,superType){
    var prototype = Object.create(superType.prototype);  //创建对象,继承父类原型
    prototype.constructor = subType;                //增强对象，重写被污染的子类constructor
    subType.prototype = prototype;                  //指定对象，重写子类原型
}
//父类
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    console.log(this.name);
}
//子类
function SubType(name, age){
    SuperType.call(this,name);
    this.age = age;
}
//实现原型上的方法
inheritPrototype(SubType,SuperType);

SubType.prototype.sayAge = function(){
    console.log(this.age);
}
var subType = new SubType("Yang",18);
subType; //{age: 18, colors: ["red", "blue", "green"], name:"Yang"}

```

这个例子的高效率体现在它只调用了一次SuperType构造函数，因此避免了在SubType.prototype上面创建的不必要、多余的属性。原型链还能保持不变，开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。



##### 11.this、call、apply、bind的理解

> this永远指向最后调用它的那个对象。

- 在浏览器里，在全局范围内this指向window对象；
- 在函数中，this永远指向最后调用它的那个对象；
- 构造函数中，this指向new出来的那个新对象;
- call、apply、bind中的this被强绑定在指定的那个对象上；
- 箭头函数中的this比较特殊，箭头函数的this为父作用域的this，不是调用时的this。箭头函数的this指向是静态的，声明的时候就确定了
- 事件绑定方法，this指向的是绑定事件对象
- 定时器函数，this指向是window
- 立即执行函数，this指向window



> apply()方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
> 
> ```javascript
>func.apply(thisArg, [argsArray])
> ```

apply函数实现步骤

```javascript
// apply 函数实现
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;

  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;

  // 将函数设为对象的方法
  context.fn = this;

  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  // 将属性删除
  delete context.fn;

  return result;
};
```

> call()方法使用一个指定的this值和单独给出的一个或多个参数来调用一个函数
>
> ```javascript
> func.call(thisArg,arg1,arg2,...)
> ```

```javascript
Function.prototype.myCall = function (content) {
    //1.判断是否是函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    //2.content是否为空，空则设置为window
    content = content || window;
    //3.获取参数列表
    let result = null,
        args = [...arguments].slice(1);
    //4.将调用函数设为对象的方法
    content.fn = this;
    //5.调用函数
    result = content.fn(...args);
    //6.将属性删除
    delete content.fn;
    return result
}
```

> bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被指定为bind()的第一个参数，而其余参数作为新函数的参数，供调用时使用
>
> func.bind(thisArg[, arg1[, arg2[, ...]]])

```javascript
Function.prototype.myBind = function (content) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    
    let args = [...arguments].slice(1),
        fn = this;

    return function() {
        return fn.apply(content,args);
    }
}
```

##### 12.构造函数、原型、原型链

> 构造函数

**构造函数**是一种特殊函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与new一起使用，可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里

- 构造函数用于创建某一你类对象，其**首字母要大写**
- 构造函数要和**new**一起使用才有意义
- 静态成员：在构造函数上添加的成员，只能由构造函数本身来访问
- 实例成员：在构造函数内部（this）创建，只能由实例化对象来访问

> 原型

构造函数通过原型分配的函数是所有对象所**共享**的。<u>每一个构造函数都有一个prototype属性，指向另一个对象。</u>

<u>这个prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有</u>。

> 对象原型 ______proto__

对象都会有一个属性______proto__ 指向构造函数的prototype原型对象。______proto__对象原型和原型对象prototype是等价的

```javascript
function Star(){
    
}
var ldh = new Star();
ldh.__proto__===Star.prototype;   //true
```

> constructor 构造函数

对象原型（______proto__）和构造函数（prototype）原型对象里面都有一个constructor属性，constructor我们称为构造函数，因为它指回构造函数本身。

```
Star.prototype = {
   constructor:Star,
   sing:function(){},
   movie:functon(){}
}
```

> 构造函数、实例、原型对象三者之间的关系

![1595865469106](D:\web\Project\note\image\1595865469106.png)



> 原型链

![1595865573188](D:\web\Project\note\image\1595865573188.png)

##### 13.闭包

> **闭包是指有权访问另一个函数作用域内变量的函数**，创建闭包最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量

- 在函数外部能访问到函数内部变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问函数内部的变量，可以使用这种方法来创建私有变量
- 函数的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收

##### 14.DOM和BOM

- **DOM**指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

- **BOM**知道是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互方法和接口。**BOM**的核心是window，window既是通过js访问浏览器窗口的一个接口，又是一个Global（全局）对象

##### 15.事件冒泡

当前元素--->body--->html--->document--->window。

当事件发生在DOM元素上时，该事件并不完全发生在那个元素上。在冒泡阶段，事件冒泡，或者事件发生在它的父代，祖父母，祖父母的父代，直到到达window为止。

- 阻止事件冒泡：e.stopPropagation()
- 阻止默认行为：e.preventDefalut()

##### 16.Ajax

##### 17.js单线程

javascript语言的一大特点就是单线程



##### 18.var、let、const区别

- var声明的变量会挂载在window上，而let和const声明的变量不会

```javascript
var a = 100;
console.log(a,window.a);    // 100 100

let b = 10;
console.log(b,window.b);    // 10 undefined

const c = 1;
console.log(c,window.c);    // 1 undefined
```

- var声明的变量存在变量提升，let和const不存在变量提升

```javascript
console.log(a); // undefined  ===>  a已声明还没赋值，默认得到undefined值
var a = 100;

console.log(b); // 报错：b is not defined  ===> 找不到b这个变量
let b = 10;

console.log(c); // 报错：c is not defined  ===> 找不到c这个变量
const c = 10;
```

- let和const声明形成块作用域

```javascript
if(1){
  var a = 100;
  let b = 10;
}

console.log(a); // 100
console.log(b)  // 报错：b is not defined  ===> 找不到b这个变量

-------------------------------------------------------------

if(1){
  var a = 100;
  const c = 1;
}
console.log(a); // 100
console.log(c)  // 报错：c is not defined  ===> 找不到c这个变量
```

- 同一作用域下let和const不能声明同名变量，而var可以

- 暂存死区

```javascript
var a = 100;

if(1){
    a = 10;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
    // 而这时，还未到声明时候，所以控制台Error:a is not defined
    let a = 1;
}
```

- const

```javascript
/*
* 　　1、一旦声明必须赋值,不能使用null占位。
*
* 　　2、声明后不能再修改
*
* 　　3、如果声明的是复合类型数据，可以修改其属性
*
* */

const a = 100; 

const list = [];
list[0] = 10;
console.log(list);　　// [10]

const obj = {a:100};
obj.name = 'apple';
obj.a = 10000;
console.log(obj);　　// {a:10000,name:'apple'}
```



##### 19.js深浅拷贝

- **浅拷贝：**如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是地址值，其中一个对象改变了这个地址，就会影响到另一个对象
- 对象:Object.assign(target,sources);  es6新增方法可以浅拷贝
- 数组：contact、slice

```javascript
//数组
var a = [1,2,3,4];
var b = a.contact();
var c = a.slice();
//对象

var obj = {name:"Yang"},obj2={};
Object.assign(obj2)
```



- **深拷贝：**将一个对象从内存中完整的拷贝出来，从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

```javascript
//JSON内置对象深拷贝
var a = {name:"Yang",age:18,friends:[{name:"Lily",age:20},{name:"Bob",age:21}]};
var b = JSON.parse(JSON.stringify(a));

var newObj = {};
function deepClone(obj, newObj) {
    for (key in obj) {
        var item = obj[key];
        if (item instanceof Array) {
            newObj[key] = [];
            deepClone(item, newObj[key])
        } else if (item instanceof Object) {
            newObj[key] = {};
            deepClone(item, newObj[key])
        } else {
            newObj[key] = item;
        }
    }
    //return newObj
}
deepClone(a, newObj)
```

JSON可处理一般的对象进行深拷贝，但是不能处理函数、正则等对象。



##### 20.函数柯力化的实现

> 函数柯力化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

源码



##### 21.js模拟new操作符

##### 22.Promise实现

##### 23.async/await

##### 24.js的防抖与节流

##### 25.设计模式

##### 26.http状态码

- **1****：服务器收到请求，需请求者进一步操作
- **2****：请求成功
- **3****：重定向，资源被转移到其他URL了
- **4****：客户端错误，请求语法错误或没有找到相应资源
- **5****：服务端错误，server error
- **304****：Not Modified。指定日期后未修改，不返回资源

##### 27.封装JSONP

##### 28.跨域

##### 29.**手动实现map(forEach以及filter也类似)**

##### 30.js实现instanceof

##### 31.构造函数实现原理

##### 32.for in和for of区别

##### 33.前端登录实现过程

##### 34.同步和异步的区别

- **同步**：不同进程协同完成某项工作而先后次序调整（通过阻塞、唤醒等方式），同步强调的是顺序性，谁先谁后。异步不存在顺序性
- **异步**：浏览器访问服务器请求，用户正常操作，浏览器在后端进行请求。等请求完，页面不刷新，加载出新内容。



##### 35.回流与重绘



##### 36.渐进增强与优雅降级

- **渐进增强**：针对低版本浏览器进行构建页面，保证最基本的功能，然后在针对高级浏览器进行效果、交互等改进。达到更好的用户体验
- **优雅降级**：一开始构建完整的功能，然后针对低版本浏览器进行兼容。



##### 37.递归

如果一个函数在内部可以调用其本身，那么这个函数就是递归函数。

函数内部自己调用自己，这个函数就是递归。

递归很容易发生“栈溢出”错误（stack overflow），所以必须加退出条件



##### 38.高阶函数

高阶函数是对其它函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出。

```javascript
//接收函数作为参数
function fn(callback){
    callback && callback()
}
fn(function(){
    console.log("fn")
})

//函数作为返回值输出
function fn(){
    return function(){
        
    }
}
fn();
```

