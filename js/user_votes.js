window.addEventListener('load', getUserVotes)

function getUserVotes(){
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')

    fetch('https://isaac-politico-api-heroku.herokuapp.com/api/v2/votes/' + userId, {
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
                document.getElementById("message").style.backgroundColor = 'red';
                document.getElementById("message").style.color = 'white';
                document.getElementById("message").innerHTML = "No votes are cast for the office";
            }else{
                votes.forEach(vote => {
                    let candidate = vote.candidate;
                    let office = vote.office;
                    let createdOn = vote.createdOn;

                    let output = `
                        <li>
                            <h2><span>Office: </span>${office}</h2>
                            <i class="fas fa-vote-yea fa-10x"></i>
                            <h3>You Voted For.....</h3>
                            <div>
                                <h5>${candidate}</h5>
                            </div>
                            <h3> On: ${createdOn}</h3>
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