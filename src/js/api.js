//서버와의 통신 js

// import { data } from "./data.js";

let url = "http://127.0.0.1:8000/main/request/";
const $output_text = document.querySelector("#ai-answer");
export const $loading = document.querySelector("#loading");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
//사용자에게 입력받은 요청을 data에 넣음

const data = {};
export const sendQuestion = (lang, method, detail) => {
  data["language"] = lang;
  data["purpose"] = method;
  data["detail"] = detail;
  console.log(data);
};

const token = getCookie("my-app-auth");
// api 통신 만약 성공시 printAnswer 함수 인자값에 받아온 결과값 전달
export const apiPost = async () => {
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res.answer);
      printAnswer(res.answer);
    })
    .catch(err => {
      console.log(err);
    });
};

// api에게 받은 답변을 화면에 출력함
const printAnswer = async answer => {
  let pre = document.createElement("pre");
  pre.innerText = answer;
  $loading.style.display = "none";
  const $existingPre = $output_text.querySelector("pre");
  if ($existingPre) {
    $output_text.removeChild($existingPre);
  }
  $output_text.appendChild(pre);
};
