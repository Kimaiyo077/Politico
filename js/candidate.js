window.addEventListener('load', listCandidates)

function listCandidates(){
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('otherId')

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/offices/' + id + '/candidates', {
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
        let candidates =  data.data;

        
        if (statusCode == 200){
            candidates.forEach(candidate => {
                id = candidate.candidateId
                name = candidate['candidate Name']
                party = candidate.Party
                office = candidate['office Name']

                let output = `
                    <li>
                        <i class="fas fa-user fa-10x"></i>
                        <p><span>Name: </span>${name}</p>
                        <p><span>Party Name:</span>${party}</p>
                        <p><span>Running for: </span>${office}</p>
                        <button type="button" name="${name}" id="${id}" onclick="castVote(this.id)">Vote</button>
                        <hr>
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