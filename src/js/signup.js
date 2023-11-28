// 회원가입 처리
import { url } from "./url.js";
const signup_btn = document.querySelector("#signup-btn");

const api_join = async e => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password1 = document.getElementById("password1").value;
  let password2 = document.getElementById("password2").value;

  if (password1 != password2) {
    alert("비밀번호가 다릅니다.");
    return false;
  }

  const formData = new FormData();

  formData.append("email", email);
  formData.append("password1", password1);
  formData.append("password2", password2);

  // fetch를 이용해서 서버에 POST 요청을 보낸다.
  await fetch(`${url}/accounts/register/`, {
    method: "POST",
    headers: {},
    body: formData,
  })
    .then(data => {
      if (data.email) {
        alert(data.email[0]);
      } else {
        alert("회원가입을 축하합니다.");
        location.href = "/pages/login.html";
      }
    })
    .catch(err => {
      console.log(err);
    });
};

signup_btn.addEventListener("click", api_join);
