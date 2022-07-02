const usersSection = document.getElementById("events");
const url = new URLSearchParams(document.location.search);
const id = url.get("id");

function post_comment() {
  var comment = document.getElementById("comment").value;
  return fetch("../../backend/api/comment.php", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      comment: comment,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

const getUsers = () => {
  return fetch("../../backend/api/chat.php", {
    method: "POST",
    body: id,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data["message"].map((user, idx) => {
        console.log(user);
        const userUl = document.createElement("ul");
        usersSection.appendChild(userUl);

        const liElName = document.createElement("li");
        userUl.appendChild(liElName);
        liElName.innerText = user.username;
        userUl.classList.add("eventUl");

        const liElEmail = document.createElement("li");
        userUl.appendChild(liElEmail);
        liElEmail.innerText = user.email;
        userUl.classList.add("eventUl");
      });
    });
};

const commentSection = document.getElementById("comments-list");
const showComments = () => {
  return fetch("../../backend/api/show_comment.php", {
    method: "POST",
    body: id,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data["message"].map((user, idx) => {
        const commentUl = document.createElement("ul");
        commentSection.appendChild(commentUl);

        const username = document.createElement("li");
        commentUl.appendChild(username);
        username.innerText = user.username;
        username.classList.add("username-comment");
        username.classList.add("username-comment:after");

        const content = document.createElement("li");
        commentUl.appendChild(content);
        content.innerText = user.content;
        content.classList.add("content-comment");
      });
    });
};

getUsers();
showComments();

const getUsername = () => {
  return fetch("../../backend/api/get_username.php", {
    method: "POST",
    body: id,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data["message"].map((user, idx) => {
        const my_user = user.username;
        var headingDiv = document.getElementById("header");
        headingDiv.innerHTML =
          "<header>Организиране на празненството на " + my_user + "</header>";
      });
    });
};

getUsername();

function logoutck() {
  var r = confirm("Сигурен ли си, че искаш да излезеш от своя профил?");
  if (r) {
    window.location.href = "../../backend/api/logout.php";
  }
}
