const setCookie = (cookie_name, value) => {
  let exdate = new Date();
  exdate.setDate(exdate.getMinutes() + 30);
  // 설정 일수만큼 현재시간에 만료값으로 지정
  const cookie_value = value + "; expires=" + exdate.toUTCString();
  document.cookie = cookie_name + "=" + cookie_value;
};

const login_btn = document.querySelector("#login-btn");

const api_login = async e => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);
  try {
    // fetch를 이용해서 서버에 POST 요청을 보낸다.
    const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: {},
      body: formData,
    });

    const data = await response.json();

    // 응답 데이터 확인
    if (response.ok) {
      // 로그인 성공
      location.href = "/index.html";
    } else {
      // 로그인 실패 시
      console.error("로그인 실패:", data);
    }
  } catch (err) {
    console.error("로그인 오류:", err);
  }
};
login_btn.addEventListener("click", api_login);
