// let validDay = document.getElementById("validDay")
// for(let i = 1; i <= 31; i++){
//     validDay.innerHTML += `<option value="${i}">${i}</option>`
// }
// function registerEvent(){
//     fetch("http://localhost:3000/event/register");
// }

// registerEvent()
var totalEquipaments = 0;
var totalBuffet = 0;
var totalWorkers = 0;

function warning(){
    const myModal = new bootstrap.Modal('#warning', {
        keyboard: false
    })

    const modalToggle = document.getElementById('warning'); 

    myModal.show(modalToggle);

}

function cancel(){
    localStorage.removeItem("userEvent");

    window.location.href = "http://localhost:3000/"
}

function loadTotal(){
    const userEvent = JSON.parse(localStorage.getItem("userEvent"));

    loadPlace(userEvent.place);

    loadEquipaments(userEvent.equipaments);

    loadBuffet(userEvent.buffet);

    loadWorkers(userEvent.workes);

    loadTotalValue();
}

function loadPlace(place){
    let buttonPlace = document.getElementById("btn-place");

    if(!place.mySpace){
        //fazer requisição para adquirir informações sobre este local
        buttonPlace.removeAttribute("disabled")

    }
    else{
        

        buttonPlace.setAttribute("class", "accordion-button collapsed disabled");
    }
}

function loadEquipaments(equipaments){
    if(equipaments.length > 0){
        console.log("hello")
        //somar o valor total de todos os equipamentos
        let content = document.getElementById("equipament-body");

        let i = 1;
        
        equipaments.forEach((item) =>{
            content.innerHTML +=
            `
            <tr>
                <th scope="row">${i}</th>
                <td>${item.equipament}</td>
                <td>R$ ${item.price.toFixed(2)}</td>
            </tr>
            `
            totalEquipaments += item.price
            i++;
        })

        content.innerHTML += 
        `
        <tr>
            <th scope="row">#</th>
            <td>Valor Total</td>
            <td>R$ ${totalEquipaments.toFixed(2)}</td>
        </tr>
        `
        
    }
    else{
        console.log("fail")
    }
}

function loadBuffet(buffet){
    let content = document.getElementById("buffet-body");

    
    if(buffet != ""){
        //calcular o total a ser pago de todos os itens selecionados no buffet
        let i = 1;
        console.log(buffet)
        
        buffet.cart.forEach((item) =>{
            content.innerHTML +=
            `
            <tr>
                <th scope="row">${i}</th>
                <td>${item.name}</td>
                <td>R$ ${item.totalValue.toFixed(2)}</td>
            </tr>
            `
            totalBuffet += item.totalValue;
            i++;
        })

        content.innerHTML += 
        `
        <tr>
            <th scope="row">#</th>
            <td>Valor Total</td>
            <td>R$ ${totalBuffet.toFixed(2)}</td>
        </tr>
        `
    }
    else{

    }
}

function loadWorkers(workers){
    let content = document.getElementById("workers-body");

    if(workers != ""){
        //calculat o total a ser pago para todos os trabalhadores
        //deve ser analisado a quantidade de pessoas no evento e o área total do local para calcular o salário de cada funcionario
        console.log(workers);
        const userEvent = JSON.parse(localStorage.getItem("userEvent"));

        
        let i = 1;
        workers.forEach((item) =>{
            const salary = getSalary(item);
            // console.log(userEvent.workes)
            userEvent.workes[i-1].workerData.salary = salary;

            content.innerHTML += 
            `
            <tr>
                <th scope="row">${i}</th>
                <td>${item.workerData.functionType}</td>
                <td>R$ ${salary.toFixed(2)}</td>
            </tr>
            `
            totalWorkers += salary;
            i++;
        });

        localStorage.setItem("userEvent", JSON.stringify(userEvent));
        content.innerHTML += 
        `
        <tr>
            <th scope="row">#</th>
            <td>Valor Total</td>
            <td>R$ ${totalWorkers.toFixed(2)}</td>
        </tr>
        `
    }
    else{
        console.log("fail work")
    }
}

function getSalary(worker){
    const userEvent = JSON.parse(localStorage.getItem("userEvent"));

    return userEvent.peopleQtd * 30;
}

function loadTotalValue(){
    const userEvent = JSON.parse(localStorage.getItem("userEvent"));

    let totalValue = document.getElementById("totalValue");
    const total = totalBuffet + totalEquipaments + totalWorkers;

    userEvent.totalValue = total;

    localStorage.setItem("userEvent", JSON.stringify(userEvent));

    totalValue.textContent = `R$ ${total.toFixed(2)}`;
}


loadTotal();


function registerEvent(){
    const userEvent = JSON.parse(localStorage.getItem("userEvent"));

    const cardData = {
        userId: JSON.parse(localStorage.getItem("userEvent")).idUser,
        cardHolder: document.getElementById("inputName").value,
        cardNumber: document.getElementById("cardNumber").value,
        validDate: `${document.getElementById("validDay").value}/${document.getElementById("validMonth").value}/${document.getElementById("validYear").value}`,
        ccv: parseInt(document.getElementById("ccv").value)
    }

    userEvent.paymentMethod = cardData;
    userEvent.equipamentPrice = totalEquipaments;
    console.log(userEvent);

    const options = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(userEvent)
    }

    fetch("http://localhost:3000/event/register", options).then(res=>{
        return res.json();
    }).then((resp) =>{
        console.log(resp.result)
    })

    window.location.href = "http://localhost:3000/"

   // console.log(userEvent);
}