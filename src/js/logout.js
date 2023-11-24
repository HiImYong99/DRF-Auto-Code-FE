const $logout_btn = document.querySelector("#logout-btn");

const deleteCookie = cookie_name => {
  document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const api_logout = async () => {
  await fetch("http://127.0.0.1:8000/accounts/logout/", {
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

$logout_btn.addEventListener("click", api_logout);
