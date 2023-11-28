// 토큰 재발급 및 유효성 검사
import { url } from "./url.js";
import {
  saveCookie,
  saveToken,
  getToken,
  deleteAllCookies,
  clearToken,
} from "./cookie.js";

const formData = new FormData();
formData.append("refresh", refresh_token);

const refresh_access = async () => {
  const refresh_token = getCookie("my-refresh-token");
  await fetch(`${url}/accounts/token/refresh/`, {
    method: "POST",
    headers: {},
    credentials: "include",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      saveToken("my-app-auth", data.access);
      saveCookie("my-app-auth", getToken("my-app-auth"), 1);
    })
    .catch(err => {
      console.log(err);
    });
};
window.addEventListener("beforeunload", event => {
  event.preventDefault();
  refresh_access();
});

function isTokenExpired() {
  const token = getCookie("my-app-auth");
  const decodedToken = decodeJwtToken(token);
  const currentTime = Math.floor(Date.now() / 1000);

  return decodedToken.exp < currentTime;
}

function logout() {
  console.log("토큰체크");
  if (isTokenExpired()) {
    deleteAllCookies();
    clearToken();
    alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
    location.reload();
    api_logout();
    const api_logout = async () => {
      await fetch(`${url}/accounts/logout/`, {
        method: "POST",
        headers: {},
        credentials: "include",
      })
        .then(res => res.json())
        .catch(err => {
          console.log(err);
        });
    };
  }
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
setInterval(logout, 1000 * 61);
