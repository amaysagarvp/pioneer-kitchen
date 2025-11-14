// SIMPLE DEMO ACCOUNT
const realUser = "admin";
const realPass = "1234";

// LOGIN FUNCTION
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("errorMsg");

  if (!user || !pass) {
    error.textContent = "Please enter username & password";
    return;
  }

  if (user === realUser && pass === realPass) {
    localStorage.setItem("loggedUser", user);
    window.location.href = "index.html"; // redirect to your real home page
  } else {
    error.textContent = "Invalid username or password!";
  }
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.reload();
}

// SHOW USERNAME IN NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("signinBtn");
  const authArea = document.getElementById("authArea");

  const loggedUser = localStorage.getItem("loggedUser");

  if (loggedUser) {
    authArea.innerHTML = `
      <span style="color:white; margin-right:10px;">👤 ${loggedUser}</span>
      <button class="signBtn" onclick="logout()">Logout</button>
    `;
  }
});
