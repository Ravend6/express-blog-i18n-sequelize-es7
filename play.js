// let msg = 'Validation len :min=2'
let msg = 'Validation len :min=2 :max=210'

// var myString = "something format_abc";
// let myRegexp = /(.*?):min=(.*?)(?:\s|$)/g
let myRegexp = /(?:^|\s)(.*?):min=(.*?)(?:\s|$)(.*?):max=(.*?)(?:\s|$)/g
let match = myRegexp.exec(msg)
console.log(match)
console.log(myRegexp.test(msg))
// alert(match[1])  // abc
