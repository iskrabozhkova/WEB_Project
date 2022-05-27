const login = (data) => {
    return fetch('../../backend/api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
       const successEl = document.getElementById('success-message');
       successEl.innerText = `${data.message}`
       location.replace('../users/profile.html');
    })
    .catch(err => {
        const errorEl = document.getElementById('error-message');
        errorEl.innerText = err.message;
    })
}

(() => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
        const errMsgEL = document.getElementById('error-message');
        errMsgEL.innerText = null;

        const successMsgEL = document.getElementById('success-message');
        successMsgEL.innerText = null;
       
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        login({email, password});
        event.preventDefault();
    });
})();