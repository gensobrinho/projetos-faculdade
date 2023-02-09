let cart = [];
let menu = [];

function load(){
    const company = JSON.parse(localStorage.getItem("company"));

    const options = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(company)
    }


    fetch("http://localhost:3000/buffet/company", options).then((res) => {return res.json()}).then((data) =>{
        // console.log(data);

        let companyName = document.getElementById("companyName");
        companyName.textContent = data[0].name
    })


    fetch("http://localhost:3000/buffet/menu", options).then((res) => {return res.json()}).then((data) =>{
        // console.log(data);

        let menuDiv = document.getElementById("menu-options");
        menuDiv.textContent = "";

        let i = 0;

        data.forEach((item) =>{
            menuDiv.innerHTML += 
            `
            <div class="border rounded d-flex gap-2 w-50 item" onclick="select('${item.id}')">
                <div class="bg-secondary rounded d-flex justify-content-center align-items-center" style="min-width: 9em;">
                    <img src="./image/food.png" width="64" class="img">
                </div>
                <div class="pt-2">
                    <p class="h5">${item.item}</p>
                    <p class="mb-0" style="font-size: .8em; max-height: 4.5em; min-height: 4em; overflow: auto;">${item.description}</p>
                    <p class="mt-2">R$ ${item.unityValue.toFixed(2)}</p>
                </div>
            </div>
            `
            i++;
            
        })

        getMenu(data);
    })
}

load();

function getMenu(content){
    menu = content;
}

function select(id){

    let modalDiv = document.getElementById("modal");

    menu.forEach((item) =>{
        if(item.id == id){
            modalDiv.innerHTML = 
            `
            <div class="modal fade" id="options"  tabindex="-1" aria-labelledby="#menuTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header justify-content-between">
                            <h1 class="modal-title fs-5 text-red" id="menuTitle">Detalhes do Produto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex flex-column mt-3">
                            <p id="item-name" class="h5">${item.item}</p>
                            <p>${item.description}</p>
                            <p>R$ <span id="unity-value">${item.unityValue}</span></p>
                            <div class="form-floating">
                                <textarea id="obs-${item.id}" class="form-control" placeholder="Alguma observação?"></textarea>
                                <label for="obs-${item.id}">Alguma observação?</label>
                            </div>
                            <div class="d-flex justify-content-center gap-4 my-3">
                                <input id="qtt-${item.id}" type="number" class="form-control w-50" value="1" min="1" onchange="attValue(${item.unityValue}, this.value)">
                                <a id="add-item" href="#" class="btn btn-red d-flex justify-content-between w-50" style="" onclick="addItem('${item.id}', ${item.unityValue})" data-bs-dismiss="modal" aria-label="Close">
                                    <p class="mb-0">Adicionar</p>
                                    <p id="total-value" class="mb-0">R$ ${item.unityValue}</p>
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    })

    const myModal = new bootstrap.Modal('#options', {
        keyboard: false
    })

    const modalToggle = document.getElementById('options'); 

    myModal.show(modalToggle);

}

function addItem(id, value){
    let valid = true;

    cart.forEach((element) =>{
        if(element.menuId == id)
            valid = false
    })

    if(valid){
        let qtt = document.getElementById(`qtt-${id}`).value;
        let itemName = document.getElementById("item-name").textContent;
        let total = qtt * value;
        console.log(total);
    
        const item = {
            id: "",
            menuId: id,
            quantity: qtt,
            totalValue: total,
            eventId: "",
            name: itemName,
        }
    
        cart.push(item);
        loadCart();
    }
    else{
        update(id);
    }

   

}

function attValue(value, qtt){
    let price = document.getElementById("total-value");
    let total = value * qtt;

    price.textContent = `R$ ${total}`;
}

function loadCart(){
    let cartDiv = document.getElementById("cart-itens");
    cartDiv.innerHTML = "";

    cart.forEach((item) =>{
        cartDiv.innerHTML += 
        `
        <div class="bg-light rounded p-2 my-2">
            <div class="d-flex justify-content-between">
                <p class="mb-0"><b>${item.quantity}x </b>${item.name}</p>
                <p class="fw-semibold mb-0">R$${item.totalValue.toFixed(2)}</p>
            </div>
            <div class="d-flex gap-3">
                <a href="#" class="link-danger" style="text-decoration: none;" onclick="edit('${item.menuId}')">Editar</a>
                <a href="#" class="link-secondary" style="text-decoration: none;" onclick="remove('${item.menuId}')">Excluir</a>
            </div>
        </div>
        `
    })
}


function progress(){
    

    if(cart.length != 0){
        

        const event = JSON.parse(localStorage.getItem("userEvent"));

        event.buffet = {cart: cart, company: JSON.parse(localStorage.getItem("company")).companyId};

        localStorage.setItem("userEvent", JSON.stringify(event));
        localStorage.removeItem("company");

        window.location.href = "http://localhost:3000/work/workerSelection"
    }
    else{
        alert("Pelo menos um item deve ser selecionado");
    }

    

}

function back(){
    //localStorage.removeItem("company");

    window.location.href = "http://localhost:3000/registerEvent/company"
}

function edit(id){
    select(id);

    document.getElementById("add-item").setAttribute("onclick", `update('${id}')`);
}

function update(id){
    console.log("entrou update")

    let qtt = document.getElementById(`qtt-${id}`).value;
    let value = parseFloat(document.getElementById("unity-value").textContent);
    let itemName = document.getElementById("item-name").textContent;
    let total = qtt * value;
    console.log(total);

    const item = {
        id: "",
        menuId: id,
        quantity: qtt,
        totalValue: total,
        eventId: "",
        name: itemName,
    }

    for(i = 0; i < cart.length; i++){
        if(cart[i].menuId == id){
            cart[i] = item
        }
    }

    loadCart();
}

function remove(id){

    for(i = 0; i < cart.length; i++){
        if(cart[i].menuId == id){
            cart.splice(i, 1);
        }
    }


    loadCart();
}