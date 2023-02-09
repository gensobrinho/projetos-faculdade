let tokenLocal = localStorage.getItem("session-token");
const token = {token: tokenLocal};

// if(token.token == undefined || token.token == null){
//     alert("Parece que sua sessão expirou, faça login novamente");
//     window.location.href = 'http://localhost:3000/login';
// }



fetch("http://localhost:3000/place/all").then((res) =>{
    return res.json();
}).then((places) =>{

    //load every places
    let placeDiv = document.getElementById("placesArea");

    if(places.length > 0){
        places.forEach((place) => {
            console.log(place)
            placeDiv.innerHTML += 
            `
            <div class="d-flex align-items-center gap-4 p-3 item mb-3" onclick="select('${place.id}')">
                <div class="rounded position-relative dark3 place d-flex justify-content-center align-items-center">
                    <img src="./images/botao-home.png" class="img-fluid image">
                </div>
                <div>
                    <b id="localName" class="" style="font-size: 1.5em;">${place.nome}</b>
                    <p class="mb-0"><b>Localização: </b>${place.rua} ${place.numEndereco}, ${place.bairro}, ${place.estado}</p>
                    <p class="mb-0"><b>Valor: </b>R$ ${place.valor}</p>
                </div>
            </div>
            `
            
        });
        
    }
    else{
        placeDiv.innerHTML = "<div class='d-flex justify-content-center align-items-center' style='width: 100%; height: 100%;'><p class='text-secondary'>NENHUM LOCAL DISPONÍVEL</p></div>"
    }

});


function cancel(){
    window.location.href = "http://localhost:3000/registration/spaceChoose"
}


function select(idPlace){
    let event = JSON.parse(localStorage.getItem("userEvent"));
    
    event.place = {id: idPlace, mySpace: false};

    localStorage.setItem("userEvent", JSON.stringify(event));

    window.location.href = "http://localhost:3000/registration/equipamentSelection"
}