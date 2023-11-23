const setCookie = (cookie_name, value) => {
  let exdate = new Date();
  exdate.setDate(exdate.getMinutes() + 30);
  // 설정 일수만큼 현재시간에 만료값으로 지정
  const cookie_value = value + "; expires=" + exdate.toUTCString();
  document.cookie = cookie_name + "=" + cookie_value;
};

const $login_btn = document.querySelector("#login-btn");

const api_login = async e => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);

  // fetch를 이용해서 서버에 POST 요청을 보낸다.
  await fetch("http://127.0.0.1:8000/accounts/login/", {
    method: "POST",
    headers: {},
    credentials: "include",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.non_field_errors) {
        alert(data.non_field_errors[0]);
      } else {
        console.log(data);
        location.href = "/index.html";
      }
    })
    .catch(err => {
      console.log(err);
    });
};
$login_btn.addEventListener("click", api_login);
