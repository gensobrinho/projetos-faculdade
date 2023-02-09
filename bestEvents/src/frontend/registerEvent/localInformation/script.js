function validState(){
    let state = document.getElementById("state").value;
    if(state != ""){
        document.getElementById("state").setAttribute("class", "form-select border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Estado Inválido";
    }
}

function validCity(){
    let city = document.getElementById("city").value;
    if(city != ""){
        document.getElementById("city").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Cidade Inválida";
    }
}

function validDistrict(){
    let district = document.getElementById("district").value;
    if(district != ""){
        document.getElementById("district").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Bairro Inválido";
    }
}

function validRoad(){
    let road = document.getElementById("road").value;
    if(road != ""){
        document.getElementById("road").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Rua Inválido";
    }
}

function validAddress(){
    let address = document.getElementById("address").value;
    if(address != ""){
        document.getElementById("address").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Endereço Inválido";
    }
}

function validZipCode(){
    let zipCode = document.getElementById("zipCode").value;
    if(zipCode != ""){
        document.getElementById("zipCode").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "CEP Inválido";
    }
}

function validLocalName(){
    let localName = document.getElementById("localName").value;
    if(localName != ""){
        document.getElementById("localName").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Nome inválido";
    }
}

function validLocalValue(){
    let localValue = document.getElementById("localValue").value;
    if(localValue != "" && localValue < 10000){
        document.getElementById("localValue").setAttribute("class", "form-control border-success")
        return true;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Valor Inválido";
    }
}

function validPeopleCapacity(){
    let peopleCapacity = document.getElementById("peopleCapacity").value;
    if(peopleCapacity != ""){
        document.getElementById("peopleCapacity").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Capacidade de pessoas Inválido";
    }
}

function validDescription(){
    let description = document.getElementById("description").value;
    if(description != ""){
        document.getElementById("description").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Descrição Inválida";
    }
}

function progress(){
    let selectedRadio = document.querySelector("input[name='accessibility']:checked");
    if(selectedRadio != null){

        if((validState() + validCity() + validDistrict() + validRoad() + validAddress() + validZipCode() + validLocalName() + validPeopleCapacity()) == 8){


            const myModal = new bootstrap.Modal('#menuEvents', {
                keyboard: false
            })
    
            const modalToggle = document.getElementById('menuEvents'); 
    
            myModal.show(modalToggle)

            return true;
        }
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Selecione uma Opção de Acessibilidade";
    }
}

function confirm(){

    const tokenLocal = localStorage.getItem("session-token");
    const token = {token: tokenLocal};


    fetch("http://localhost:3000/user/session", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(token)
    }).then(res =>{
        return res.json();
    }).then((result) =>{

        let place = {
            userId: result.id,
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            district: document.getElementById("district").value,
            road: document.getElementById("road").value,
            address: document.getElementById("address").value,
            complement: document.getElementById("complement").value,
            zipCode: document.getElementById("zipCode").value,
            placeName: document.getElementById("localName").value,
            value: document.getElementById("localValue").value,
            capacity: document.getElementById("peopleCapacity").value,
            accessibility: document.querySelector("input[name='accessibility']:checked").value,
            description: document.getElementById("description").value,
        }

        const options = {
            method: "POST",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(place)
        }
    
        fetch("http://localhost:3000/place/register", options).then(res=>{
            return res.json();
            }).then((resp) =>{
                console.log(resp)
                if(resp.check){

                    document.getElementById("alertFail1").setAttribute("class", "d-none alert alert-danger");

                    document.getElementById("alertSuccess1").setAttribute("class", "d-block alert alert-success");

                    let event = JSON.parse(localStorage.getItem("userEvent"))

                    event.idPlace = resp.id;

                    localStorage.setItem("userEvent", JSON.stringify(event));

                    const myModal = new bootstrap.Modal('#menuEvents', {
                        keyboard: false
                    })
            
                    const modalToggle = document.getElementById('menuEvents'); 
            
                    myModal.hide(modalToggle);

                    window.setTimeout(() =>{
                        window.location.href = "http://localhost:3000/registration/equipamentSelection";
                    }, 1500)
                }
                else{
                    let alert = document.getElementById("alertFail1");
                    alert.setAttribute("class", "d-block alert alert-danger");
                    alert.textContent = "Houve um erro no cadastro, tente novamente mais tarde...";    
                }
            })


    });
}


function cancel(){

    const tokenLocal = localStorage.getItem("session-token");
    const token = {token: tokenLocal};

    fetch("http://localhost:3000/user/session", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(token)
    }).then(res =>{
        return res.json();
    }).then((result) =>{

        let place = {
            userId: "",
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            district: document.getElementById("district").value,
            road: document.getElementById("road").value,
            address: document.getElementById("address").value,
            complement: document.getElementById("complement").value,
            zipCode: document.getElementById("zipCode").value,
            placeName: document.getElementById("localName").value,
            value: 0.0,
            capacity: document.getElementById("peopleCapacity").value,
            accessibility: document.querySelector("input[name='accessibility']:checked").value,
            description: document.getElementById("description").value,
        }

        place.userId = result.id;

        const options = {
            method: "POST",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(place)
        }
    
        fetch("http://localhost:3000/place/register", options).then(res=>{
            return res.json();
            }).then((resp) =>{

                if(resp.check){

                    document.getElementById("alertFail1").setAttribute("class", "d-none alert alert-danger");

                    document.getElementById("alertSuccess1").setAttribute("class", "d-block alert alert-success");

                    let event = JSON.parse(localStorage.getItem("userEvent"))

                    event.idPlace = resp.id;

                    localStorage.setItem("userEvent", JSON.stringify(event));

                    const myModal = new bootstrap.Modal('#menuEvents', {
                        keyboard: false
                    })
            
                    const modalToggle = document.getElementById('menuEvents'); 
            
                    myModal.hide(modalToggle);

                    window.setTimeout(() =>{
                        window.location.href = "http://localhost:3000/registration/equipamentSelection";
                    }, 1500)
                }
                else{
                    let alert = document.getElementById("alertFail1");
                    alert.setAttribute("class", "d-block alert alert-danger");
                    alert.textContent = "Houve um erro no cadastro, tente novamente mais tarde...";    
                }
            })

    });
}