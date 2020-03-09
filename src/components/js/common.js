// 路由参数截取
export default function GetRequest () {
  var url = location.href
  var theRequest = new Object()
  var index = url.indexOf('?')
  if (url.indexOf('?') != -1) {
    var str = url.substr(index + 1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}


