const username= document.getElementById('username');
const email= document.getElementById('email');
const birthday= document.getElementById('birthday');
const nameday= document.getElementById('nameday');

fetch('../../backend/api/profile.php', {
    method: 'GET',
})
.then(res => res.json())
.then(data => {
    username.innerText = `Потребителско име: ${data.message[0]}`;
    email.innerText = `Имейл: ${data.message[1]}`;
    birthday.innerText = `Рожден ден: ${data.message[2]}`;
    nameday.innerText = `Имен ден: ${data.message[3]}`;
})