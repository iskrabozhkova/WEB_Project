const arePasswordsEqual = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    const errMsgEL = document.getElementById("error-message");
    errMsgEL.innerText = "Паролите не съвпадат!";

    return false;
  }
  return true;
};

const registration = (data) => {
  fetch("../../backend/api/registration.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        location.replace("login.html");
      } else {
        const errorEl = document.getElementById("error-message");
        errorEl.innerText = data.message;
      }
    });
};

(() => {
  const formRegistartion = document.getElementById("registration-form");

  formRegistartion.addEventListener("submit", (event) => {
    const errMsgEL = document.getElementById("error-message");
    errMsgEL.innerText = null;

    const username = document.getElementById("username").value;
    const password = document.getElementById("pass").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const email = document.getElementById("email").value;
    const birthday = document.getElementById("birthday").value;
    const nameday = document.getElementById("nameday").value;

    if (arePasswordsEqual(password, confirmPassword)) {
      registration({ username, email, password, birthday, nameday });
    }
    event.preventDefault();
  });
})();