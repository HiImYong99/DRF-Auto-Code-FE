const logout_btn = document.querySelector("#logout-btn");

const deleteCookie = cookie_name => {
  document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const api_logout = () => {
  deleteCookie("my-app-auth");
  deleteCookie("my-refresh-token");
  deleteCookie("csrftoken");
  deleteCookie("sessionid");
  location.href = "/index.html"; // Redirect to logout success page or any other page
};

logout_btn.addEventListener("click", api_logout);
