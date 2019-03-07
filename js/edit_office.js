document.getElementById('editOffice').addEventListener('submit', editOffice)

function editOffice(event){
    event.preventDefault();

    let name = document.getElementById('officeName').value;
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('officeId');

    let officeData = {
        'name' : name
    }

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/offices/' + id,{
        method : 'PATCH',
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
            if (data.status == 200){
                window.setTimeout(() => window.location.replace('admin_offices.html'), 1200);
            }else{
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }
        })

        .catch((error) => console.log(error))

}