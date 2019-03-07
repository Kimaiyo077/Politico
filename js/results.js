window.addEventListener('load', getVotes)

function getVotes(){
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('otherId')

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/offices/' + id + '/results', {
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
        let votes =  data.data;

        
        if (statusCode == 200){
            if (length.data < 1){
                document.location.replace('offices.html')
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = "No votes are cast for the office";
            }else{
                votes.forEach(vote => {
                    let candidate = vote.candidate;
                    let office = vote.office;
                    let result = vote.result;

                    let output = `
                        <li>
                            <h2><span>Office: </span>${office}</h2>
                            <i class="fas fa-vote-yea fa-10x"></i>
                            <h3><span>Candidate: </span>${candidate}</h3>
                            <div>
                                <h5><span>Votes: </span>${result}</h5>
                            </div>
                        </li>
                    `;
                    document.getElementById('content').innerHTML += output;
                });
            }
            
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



