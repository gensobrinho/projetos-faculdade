
// let event = JSON.parse(localStorage.getItem("userEvent"))


// let event = {
//     idUser: "3at3ra",
//     idPagamento: "dgzdg",
//     idLocal: "fssfs",
//     qtdPessoas: "",
//     data: "",
//     tipoEvento: "",
//     valor: "",
//     descricao: ""
// }


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

            event.qtdPessoas = qtdPessoas.value;
            event.data = date.value;

            localStorage.setItem("userEvent", JSON.stringify(event));

            window.setTimeout(()=>{
                window.location.href = "./spaceChoose/index.html"
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


function progress2(){
    let selectedRadio = document.querySelector("input[name='userType']:checked");

    if(selectedRadio != null){
        selectedRadio = selectedRadio.value;
        if(selectedRadio == "mySpace"){
            window.location.href = "../localInformation/index.html"
        }
        else{
            window.location.href = "../localSelection/index.html"
        }
    }
    else{
        let alert = document.getElementById("alertFail");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Selecione um opção";
    }


}