window.addEventListener('load', getAllOffices)

function getAllOffices(){
    let token = localStorage.getItem('token')

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/offices', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token       
        },  
    })

    .then((res) => {
        return res.json()
    })

    .then((data) => {
        statusCode = data.status
        let offices =  data.data;

        
        if (statusCode == 200){
            offices.forEach(office => {
                id = office.officeId
                name = office.officeName
                type = office.officeType

                let output = `
                    <li>
                        <h2><span>Office: </span>${name}</h2>
                        <h2><span>Type: </span>${type}</h2>
                        <i class="fas fa-vote-yea fa-10x"></i>
                        <button type="button" name="${name}" id="${id}" onclick="otherId(this.id)"><i class="fas fa-list-ul"></i> List Candidates</button>
                        <button type="button" name="${name}" id="${id}" onclick="vote(this.id)"><i class="fas fa-vote-yea"></i> Cast Vote</button>
                        <button type="button" name="${name}" id="${id}" onclick="polls(this.id)"><i class="fas fa-poll"></i> Office Polls</button>
                    </li>
                `;
                document.getElementById('content').innerHTML += output;
            });
            
        }

        if (statusCode == 401){
            console.log(data.error)
            confirm(data.error)
        }

        if (statusCode == 404){
            document.getElementById("message").style.backgroundColor = 'red';
            document.getElementById("message").style.color = 'white';
            document.getElementById("message").innerHTML = data.error;
        }

    })

    .catch((error) => console.log(error))
}