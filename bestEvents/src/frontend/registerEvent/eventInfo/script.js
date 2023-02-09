let newEvent = JSON.parse(localStorage.getItem("userEvent"));

function progress1(){
    
    let qtdPessoas = document.getElementById("qtdPeople");
    let date = document.getElementById("date");

    if(qtdPessoas.value != ""){
        
        qtdPessoas.setAttribute("class", "form-control border-success");

        if(date.value != ""){

            date.setAttribute("class", "form-control border-success");

            let alertF = document.getElementById("alertFail");
            alertF.setAttribute("class", "d-none alert alert-danger");

            let alertS = document.getElementById("alertSuccess");
            alertS.setAttribute("class", "d-block alert alert-success");

            newEvent.peopleQtd = qtdPessoas.value;
            newEvent.date = date.value;

            localStorage.setItem("userEvent", JSON.stringify(newEvent));

            window.setTimeout(()=>{
                window.location.href = "http://localhost:3000/registerEvent/spaceChoose";
            },1500);

        }
        else{
            let alert = document.getElementById("alertFail");
            alert.setAttribute("class", "d-block alert alert-danger");
            alert.textContent = "Informe uma data válida";
        }
    }
    else{
        let alert = document.getElementById("alertFail");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Informe a Quantidade de Pessoas";
    }
}