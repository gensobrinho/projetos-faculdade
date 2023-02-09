const tokenLocal = localStorage.getItem("session-token");
const token = {token: tokenLocal};


function landpage(){
    window.location.href = "http://localhost:3000/"
}

if(token.token == undefined || token.token == null){
    alert("Parece que sua sessão expirou, faça login novamente");
    window.location.href = 'http://localhost:3000/login';
}




fetch("http://localhost:3000/user/profile", {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(token)
}).then(res =>{
    return res.json();
}).then((result) =>{

    const userData = result.userData[0];
    const events = result.eventsFromUser;
    console.log(events);
    const places = result.placesFromUser;
    const works = result.worksFromUser;

    //console.log(places)


    document.getElementById("username").textContent = userData.nome;


    //load every eventos from user
    let eventsDiv = document.getElementById("myevent");

    if(events.length > 0){
        events.forEach((event) => {
            console.log(event)
            eventsDiv.innerHTML +=
            `<div class="d-flex align-items-center gap-4 container p-3 item mt-5 bg-light">
                <div class="rounded position-relative dark3 place d-flex justify-content-center align-items-center">
                    <img src="./image/botao-home.png" class="img-fluid image">
                </div>
                <div>
                    <b class="" style="font-size: 1.5em;">${event.type}</b>
                    <p class="">Quantidade de pessoas: ${event.peopleQuantity}</p>
                    <div class="d-flex gap-3">
                        <p class=""><b>Localização: </b>${event.road} ${event.address}, ${event.district}, ${event.state}</p>
                    </div>
                </div>
            </div>`;
        })
    }      
    
    eventsDiv.innerHTML +=
    `<div class="d-flex align-items-center gap-4 container p-3 mt-3 addNew">
        <div id="newEvent" class="rounded position-relative" onclick="window.location.href='http://localhost:3000/'">
            <div id="vertical" class="rounded position-absolute top-50 start-50 translate-middle"></div>
            <div id="horizont" class="rounded position-absolute top-50 start-50 translate-middle"></div>
        </div>
        <b class="text-light" style="font-size: 1.5em;">ADICIONAR NOVO EVENTO</b>
    </div>`;



    //load every places from user
    let localDiv = document.getElementById("myplace");


    

    if(places.length > 0){
        places.forEach((place) => {
            localDiv.innerHTML += 
            `<div class="d-flex align-items-center gap-4 container p-3 item mt-5 bg-light">
                <div class="rounded position-relative dark3 place d-flex justify-content-center align-items-center">
                    <img src="./image/botao-home.png" class="img-fluid image">
                </div>
                <div>
                    <b class="" style="font-size: 1.5em;">${place.name}</b>
                    <p class="">${place.type}</p>
                    <div class="d-flex gap-3">
                        <p class=""><b>Localização: </b>${place.road} ${place.address}, ${place.district}, ${place.state}</p>
                    </div>
                </div>
            </div>`;
        });
        
    }

    localDiv.innerHTML += 
    `<div class="d-flex align-items-center gap-4 container p-3 mt-3 addNew">
        <div id="newEvent" class="rounded position-relative " onclick="window.location.href='http://localhost:3000/registerPlace/stage1'">
            <div id="vertical" class="rounded position-absolute top-50 start-50 translate-middle"></div>
            <div id="horizont" class="rounded position-absolute top-50 start-50 translate-middle"></div>
        </div>
        <b class="text-light" style="font-size: 1.5em;">ADICIONAR NOVO LOCAL</b>
    </div>`;


    //load every work from user
    let workDiv = document.getElementById("mywork");

    if(works.length > 0){
        console.log("Adicionar funcionalidade de trabalhos");
    }

    workDiv.innerHTML += 
    `<div class="d-flex align-items-center gap-4 container p-3 mt-3 addNew">
        <div id="newEvent" class="rounded position-relative" onclick="window.location.href = 'http://localhost:3000/registration/registerWorker'">
            <div id="vertical" class="rounded position-absolute top-50 start-50 translate-middle"></div>
            <div id="horizont" class="rounded position-absolute top-50 start-50 translate-middle"></div>
        </div>
        <b class="text-light" style="font-size: 1.5em;">CADASTRAR COMO TRABALHADOR</b>
    </div>`;


});




function change(type){
    if(type == "event"){
        $(`#${type}`).attr("class", "btn btn-red btn-dark");
        $("#place").attr("class", "btn btn-red btn-dark unselected");
        $("#work").attr("class", "btn btn-red btn-dark unselected");

        $(`#my${type}`).attr("class", "d-block");
        $("#myplace").attr("class", "d-none");
        $("#mywork").attr("class", "d-none");
    }
    else if(type == "place"){
        $(`#${type}`).attr("class", "btn btn-red btn-dark");
        $("#event").attr("class", "btn btn-red btn-dark unselected");
        $("#work").attr("class", "btn btn-red btn-dark unselected");

        $(`#my${type}`).attr("class", "d-block");
        $("#myevent").attr("class", "d-none");
        $("#mywork").attr("class", "d-none");
    }
    else{
        $(`#${type}`).attr("class", "btn btn-red btn-dark");
        $("#event").attr("class", "btn btn-red btn-dark unselected");
        $("#place").attr("class", "btn btn-red btn-dark unselected");

        $(`#my${type}`).attr("class", "d-block");
        $("#myevent").attr("class", "d-none");
        $("#myplace").attr("class", "d-none");
    }
}

function logOut(){
    localStorage.removeItem("session-token");

    window.location.href = "http://localhost:3000";
}