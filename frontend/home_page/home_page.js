function logoutck() {
  var r = confirm("Сигурен ли си, че искаш да излезеш от своя профил?");
  if (r) {
    window.location.href = "../../backend/api/logout.php";
  }
}