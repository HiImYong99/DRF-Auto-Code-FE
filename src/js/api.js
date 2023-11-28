//서버와의 통신 js
import { url } from "./url.js";

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
};

// api 통신 만약 성공시 printAnswer 함수 인자값에 받아온 결과값 전달

const token = getCookie("my-app-auth");
export const apiPost = async () => {
  await fetch(`http://15.164.247.181:8000/gpt/request/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        alert("하루 최대 5건의 요청만 가능합니다.");
      }
    })
    .then(res => {
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
