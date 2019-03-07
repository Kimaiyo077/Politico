window.addEventListener('load', getAllParties)

function getAllParties(){
    let token = localStorage.getItem('token')

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/parties', {
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
                        <button type="button" name="${id}" id="${id}" onclick="setId(this.id)"><i class="far fa-edit"></i> Edit Party</button>
                        <button type="button" name="${id}" id="${id}" onclick="deleteParty(this.id)"><i class="fas fa-trash"> Delete Party</i></button>
                    </li>
                `;
                document.getElementById('content').innerHTML += output;
            });
            
        }

        if (statusCode == 401){
            console.log(data.error)
            confirm(data.error)
            window.location.replace('sign_in.html')
        }

        if (statusCode == 404){
            document.getElementById("message").style.color = 'red';
            document.getElementById("message").innerHTML = data.error;
        }

    })

    .catch((error) => console.log(error))
}