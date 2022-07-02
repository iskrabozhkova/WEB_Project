const usersSection = document.getElementById("users");

const getUsers = () => {
  return fetch("../../backend/api/users.php", {
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
        userUl.classList.add("userUl");

        const liElBirthday = document.createElement("li");
        userUl.appendChild(liElBirthday);
        liElBirthday.innerText = "Рожден ден: " + " " + data[idx].birthday;

        const liElNameday = document.createElement("li");
        userUl.appendChild(liElNameday);
        liElNameday.innerText = "Имен ден: " + " " + data[idx].nameday;

        const buttonFavourites = document.createElement("button");
        userUl.appendChild(buttonFavourites);
        buttonFavourites.innerText = "Добави към любими";

        buttonFavourites.classList.add("buttonFavourites");
        buttonFavourites.classList.add("buttonFavourites:hover");

        buttonFavourites.id = `${data[idx].ID}`;
        buttonFavourites.addEventListener("click", buttonClick);
      });
    });
};

const buttonClick = (e) => {
  if (e.target.tagName.toLowerCase() === "button") {
    const btn = e.target;
    const btnId = btn.id;
    btn.textContent = "Добавен";
    btn.style.backgroundColor = "rgb(205, 174, 172)";
    fetch("../../backend/api/add_favourite.php", {
      method: "POST",
      body: btnId,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

const getFavourite = () => {
  return fetch("../../backend/api/favourite_users.php", {
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
        userUl.classList.add("userUl");

        const liElBirthday = document.createElement("li");
        userUl.appendChild(liElBirthday);
        liElBirthday.innerText = "Рожден ден: " + " " + data[idx].birthday;

        const liElNameday = document.createElement("li");
        userUl.appendChild(liElNameday);
        liElNameday.innerText = "Имен ден: " + " " + data[idx].nameday;

        const labelFavourites = document.createElement("label");
        userUl.appendChild(labelFavourites);
        labelFavourites.innerText = "В любими";

        labelFavourites.classList.add("buttonInFavourites");
      });
    });
};

getUsers();
getFavourite();

function logoutck() {
  var r = confirm("Сигурен ли си, че искаш да излезеш от своя профил?");
  if (r) {
    window.location.href = "../../backend/api/logout.php";
  }
}
