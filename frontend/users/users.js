const usersSection=document.getElementById('users');

const getUsers = () => {
    return fetch('../../backend/api/users.php', {
        method: 'GET',
    }).then(res => res.json())
    .then(data => {
        data.map((user,idx) => {
            const userUl=document.createElement('ul');
            usersSection.appendChild(userUl);
           
            const liElName = document.createElement('li');
            userUl.appendChild(liElName);
            liElName.innerText = "Потребителско име:" + ' ' + data[idx].username;
            userUl.classList.add("userUl");

            const liElBirthday = document.createElement('li');
            userUl.appendChild(liElBirthday);
            liElBirthday.innerText = "Рожден ден: " + ' ' + data[idx].birthday;

            const liElNameday = document.createElement('li');
            userUl.appendChild(liElNameday);
            liElNameday.innerText = "Имен ден: " + ' ' + data[idx].nameday;

            const buttonFavourites = document.createElement('button');
            userUl.appendChild(buttonFavourites);
            buttonFavourites.innerText="Добави към любими";
            buttonFavourites.classList.add("button-favs");
            buttonFavourites.setAttribute("data-add-to-favourite", "`${data[idx].id}`")
            //buttonFavourites.id=`user-${data[idx].id}`
        })

    });
}
getUsers();

// const  buttons = document.getElementsByClassName('button-favs');
// console.log(buttons);
// for(let i = 0; i < buttons.length; i++){
//     let current_button = buttons[i];
//     current_button.addEventListener('click', function(event){
//         let buttonClicked = event.target;
//         console.log(buttonClicked)
//     })
// }


//console.log(buttons)
// var i = 0, length = buttons.length;

// for (i; i < length; i++) {
//     console.log('b')
//     if (document.addEventListener) {
//         buttons[i].addEventListener("click", function(e) {
            
//             console.log(e.target)
//         });
//     }

// };
//console.log(buttons.data)
// Array.from(buttons).map(btn => btn.addEventListener('click', function(e){
//     console.log('pink')
//     //const but = e.target;
//     //console.log(but);
// }))
let  buttons = document.getElementsByClassName('button-favs');
console.log(buttons);
//Array.from(buttons).map(btn => console.log("btn"))
    for(let i = 0; i < buttons.length; i++){
        console.log(buttons[i]);
        buttons[i].addEventListener("click", (e) => {
            e.preventDefault();
            const user_id = buttons[i].getAttribute('data-add-to-favourite');
            console.log(user_id);
        })
    }