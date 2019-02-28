document.getElementById('signin').addEventListener('submit', signIn)

function signUp(event){
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    let userData = {
        'email': email,
        'password': password,
        }


    fetch('http://127.0.0.1:5000/api/v2/auth/login',{
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/json'
        },
        body : JSON.stringify(userData)
    })

        .then((res) => {
            return res.json()
        })

        .then((data) => {
            statusCode = data.status

            if (statusCode == 200){
                token = data.token
                email = userData.email
                name = data.data.firstname + ' ' + data.data.lastname
                id = data.data.nationalId
                localStorage.setItem('token', token)
                localStorage.setItem('email', email)
                localStorage.setItem('name', name)
                localStorage.setItem('id', id)
                window.setTimeout(() => window.location.replace('dashboard.html'), 1200);
            }
            if (statusCode == 400){
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }

            if (statusCode == 401){
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }
        })
        .catch((err) => console.log(err))
}