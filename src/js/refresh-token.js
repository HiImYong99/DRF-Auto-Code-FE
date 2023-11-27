import { url } from "./url.js";
const refresh_token = getCookie("my-refresh-token");

const formData = new FormData();
formData.append("refresh", refresh_token);

const refresh_access = async () => {
  await fetch(`${url}/accounts/token/refresh/`, {
    method: "POST",
    headers: {},
    credentials: "include",
    body: formData,
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });
  location.reload();
};

setInterval(refresh_access, 1000 * 60 * 59);

function isTokenExpired() {
  const token = getCookie("access_token");
  if (!token) {
    return true;
  }

  const decodedToken = decodeJwtToken(token);
  if (!decodedToken.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

function logout() {
  if (isTokenExpired()) {
    alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
    deleteCookie("access_token");
  }
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function decodeJwtToken(token) {
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = atob(payloadBase64);
  return JSON.parse(decodedPayload);
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
}

// 1분마다 토큰 유효검사
setInterval(logout, 1000 * 60);
