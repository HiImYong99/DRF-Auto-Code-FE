import { getToken } from "./cookie.js";

// 페이지 로드 시 실행되는 함수
window.onload = () => {
  const auth = document.querySelectorAll(".auth");
  const notauth = document.querySelectorAll(".notauth");
  const access = getToken("my-app-auth");
  // access 쿠키 확인
  if (access == "undefined" || access == "" || !access) {
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
  } else {
    auth.forEach(element => {
      element.classList.remove("hidden");
    });
    notauth.forEach(element => {
      element.classList.add("hidden");
    });
  }
};
