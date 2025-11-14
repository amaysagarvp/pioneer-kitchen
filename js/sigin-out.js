// Helper to get elements
const el = id => document.getElementById(id);

// Clear messages and optionally inputs
function clearMessages() {
  el('signup-error').textContent = '';
  el('signup-error').className = 'error';
  el('signin-error').textContent = '';
  el('signin-error').className = 'error';
}

function clearInputs() {
  el('newUsername').value = '';
  el('newPassword').value = '';
  el('username').value = '';
  el('password').value = '';
}

function showSignIn() {
  clearMessages();
  clearInputs();
  el('signup-container').style.display = 'none';
  el('signin-container').style.display = 'block';
  el('welcome-container').style.display = 'none';
  el('username').focus();
}

function showSignUp() {
  clearMessages();
  clearInputs();
  el('signup-container').style.display = 'block';
  el('signin-container').style.display = 'none';
  el('welcome-container').style.display = 'none';
  el('newUsername').focus();
}

function showWelcome(username) {
  clearMessages();
  el('signup-container').style.display = 'none';
  el('signin-container').style.display = 'none';
  el('welcome-container').style.display = 'block';
  el('welcome').textContent = `Welcome, ${username}!`;
}

// Sign up
function signUp() {
  const username = el('newUsername').value.trim();
  const password = el('newPassword').value.trim();
  const errorEl = el('signup-error');

  if (!username || !password) {
    errorEl.textContent = 'Please fill all fields!';
    return;
  }

  if (localStorage.getItem(username)) {
    errorEl.textContent = 'Username already exists!';
    return;
  }

  localStorage.setItem(username, password);
  errorEl.className = 'success';
  errorEl.textContent = 'Account created successfully!';

  // Switch to sign-in after a short delay so user sees success
  setTimeout(showSignIn, 800);
}

// Sign in
function signIn() {
  const username = el('username').value.trim();
  const password = el('password').value.trim();
  const errorEl = el('signin-error');

  if (!username || !password) {
    errorEl.textContent = 'Please enter username and password';
    return;
  }

  const storedPassword = localStorage.getItem(username);
  if (storedPassword !== null && storedPassword === password) {
    localStorage.setItem('currentUser', username);
    showWelcome(username);
  } else {
    errorEl.textContent = 'Invalid username or password';
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  showSignIn();
}

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
  // Auto-login if user is already signed in
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    showWelcome(currentUser);
  } else {
    showSignIn();
  }

  // Buttons and links
  el('signupBtn').addEventListener('click', signUp);
  el('signinBtn').addEventListener('click', signIn);
  el('logoutBtn').addEventListener('click', logout);
  el('showSignInLink').addEventListener('click', (e) => { e.preventDefault(); showSignIn(); });
  el('showSignUpLink').addEventListener('click', (e) => { e.preventDefault(); showSignUp(); });

  // Enter key handling for password fields
  el('newPassword').addEventListener('keydown', (e) => { if (e.key === 'Enter') signUp(); });
  el('password').addEventListener('keydown', (e) => { if (e.key === 'Enter') signIn(); });
});
