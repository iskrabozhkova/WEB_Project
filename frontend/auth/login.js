const login = (data) => {
  return fetch("../../backend/api/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        location.replace("../profile/profile.html");
      } else {
        const errorEl = document.getElementById("error-message");
        errorEl.innerText = data.message;
      }
    });
};

(() => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (event) => {
    const errMsgEL = document.getElementById("error-message");
    errMsgEL.innerText = null;

    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    login({ email, password });
    event.preventDefault();
  });
})();