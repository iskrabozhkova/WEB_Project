const usersSection = document.getElementById("users");
const url = new URLSearchParams(document.location.search);
const id = url.get("id");

const getUsers = () => {
  return fetch("../../backend/api/show_add_users.php", {
    method: "POST",
    body: id,
  })
    .then((res) => res.json())
    .then((data) => {
      data.map((user, idx) => {
        const userUl = document.createElement("ul");
        usersSection.appendChild(userUl);

        const liElName = document.createElement("li");
        userUl.appendChild(liElName);
        liElName.innerText = "Потребителско име:" + " " + data[idx].username;
        userUl.classList.add("userUl");

        const buttonFavourites = document.createElement("button");
        userUl.appendChild(buttonFavourites);
        buttonFavourites.innerText = "Добави към събитие";

        buttonFavourites.classList.add("buttonFavourites");
        buttonFavourites.classList.add("buttonFavourites:hover");

        buttonFavourites.setAttribute(
          "data-add-to-favourite",
          "`${data[idx].id}`"
        );
        buttonFavourites.id = `${data[idx].ID}`;
        buttonFavourites.addEventListener("click", buttonClick);
      });
    });
};

getUsers();

const buttonClick = (e) => {
  if (e.target.tagName.toLowerCase() === "button") {
    const btn = e.target;
    const btnId = btn.id;
    btn.textContent = "Добавен";
    btn.style.backgroundColor = "rgb(205, 174, 172)";

    fetch("../../backend/api/add_users.php", {
      method: "POST",
      body: btnId,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

function logoutck() {
  var r = confirm("Сигурен ли си, че искаш да излезеш от своя профил?");
  if (r) {
    window.location.href = "../../backend/api/logout.php";
  }
}