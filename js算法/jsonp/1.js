$.ajax({
    url: "http://127.0.0.1:3000/list",
    type: "GET",
    // dataType: "jsonp",
    // jsonpCallback: "show",//->自定义传递给服务器的函数名，而不是使用jQuery自动生成的，可省略
    // jsonp: "callback",//->把传递函数名的那个形参callback，可省略
    success: function (res) {
        console.log(res)
    }
})

// // 封装的jsonp
// function jsonp({ url, params, callback }) {
//     return new Promise((resolve, reject) => {
//         let script = document.createElement('script');//创建script标签
//         window[callback] = function (data) {
//             resolve(data)
//             document.body.removeChild(script)
//         },
//             params = { ...params, callback }; // wd=b&callback=show
//         let arrs = [];
//         for (let key in params) {
//             arrs.push(`${key}=${params[key]}`)
//         }
//         script.src = `${url}?${arrs.join('&')}`
//         document.body.appendChild(script)
//     })
// }
// jsonp({
//     url: 'http://localhost:3000/list',
//     params: { wd: 'Iloveyou' },
//     callback: 'show'
// }).then(data => {
//     console.log(data)
// })
