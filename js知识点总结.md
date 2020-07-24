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

##### 8.创建对象的几种方式

##### 9.继承的几种实现方式

##### 10.寄生式组合继承的实现

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

##### 12.原型、原型链

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

##### 19.js深浅拷贝

- **浅拷贝：**如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是地址值，其中一个对象改变了这个地址，就会影响到另一个对象

源码



- **深拷贝：**将一个对象从内存中完整的拷贝出来，从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

源码

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

