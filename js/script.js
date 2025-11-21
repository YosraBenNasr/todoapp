
// --------------------------
// SIGN UP
// --------------------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function(e){
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const isStudent = document.getElementById("student").checked;

    if (!fullname || !email || !password || !confirm) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === email)) {
      alert("This email is already registered!");
      return;
    }

    users.push({ fullname, email, password, isStudent });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    signupForm.reset();

    // Redirection vers Sign In
    window.location.href = "signin.html";
  });
}

// --------------------------
// SIGN IN
// --------------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    if (!email || !password) {
      alert("Please fill in both fields!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Incorrect email or password!");
      return;
    }

    // Sauvegarder l'utilisateur connecté
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Remember Me
    if (remember) localStorage.setItem("rememberEmail", email);
    else localStorage.removeItem("rememberEmail");

    // Redirection vers dashboard
    window.location.href = "dashboard.html";
  });

  // Charger email sauvegardé
  const savedEmail = localStorage.getItem("rememberEmail");
  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("remember").checked = true;
  }

  // Si déjà connecté → rediriger automatiquement
  const loggedUser = localStorage.getItem("loggedInUser");
  if (loggedUser && window.location.pathname.includes("signin.html")) {
    window.location.href = "dashboard.html";
  }
}
