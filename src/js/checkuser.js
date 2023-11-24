const getCookie = cookie_name => {
  const name = cookie_name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

// 페이지 로드 시 실행되는 함수
window.onload = () => {
  const auth = document.querySelectorAll(".auth");
  const notauth = document.querySelectorAll(".notauth");
  const access = getCookie("my-app-auth");
  const refresh = getCookie("my-refresh-token");
  // access 쿠키가 존재하는 경우
  if (access !== "") {
    auth.forEach(element => {
      element.classList.remove("hidden");
    });
    notauth.forEach(element => {
      element.classList.add("hidden");
    });
  } else {
    auth.forEach(element => {
      element.classList.add("hidden");
    });
    notauth.forEach(element => {
      element.classList.remove("hidden");
    });
    const request_btn = document.getElementById("request-btn");
    request_btn.textContent = "로그인이 필요합니다.";
    request_btn.addEventListener("click", () => {
      window.location.href = "pages/login.html"; // 로그인 페이지 경로에 맞게 수정
    });
  }
};
