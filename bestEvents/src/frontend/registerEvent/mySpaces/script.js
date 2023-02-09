const tokenLocal = localStorage.getItem("session-token");
const token = {token: tokenLocal};

if(token.token != undefined || token.token != null){
    fetch("http://localhost:3000/user/profile", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(token)
    }).then((res) =>{
        return res.json();
    }).then((result) =>{
        console.log(result)

        const user = result.userData[0];
        const userPlaces = result.placesFromUser;

        let username = document.getElementById("username");

        username.textContent = `Olá, ${user.nome}`;


        let placeDiv = document.getElementById("form");
        let alertEmpaty = document.getElementById("alert-empaty");

        if(userPlaces.length != 0){
        
            alertEmpaty.setAttribute("class", "d-none");

            userPlaces.forEach((place) =>{
                let date = new Date(place.createdAt);
                placeDiv.innerHTML += 
                `
                <div class="card place mx-2 my-3" style="width: 18rem;" onclick="select('${place.id}')">
                    <div class="card-img-top bg-secondary d-flex justify-content-center align-items-center" style="height: 10rem;">
                        <img src="./images/botao-home.png" class="image-home" width="64"  alt="...">
                    </div>
                    
                    <div class="card-body">
                        <span style="font-size: 0.75em;">${place.type}</span>
                        <h5 class="card-title">${place.name}</h5>
                        <p class="card-text">${place.district}, ${place.city}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Cadastrado em: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</small>
                    </div>
                </div>
                `

            })
        }


    });
}


function select(id){
    const userEvent = JSON.parse(localStorage.getItem("userEvent"));

    userEvent.place = {id: id, mySpace: true};

    localStorage.setItem("userEvent", JSON.stringify(userEvent));

    window.location.href = "http://localhost:3000/registerEvent/equipamentSelection";
}

