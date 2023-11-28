// 로그인 처리
import { url } from "./url.js";
import { saveCookie, saveToken, getToken } from "./cookie.js";
const $login_btn = document.querySelector("#login-btn");
const api_login = async e => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);

  // fetch를 이용해서 서버에 POST 요청을 보낸다.
  await fetch(`${url}/accounts/login/`, {
    method: "POST",
    headers: {},
    credentials: "include",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.non_field_errors) {
      } else {
        saveToken("my-app-auth", data.access);
        saveCookie("my-app-auth", getToken("my-app-auth"), 1);
        saveToken("my-refresh-token", data.refresh);
        saveCookie("my-refresh-token", getToken("my-refresh-token"), 1);
        location.href = "/index.html";
      }
    })
    .catch(err => {
      alert("계정 혹은 비밀번호를 다시 확인해주세요.");
      console.log(err);
    });
};
$login_btn.addEventListener("click", api_login);
