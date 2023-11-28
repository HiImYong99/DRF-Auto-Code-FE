// 로그아웃 처리
import { url } from "./url.js";
import { deleteAllCookies, clearToken } from "./cookie.js";
const $logout_btn = document.querySelector("#logout-btn");

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
  location.reload();
};

$logout_btn.addEventListener("click", clearToken);
$logout_btn.addEventListener("click", deleteAllCookies);
$logout_btn.addEventListener("click", api_logout);
