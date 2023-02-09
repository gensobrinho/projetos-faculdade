const selectedWorker = [];
let allWorkers;

const tokenLocal = localStorage.getItem("session-token");
const token = {token: tokenLocal};

if(token.token != undefined || token.token != null){
    fetch("http://localhost:3000/user/session", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(token)
    }).then((res) =>{
        return res.json();
    }).then((result) =>{

        let username = document.getElementById("username");

        username.textContent = `Olá, ${result.name}`;

    });
}

function load(){
    fetch("http://localhost:3000/worker/all").then((res) =>{return res.json()}).then((data)=>{
        console.log(data);

        let workesDiv = document.getElementById("avaiable-workes");
        workesDiv.textContent = "";

        data.forEach((worker) =>{ //{personData} | {workerData}
            console.log(worker);
            workesDiv.innerHTML +=
            `
            <div class="card mt-3" style="width: 15rem; height: 20rem;">
                <div class="card-img-top bg-secondary d-flex justify-content-center align-items-center" style="height: 10rem;">
                    <img src="./images/trabalhador.png" class="image-home img" width="64"  alt="...">
                </div>
                
                <div class="card-body">
                    <span style="font-size: 0.75em;">${worker.workerData.functionType}</span>
                    <p class="card-title worker-name h5 pb-1">${worker.personData.name}</p>
                    <p class="card-text">${worker.personData.district}, ${worker.personData.city}</p>
                    <div class="d-flex gap-3">
                        <a href="#" class="btn btn-outline-secondary w-50" onclick="openResume('${worker.workerData.id}')">Currículo</a>
                        <a href="#" class="btn btn-red w-50" onclick="select('${worker.workerData.id}')">Selecionar</a>
                    </div>
                </div>
            </div>
            `
        })

        getData(data);
    })
}

load();

function loadSelected(){
    let selectedDiv = document.getElementById("selected-workes");
    selectedDiv.textContent = "";

    selectedWorker.forEach((worker) =>{
        selectedDiv.innerHTML += 
        `
        <div class="rounded w-100 d-flex gap-3 border shadow-sm" style="min-height: 5em;">
            <div class="bg-secondary rounded d-flex justify-content-center align-items-center" style="width: 20%;">
                <img src="./images/trabalhador.png" class="image-rounded image-fluid" width="64">
            </div>
            <div class="" style="width: 60%;">
                <p class="mb-0 mt-1 fw-semibold worker-name">${worker.personData.name}</p>
                <p class="mb-1" style="font-size: 0.75em;">${worker.workerData.functionType}</p>
                <p class="mb-0">${worker.personData.district}, ${worker.personData.city}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center" style="width: 10%;">
                <button type="button" class="btn-close" aria-label="Close" onclick="remove('${worker.workerData.id}')"></button>
            </div>
        </div>
        `
    })
}

function getData(data){
    allWorkers = data;
}

function select(id){

    let valid = true;

    selectedWorker.forEach((element) =>{
        if(element.workerData.id == id)
            valid = false
    })

    if(valid){
        allWorkers.forEach((worker)=>{
            if(worker.workerData.id == id){
                selectedWorker.push(worker);
            }
        })
    }
    else{
        alert("Este trabalhador já foi selecionado.");
    }


    loadSelected();
}

function openResume(id){
    let modalDiv = document.getElementById("resume");

    allWorkers.forEach((worker) =>{
        if(worker.workerData.id == id){
            modalDiv.innerHTML = 
            `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Currículo (${worker.personData.name})</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Espaço para o arquivo PDF do currículo
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                    </div>
                </div>
            </div>
            `
        }
    })

    const myModal = new bootstrap.Modal('#resume', {
        keyboard: false
    })

    const modalToggle = document.getElementById('resume'); 

    myModal.show(modalToggle);
}

function remove(id){

    for(i = 0; i < selectedWorker.length; i++){
        if(selectedWorker[i].workerData.id == id){
            selectedWorker.splice(i, 1);
        }
    }


    loadSelected();
}

function noWorker(){
    window.location.href = "http://localhost:3000/registerEvent/payment"
}


function progress(){
    if(selectedWorker.length != 0){

        const event = JSON.parse(localStorage.getItem("userEvent"));

        event.workes = selectedWorker;

        localStorage.setItem("userEvent", JSON.stringify(event));

        window.location.href = "http://localhost:3000/registerEvent/payment"
    }
    else{
        alert("Pelo menos um trabalhador deve ser selecionado");
    }
}