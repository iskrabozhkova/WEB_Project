const usersSection = document.getElementById("events");

const getUsers = () => {
  return fetch("../../backend/api/create_event.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      data.map((user, idx) => {
        const userUl = document.createElement("ul");
        usersSection.appendChild(userUl);

        const liElName = document.createElement("li");
        userUl.appendChild(liElName);
        liElName.innerText = "Потребителско име:" + " " + data[idx].username;
        userUl.classList.add("eventUl");

        const liElBirthday = document.createElement("li");
        userUl.appendChild(liElBirthday);
        liElBirthday.innerText = "Рожден ден: " + " " + data[idx].birthday;

        const liElNameday = document.createElement("li");
        userUl.appendChild(liElNameday);
        liElNameday.innerText = "Имен ден: " + " " + data[idx].nameday;

        const buttonFavourites = document.createElement("button");
        userUl.appendChild(buttonFavourites);
        buttonFavourites.innerText = "Създай събитие";

        buttonFavourites.classList.add("button_create");
        buttonFavourites.classList.add("button_create:hover");
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
    fetch("../../backend/api/events.php", {
      method: "POST",
      body: btnId,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      location.replace(`../add_users/add_users.html?id=${btnId}`);
    });
  }
};

function logoutck() {
  var r = confirm("Сигурен ли си, че искаш да излезеш от своя профил?");
  if (r) {
    window.location.href = "../../backend/api/logout.php";
  }
}
