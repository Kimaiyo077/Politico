document.getElementById('newParty').addEventListener('submit', createParty)

function createParty(event){
    event.preventDefault();

    let name = document.getElementById('partyName').value;
    let hqAddress = document.getElementById('hqAddress').value;
    let logoUrl = document.getElementById('logoUrl').value;
    let token = localStorage.getItem('token');

    let partyData = {
        'name' : name,
        'hqAddress': hqAddress,
        'logoUrl': logoUrl,
    }

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/parties',{
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body : JSON.stringify(partyData)
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