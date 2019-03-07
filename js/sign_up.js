document.getElementById('signup').addEventListener('submit', signUp)

function signUp(event){
    event.preventDefault();

    let id = document.getElementById('id').value;
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let otherName = document.getElementById('other-name').value;
    let number = document.getElementById('number').value;
    let email = document.getElementById('email').value;
    let passportUrl = document.getElementById('passport-url').value;
    let password = document.getElementById('password').value;
    let verifyPassword = document.getElementById('verify-password').value;


    let userData = {
        'nationalId' : id,
        'firstname': firstName,
        'lastname': lastName,
        'othername': otherName,
        'email': email,
        'phoneNumber' : number,
        'passportUrl' : passportUrl,
        'password': password,
        }


    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/auth/signup',{
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

            if (statusCode == 201){
                token = data.token
                userId = data.User.userId
                email = userData.email
                name = userData.firstname + ' ' + userData.lastname
                passportUrl = userData.passportUrl
                nationalId = userData.nationalId
                localStorage.setItem('token', token)
                localStorage.setItem('email', email)
                localStorage.setItem('name', name)
                localStorage.setItem('nationalId', nationalId)
                localStorage.setItem('userId', userId)
                localStorage.setItem('passportUrl', passportUrl)
                window.setTimeout(() => window.location.replace('dashboard.html'), 1200);
            }
            if (statusCode == 400){
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }

            if (statusCode == 409){
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }
        })
        .catch((err) => console.log(err))
}