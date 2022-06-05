//TODO: 这里写网络请求函数
const url_head = 'http://10.186.36.82:5000/'
// 'http://localhost:5000'
/* 
data指的是body的内容
目前还没有和后端沟通好，所以header之类的请自己传入
*/
async function request(url = '', method = 'GET', header = '', data = {}) {
  var final_url = url_head + url;
  var response;

  switch (method.toLowerCase()) {
    case 'get':
      response = await fetch(final_url, {
        method: 'GET',
        headers: header,
      });
      break;
    case 'post':
      response = await fetch(final_url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
      });
      break;
    case 'delete':
      response = await fetch(final_url, {
        method: 'DELETE',
        headers: header,
      });
      break;
    case 'put':
      response = await fetch(final_url, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(data)
      });
      break;
  }
  return response.json()
}


export default request;