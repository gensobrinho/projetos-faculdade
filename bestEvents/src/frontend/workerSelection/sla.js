//pegar os dados dos trabalhadores cadastrados no banco de dados
let availableWorkers = [];

let selectedWorkers = [];

function filter(element){
    //pegar os dados dos trabalhadores que possuem a função definida no argumento da funçao a atribuir ao vetor de trabalhadores disponíveis

    //availableWorkers = todos funcionarios do tipo 'element'
    
    loadAvailableWorkers();
}

function loadAvailableWorkers(){
    
    let listWork = document.getElementById("listWorkSelected");

    availableWorkers.forEach((worker) => {
        listWork.innerHTML += 
            `<div id="work-${worker.id}" class="p-3 bg-red d-flex justify-content-between rounded mb-3">
                <div class="d-flex gap-3">
                    <div class="dark3 rounded" style="width: 48px; height: 48px;">
                        <!-- imagem de perfil do user -->
                    </div>
                    <div>
                        <b id="work-${worker.id}-name" class="mb-0 text-light">${worker.name}</b>
                        <div class="d-flex justify-content-between gap-4">
                            <p id="work-${worker.id}-age" class="mb-0 text-light">Idade: ${worker.age}</p>
                            <p id="work-${worker.id}-value" class="mb-0 text-light">Valor/h: R$${worker.value}</p>
                        </div>
                    </div>
                </div>
                <button class="btn btn-light" onclick="addWorker(${worker.id})">ADICIONAR</button>
            </div>`
    })

    
}

function loadSelectedWorkers(){
    let listWorkSelected =  document.getElementById("listWorkSelected");

    selectedWorkers.forEach((worker) =>{
        listWorkSelected.innerHTML +=
            `<div id="selected-work-${worker.id}" class="bg-light rounded d-flex justify-content-between p-3 mt-3">
                <b class="mb-0">Nome do trabalhador</b>
                <button type="button" class="btn-close" aria-label="Close" onclick="removeWorker($${worker.id})"></button>
            </div>`
    })
}

function addWorker(id){
    let aux = 0
    availableWorkers.forEach((item) => {
        if(item.id == id){
            selectedWorkers.push(item);
            availableWorkers.slice(aux); //remover o funcionario selecionado do vetor de funcionarios disponiveis
        }
        aux++;
    })

    loadAvailableWorkers();
    loadSelectedWorkers();
}

function removeWorker(id){
    let aux = 0;
    selectedWorkers.forEach((item) =>{
        if(item.id == id){
            availableWorkers.push(item);
            selectedWorkers.slice(aux); //remover o funcionario que foi removido do vetor de funcionarios selecionados
        }
        aux++;
    })

    loadAvailableWorkers();
    loadSelectedWorkers();
}








function load(){
    fetch("http://localhost:3000/worker/all").then((res)=>{
        return res.json();
    }).then((workers) =>{
        if(workers.length > 0){
            let listWork = document.getElementById("listWork");
            listWork.innerHTML = "";

            workers.forEach((worker)=>{
                listWork.innerHTML += 
                `
                <div id="work-${worker.id}" class="p-3 bg-red d-flex justify-content-between rounded mb-3">
                    <div class="d-flex gap-3">
                        <div class="dark3 rounded" style="width: 48px; height: 48px;">
                            <!-- -- imagem de perfil do user -- -->
                        </div>
                        <div>
                            <b id="work-0-name" class="mb-0 text-light">${worker.name} (${worker.functionType})</b>
                            <div class="d-flex justify-content-between gap-4">
                                <p id="work-0-age" class="mb-0 text-light">Idade: 99</p>
                                <p id="work-0-value" class="mb-0 text-light">Valor/h: R$999</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-light" onclick="addWorker('${worker.id}')">ADICIONAR</button>
                </div>
                `
            })
        }
    })
}