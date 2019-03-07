document.getElementById('signin').addEventListener('submit', signIn)

function signIn(event){
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    let userData = {
        'email': email,
        'password': password,
        }


    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/auth/login',{
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
                console.log(data)
                token = data.token
                email = userData.email
                name = data.User.firstname + ' ' + data.User.lastname
                nationalId = data.User.nationalId
                userId = data.User.userId
                passportUrl = data.User.passportUrl
                localStorage.setItem('token', token)
                localStorage.setItem('email', email)
                localStorage.setItem('name', name)
                localStorage.setItem('nationalId', nationalId)
                localStorage.setItem('userId', userId)
                localStorage.setItem('passportUrl', passportUrl)

                if (email == 'admin@admin.com'){
                    window.setTimeout(() => window.location.replace('admin_dashboard.html'), 1200);
                }else{
                    window.setTimeout(() => window.location.replace('dashboard.html'), 1200);
                }
            }
            else{
                confirm(data.error)
            }
        })
        .catch((err) => console.log('Politico says ' + err))
}