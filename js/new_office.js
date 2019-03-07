document.getElementById('newOffice').addEventListener('submit', createOffice)

function createOffice(event){
    event.preventDefault();

    let name = document.getElementById('officeName').value;
    let type = document.getElementById('officeType').value;
    let token = localStorage.getItem('token');

    let officeData = {
        'name' : name,
        'type' : type
    }

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/offices',{
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body : JSON.stringify(officeData)
    })

        .then((res) => {
            return res.json()
        })

        .then((data) => {
            if (data.status == 201){
                window.setTimeout(() => window.location.replace('admin_parties.html'), 1200);
            }else{
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }
        })

        .catch((error) => console.log(error))

}