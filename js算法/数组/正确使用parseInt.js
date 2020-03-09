/* parseInt(string, radix)
 * -string	必需。要被解析的字符串
 * -radix	可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
 * - 如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。
 * - 如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。
 * - 如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。
 * 修改 js 代码中 parseInt 的调用方式，使之通过全部测试用例
 * 输入"12"
 * 输出 12
 * 
 * 输入"12px"
 * 输出12
 * 
 * 输入"0x12"
 * 输出0
 */

function parse2Int(num) {
	return parseInt(num, 8);
}

console.log("12");
console.log("12px");
consloe.log("0x12")