window.addEventListener('load', getAllParties)

function getAllParties(){
    let token = localStorage.getItem('token')

    fetch('http://127.0.0.1:5000/api/v2/parties', {
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
        let parties =  data.data;

        
        if (statusCode == 200){
            parties.forEach(party => {
                id = party.partyId
                name = party.partyName
                hqAddress = party.hqAddress
                logoUrl = party.logoUrl

                let output = `
                    <li>
                        <h2>${name}</h2>
                        <h3>${id}</h3>
                        <img src="${logoUrl}" alt="party image">
                        <h4>Hq Address</h4>
                        <h3>${hqAddress}<h3>
                        <button type="button" name="${id}" id="${id}" onclick="setId(this.id)"><i class="far fa-edit"></i></button>
                        <button type="button" name="${id}" id="${id}" onclick="deleteParty(this.id)"><i class="fas fa-trash"></i></button>
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