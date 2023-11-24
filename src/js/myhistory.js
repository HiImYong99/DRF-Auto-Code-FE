import { getCookie } from "./cookie.js";
// 요청 답변 기록js
const $remove_btn = document.querySelector("#history-remove");
const $question = document.querySelector("#question");
const $result = document.querySelector("#result");
const id_lst = [];
const data_lst = [];
const answer_lst = [];
const token = getCookie("my-app-auth");

function userrequest() {
  fetch("http://127.0.0.1:8000/main/request/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const id = data.map(item => item.id);
      const details = data.map(item => item.detail);
      const answer = data.map(item => item.answer);
      if (details.length == 0) {
        $question.innerText = "사용자가 요청을 남긴적이 없습니다.";
        $result.innerText = "AI가 답변을 남긴적이 없습니다.";
      } else {
        write_history(details);
        id_lst.push(id);
        data_lst.push(data);
        answer_lst.push(answer);
      }
    });
}
userrequest();

// 불러온 내용을 html에 작성
function write_history(detail) {
  let ol_detail = document.createElement("ol");
  ol_detail.style.listStyleType = "number";
  detail.forEach((question, index) => {
    let li_detail = document.createElement("li");
    li_detail.innerText = index + 1 + ". " + question;
    li_detail.id = index;
    li_detail.style.display = "flex";
    li_detail.style.justifyContent = "space-between";

    let deleteButton = document.createElement("button");

    // SVG 엘리먼트 생성
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "w-6 h-6");

    // SVG 내용 설정
    svg.innerHTML =
      '<path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />';

    // SVG를 버튼에 추가
    deleteButton.appendChild(svg);
    deleteButton.addEventListener("click", index => {
      deleteData(li_detail.id);
    });

    li_style(li_detail, deleteButton);

    li_detail.appendChild(deleteButton);
    ol_detail.appendChild(li_detail);

    li_detail.addEventListener("click", () => {
      console.log(li_detail.id);
      console.log(answer_lst);
      let ai_history = answer_lst[0][li_detail.id];
      let ai_code = document.createElement("pre");
      $result.innerText = "";
      ai_code.innerText = ai_history;
      $result.appendChild(ai_code);
    });
  });
  $question.appendChild(ol_detail);
}

// 버튼클릭 시 초기화
function deleteData(index) {
  if (confirm("정말 해당 기록을 삭제하시겠습니까?")) {
    fetch(`http://127.0.0.1:8000/main/delete/${id_lst[0][Number(index)]}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {});
  }
  location.reload();
}

function deleteDataAll(index) {
  if (confirm("정말 해당 기록을 삭제하시겠습니까?")) {
    fetch(`http://127.0.0.1:8000/main/delete/all/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {});
  }
  location.reload();
}

// 리스트 style 변경 모은함수
function li_style(li, button) {
  li.className = "mb-3";
  li.style.cursor = "pointer";
  li.style.listStyle = "decimal inside";

  li.addEventListener("mouseover", () => {
    li.style.color = "red";
    button.style.color = "black";
  });

  li.addEventListener("mouseout", () => {
    li.style.color = "black";
  });
}

$remove_btn.addEventListener("click", deleteDataAll);
