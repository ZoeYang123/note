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

AJAX = Asynchronous Javascript and XML(异步的Javascript和XML)。AJAX是与服务器交换数据并更新部分网页，在不重新加载整个页面的情况下。

- 创建XMLHttpRequest()对象  

- 发送请求(规定请求的类型、URL 以及是否异步处理请求,发送信息至服务器时内容编码类型)

- 服务器响应

  readyState，0 - 请求未初始化，1- 服务器连接已建立，2 - 请求已接收，3 - 请求处理中，4 - 请求已完成，且响应已就绪;

  status, 200 - "OK", 404 - 未找到页面

> 原生写法

```javascript
var xmlHttp = new XMLHttpRequest(); //创建XMLHttpRequest对象
/**
*open(method,url,async)
*规定请求的类型、URL 以及是否异步处理请求,
*method：请求的类型；GET 或 POST
*url：文件在服务器上的位置
*async：true（异步）或 false（同步）
**/
xmlHttp.open("GET","ajax_info.txt",true);
//发送信息至服务器时内容编码类型
xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
xmlHttp.send();   //send(string),将请求发送到服务器，string仅用于POST请求

/**
*onreadystatechange事件机制来捕获请求的状态,每当readyState属性改变时，就会调用该函数
*/
xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState === 4 && xmlHttp.status ===200){
        //
    }
}
```



> JQuery

```javascript
$.ajax({
    type:'post',
    url:'',
    async:ture,//async 异步  sync  同步
    data:data,//针对post请求
    dataType:'jsonp',
    success:function (msg) {

    },
    error:function (error) {

    }
})
```



> promise 封装实现：

```javascript
// promise 封装实现：

function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();

    // 新建一个 http 请求
    xhr.open("GET", url, true);

    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;

      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };

    // 设置响应的数据类型
    xhr.responseType = "json";

    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");

    // 发送 http 请求
    xhr.send(null);
  });

  return promise;
}
```



> ajax几种请求方式？他们的优缺点？

常用的post,get,delete,put。不常用copy、head、link等等。

区别：

(1)post比get安全 (因为post参数在请求体中。get参数在url上面)

(2)get传输速度比post快根据传参决定的。(post通过请求体传参，后台通过数据流接收。速度稍微慢一些。而get通过url传参可以直接获取)

(3)post传输文件大理论没有限制 get传输文件小大概7-8k ie4k左右

(4)get获取数据post上传数据(上传的数据比较多 而且上传数据都是重要数据。所以不论在安全性还是数据量级 post是最好的选择)



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



##### 20.函数柯力化的实现（利用闭包机制）

> 函数柯力化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

```javascript
 function add() {
     var args = [...arguments];
     var fn = function () {
         args.push(...arguments);
         return fn
     };
     fn.toString = function () {
         return args.reduce(function (a, b) {
             return a + b;
         });
     };
     return fn;
 }
console.log(add(1)(1, 2, 3)(2)) // 9
```



##### 21.js模拟new操作符

new的结果是一个新对象，在模拟实现的时候，要创建一个新对象。实例的__ proto__属性会指向构造函数的prototype，建立起这样的关系，实例可以访问原型上的属性

```javascript
//方法1
function _new(Fn,...args){
    // var obj = {};
    // obj.__proto__ = Fn.prototype;
    let obj = Object.create(Fn.prototype);
    console.log(obj)
    Fn.call(obj,...args);
    return obj;
}
//方法2
function _new(){
    var obj = new Object();
    Constructor = [].shift.call(arguments); //删除arguments，取得外部传入的构造函数
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj,arguments);
    return obj
}
var p = _new(Person,"yang",18);
```

> 理解Object.create()

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__ proto__。Object.create()是一个继承方法，返回一个新对象，带着指定的原型对象和属性。

> 理解Object.assign(target, ...sources)

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```



##### 22.Promise实现

**异步**是非阻塞的，异步逻辑与主逻辑相互独立，主逻辑不需要等待异步逻辑完成，而是可以立刻继续下去。

**promise**有三个状态

- pending[待定]初始状态

- fulfilled[实现]操作成功
- rejected[拒绝]操作失败

Promise一旦从等待状态变成为其它状态就永远不能更改状态了。无法取消Promise，错误需要通过回调函数来捕获。

```javascript
function myPromise(constructor) {
    let self = this;
    self.status = "pending";
    self.value = undefined; //定义状态为resolved的时候的状态
    self.reason = undefined;//定义状态为rejected的时候的状态
    function resolve(value) {
        //两个==="pending"，保证了状态的改变是不可逆的
        if (self.status === "pending") {
            self.value = value;
            self.status = "resolved";
        }
    }

    function reject(reason) {
        //两个==="pending"，保证了状态的改变是不可逆的
        if (self.status === "pending") {
            self.value = value;
            self.status = "rejected";
        }
    }
    //捕获构造异常
    try {
        constructor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// 定义链式调用的then方法
myPromise.prototype.then = function (onFullfilled, onRejected) {
    let self = this;
    switch (self.status) {
        case "resolved":
            onFullfilled(self.value);
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:
    }
}
```



##### 23.async/await

async/await是一种建立在Promise之上的编写异步或非阻塞代码的新方法，被普遍认为是JS异步操作的最终且最优雅的解决方案。

async是异步的意思，await是async wait的简写，即异步等待。所以从语义上就很好理解 async 用于声明一个 function 是异步的，而await 用于等待一个异步方法执行完成。

await操作符等的是一个返回结果，那么如果是同步的情况，那就直接返回了。如果是异步的情况，await会阻塞整一个流程，直到结果返回之后，才会继续下面代码。



##### 24.js的防抖与节流

> 防抖

**函数防抖**是指在事件被触发n秒后在执行回调，如果在这n秒内事件又被触发，则重新计算函数执行时间。可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求

```javascript
function debance(fn, delay) {
    let timer = null;
    return (...args) => {
        const _this = this;
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(_this,args);
        }, delay)
    }
}
```

> 节流

**函数节流**是只规定一个单位时间内，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在scroll函数的事件监听上，通过事件节流来降低事件调用的频率。

```javascript
function throttle(fn, dely) {
    var flag = true;
    return (...args) => {
        const _this = this;
        if (!flag) return;
        flag = false;
        setTimeout(function () {
            fn.apply(_this,args);
            flag = true;
        }, dely)
    }
}
```



##### 25.设计模式



##### 26.http状态码

- **1****：服务器收到请求，需请求者进一步操作
- **2****：请求成功
- **3****：重定向，资源被转移到其他URL了
- **4****：客户端错误，请求语法错误或没有找到相应资源
- **5****：服务端错误，server error
- **304****：Not Modified。指定日期后未修改，不返回资源



##### 27.封装JSONP

**原理**

<u>创建一个`script`标签，把那个跨域的API数据接口地址，赋值给script的src</u>，还要在这个地址中向服务器<u>传递该函数名</u>（可以通过问号传参：？callback = show）。

```javascript
// 封装的jsonp
function jsonp({ url, params, callback }) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');//创建script标签
        window[callback] = function (data) {
            resolve(data)
            document.body.removeChild(script)
        },
            params = { ...params, callback }; // wd=b&callback=show
        let arrs = [];
        for (let key in params) {
            arrs.push(`${key}=${params[key]}`)
        }
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
}
jsonp({
    url: 'http://localhost:3000/list',
    params: { wd: 'Iloveyou' },
    callback: 'show'
}).then(data => {
    console.log(data)
})
```



##### 28.跨域

源 = 协议 + 域名 + 端口号。

如果两个url协议、域名、端口号完全一致，那么这两个url就是同源。同源策略限制的是数据访问，引用的css、js和图片的时候，其实并不知道其内容，只是在引用。

> 1.jsonp

利用`script`标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的JSON数据。JSONP请求一定需要对方服务器做支持才可以。JSONP和AJAX相同，都是客户端向服务器发送请求，从服务器端获取数据方式。但AJAX属于同源策略，JSONP属于非同源策略（跨域请求）。

**JSONP优缺点**

JSONP优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。**缺点是仅支持get方法具有局限性，不安全可能会遭受XSS攻击。**JSONP是通过动态创建script，动态创建script的时候只能用GET，不能用POST

**JSONP实现流程**

![](D:\用户目录\我的文档\HBuilderProject\ywj\note\image\jsonp.png)

- 声明一个回调函数，其<u>函数名做参数值，传递给跨域请求数据的服务器</u>，函数形式为要获取目标数据（服务器返回的data）
- 创建一个`script`标签，把那个跨域的API数据接口地址，赋值给script的src，还要在这个地址中向服务器传递该函数名（可以通过问号传参：？callback = show）。
- 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串，例如：传递进去的函数名是show，它准备好的数据show（"我18岁"）。
- 最后服务器把准备的数据通过http协议返回给客服端，客服端在调用执行之前的声明函数（show），对返回的数据进行操作。

jsonp+jquery的ajax

```javascript
//客服端
$.ajax({
    url: "http:127.0.0.1:3000/list",
    type: "GET",
    dataType: "jsonp",
    jsonpCallback: "show",//->自定义传递给服务器的函数名，而不是使用jQuery自动生成的，可省略
    jsonp: "callback",//->把传递函数名的那个形参callback，可省略
    success: function (res) {
        console.log(res)
    }
})

//服务端
var express = require("express");
var app = express();

app.get('/list',(req,res)=>{
    //callback回调函数
    let { callback = Function.prototype } = req.query;
    var data = {
        code: 0,
        msg: '成功！'
    }
    res.send(`${callback}(${JSON.stringify(data)})`)
})

app.listen(3000,()=>{
    console.log("success！！！")
})
```



> 2.CORS（ Cross-Origin Resource Sharing）跨源资源共享（ W3C 推荐的）

```javascript
app.use((req,res,next)=>{
    //CORS跨域
    // const CORS = {
    //     ALLOW_ORIGIN:"http://127.0.0.1:3000",
    //     ALLOW_METHODS:"PUT,POST,GET,DELETE,OPTIONS,HEAD",
    //     HEADERS:'Content-Type,Content-Length,Authorization,Accept,X-Requested-With',
    //     CREDENTIALS:true
    // }
    // res.header("Access-Control-Allow-Origin",CORS.ALLOW_ORIGIN);
    // res.header("Access-Control-Allow-Credentials",CORS.CREDENTIALS);
    // res.header("Access-Control-Allow-Headers",CORS.HEADERS);
    // res.header("Access-Control-Allow-Methods",CORS.HEADERS);

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next()
})
```

> 3.http proxy(代理)



> 4.nginx方向代理



> 5.postMessage



> 6.socket.io

> 7.node中间件代理（两次跨域）

实现原理：同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。

- 客服端向代理服务器发送请求，代理服务器接受客户端请求
- 代理服务器将请求转发给服务器
- 代理服务器拿到服务器的响应数据
- 将响应转发给客户端



> 8.window.name + iframe



> 9.document.domain + iframe



##### 29.**手动实现map、forEach、filter**、reduce

> map

```javascript
Array.prototype.myMap = function (callback) {
    if (!Array.isArray(this) || !this.length || typeof callback !== "function") {
        return [];
    } else {
        let result = [];
        for (var i = 0; i < this.length; i++) {
            result.push(callback(this[i], i, this))
        }
        return result
    }
}
```

> forEach

```javascript
 Array.prototype.myforEach = function (callback) {
     // 第一个参数必须要为function
     if (typeof callback !== "function") {
         throw new TypeError(callback + " is not a function");
     }
     for (var i = 0; i < this.length; i++) {
         callback(this[i], i, this)
     }
 }
```

> filter

```javascript
function filter(arr, filterCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') 
  {
    return [];
  } else {
    let result = [];
     // 每次调用此函数时，我们都会创建一个 result 数组
     // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      // 检查 filterCallback 的返回值是否是真值
      if (filterCallback(arr[i], i, arr)) { 
      // 如果条件为真，则将数组元素 push 到 result 中
        result.push(arr[i]);
      }
    }
    return result; // return the result array
  }
}
```



##### 30.js实现instanceof、typeof

> **instanceof**

用于检测构造函数的prototype属性是否出现在某个实例对象的原型链

- 首先获取类型的原型
- 然后获得对象的原型
- 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null

```javascript
function myInstanceof(left,right){
    let prototype = right.prototype;
    left = left.__proto__;
    while(true){
        if(left === null || left ===undefined){
            return false;
        }
        if(prototype === left){
            return true;
        }
        left = left.__proto__
    }
}
```

![QQ图片20200807174038](D:\用户目录\我的文档\HBuilderProject\ywj\note\image\QQ图片20200807174038.png)



> **typeof**

typeof操作符返回一个字符串，表示未经计算的操作数的类型





##### 31.构造函数实现原理

- 构造函数中没有显示的创建Object对象，实际上后台自动创建了
- 直接给this对象赋值属性和方法，this即指向创建的对象
- 没有后台返回值，后台自动返回了该对象



**new在执行时会做四件事情：**

- 在内存中创建一个新的空对象
- 让this指向这个新的对象
- 执行构造函数里面的代码，给这个新对象添加属性和方法
- 返回这个新对象（所以构造函数里面不需要return）

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}
//正常写法
var person1 = new Person("Yang",18);

//使用代码模拟，在非IE浏览器中测试，IE浏览器不支持
var person2 = {};
person2.__proto__ = Person.prototype;
Person.call(person2,"Yang",18);
```



##### 32.for in和for of区别

> for in

- 遍历数组会遍历到数组原型上的属性和方法，更适合遍历对象
- for in可以遍历到原型上的方法和属性，如果不想遍历原型的方法和属性的话，可以在循环内部判断一下，hasOwnPropery方法可以判断属性是否是该对象的实例属性

> for of

- 遍历数组的值，而不是索引，不会遍历原型
- `forEach`不支持`break, continue, return`等



##### 33.前端登录实现过程

##### 34.同步和异步的区别

- **同步**：不同进程协同完成某项工作而先后次序调整（通过阻塞、唤醒等方式），同步强调的是顺序性，谁先谁后。异步不存在顺序性
- **异步**：浏览器访问服务器请求，用户正常操作，浏览器在后端进行请求。等请求完，页面不刷新，加载出新内容。



##### 35.回流与重绘

```javascript

```





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

##### 39.WebSocket



##### 40.理解axios原理



##### 41.实现路由 -Hash



##### 42.**路由实现 - history**

 

##### 43.JSON.stringify()实现原理