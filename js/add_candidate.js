document.getElementById('candidate').addEventListener('submit', addCandidate)

function addCandidate(event){
    event.preventDefault();

    let userId = document.getElementById('userid').value;
    let partyId = document.getElementById('partyid').value;
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('officeIds');

    let candidate = {
        'user_id' : userId,
        'party_id' : partyId
    }

    fetch('http://127.0.0.1:5000/api/v2/offices/' + id +'/register',{
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body : JSON.stringify(candidate)
    })

        .then((res) => {
            return res.json()
        })

        .then((data) => {
            if (data.status == 201){
                window.setTimeout(() => window.location.replace('candidates.html'), 1200);
            }else{
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = data.error;
            }
        })

        .catch((error) => console.log(error))

}