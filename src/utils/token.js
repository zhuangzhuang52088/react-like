//封装和token相关的操作 存 取 删除

const TOKENKEY = "token_key";
function setToken(token) {
  //存token
  localStorage.setItem(TOKENKEY, token);
}

function getToken() {
  //取token
  return localStorage.getItem(TOKENKEY);
}

function removeToken() {
  //删除token
  localStorage.removeItem(TOKENKEY);
}

export { setToken, getToken, removeToken };
