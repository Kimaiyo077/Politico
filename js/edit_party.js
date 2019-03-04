document.getElementById('editParty').addEventListener('submit', editParty)

function editParty(event){
    event.preventDefault();

    let name = document.getElementById('partyName').value;
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('partyId');

    let partyData = {
        'name' : name
    }

    fetch('http://127.0.0.1:5000/api/v2/parties/' + id +'/name',{
        method : 'PATCH',
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
            if (data.status == 200){
                window.setTimeout(() => window.location.replace('admin_parties.html'), 1200);
            }else{
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }
        })

        .catch((error) => console.log(error))

}