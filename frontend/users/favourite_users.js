const fav_section = document.getElementById("fav_users");
const fav_section_with_event = document.getElementById("fav_users_with_event");

const fav_users = () => {
  return fetch("../../backend/api/favourite_without_event.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      var html = " ";
      for (var a = 0; a < data.length; a++) {
        var username = data[a].username;
        var email = data[a].email;
        var birthday = data[a].birthday;
        var nameday = data[a].nameday;
        var btn_id = data[a].ID;

        html += "<tr>";
        html += "<td>" + username + "</td>";
        html += "<td>" + email + "</td>";
        html += "<td>" + birthday + "</td>";
        html += "<td>" + nameday + "</td>";
        html +=
          '<td><input style="cursor:pointer; border:1px solid black; border-radius:4px; padding:1%; margin:2%; text-align=center;" type="button" value="Избери" id="' +
          btn_id +
          '"></td>';
        html += "</tr>";
      }

      document.getElementById("fav_users").innerHTML = html;
      document.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() === "input") {
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
      });
    });
};

const fav_users_with_event = () => {
  return fetch("../../backend/api/favourite_with_event.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      var html = " ";
      for (var a = 0; a < data.length; a++) {
        var username = data[a].username;
        var email = data[a].email;
        var birthday = data[a].birthday;
        var nameday = data[a].nameday;

        html += "<tr>";
        html += "<td>" + username + "</td>";
        html += "<td>" + email + "</td>";
        html += "<td>" + birthday + "</td>";
        html += '<td style="padding:0.75%;">' + nameday + "</td>";
        html += "</tr>";
      }

      document.getElementById("fav_users_with_event").innerHTML = html;
    });
};

fav_users();
fav_users_with_event();

function logoutck() {
  var r = confirm("Сигурен ли си, че искаш да излезеш от своя профил?");
  if (r) {
    window.location.href = "../../backend/api/logout.php";
  }
}