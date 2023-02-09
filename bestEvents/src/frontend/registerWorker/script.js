function validFunction(){
    let workFunction = document.getElementById("function");
    if(workFunction.value != ""){
        return 1;
    }
    else{
        let alertFail = document.getElementById("alertFail");
        alertFail.setAttribute("class", "d-block alert alert-danger");
        alertFail.textContent = "Função Inválida";
    }
}

function validResume(){
    //validar se o existe o arquivo, se existir retornará 1, se não existir retornará 0.

    return 1;

}

function validBankAccount(){
    let bankAccount = document.getElementById("bankAccount");
    if(bankAccount.value != ""){
        return 1;
    }
    else{
        let alertFail = document.getElementById("alertFail");
        alertFail.setAttribute("class", "d-block alert alert-danger");
        alertFail.textContent = "Conta Bancária Inválida";
    }
}

function validAgenceNum(){
    let agenceNum = document.getElementById("agenceNum");
    if(agenceNum.value != ""){
        return 1;
    }
    else{
        let alertFail = document.getElementById("alertFail");
        alertFail.setAttribute("class", "d-block alert alert-danger");
        alertFail.textContent = "Número de Agência Inválido";
        
    }
}

function validAccountNum(){
    let AccountNum = document.getElementById("accountNum");
    if(AccountNum.value != ""){
        return 1;
    }
    else{
        let alertFail = document.getElementById("alertFail");
        alertFail.setAttribute("class", "d-block alert alert-danger");
        alertFail.textContent = "Número da Conta inválido";
    }
}


const tokenLocal = localStorage.getItem("session-token");
const token = {token: tokenLocal};




function register(){
    if((validFunction() + validResume() + validBankAccount() + validAgenceNum() + validAccountNum()) == 5){

        fetch("http://localhost:3000/user/session", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(token)
        }).then((res) =>{
            return res.json();
        }).then((result) =>{
         
            let workerData = {
                functionType: document.getElementById("function").value,
                resume: "",
                bankAccount: document.getElementById("bankAccount").value,
                agency: document.getElementById("agenceNum").value,
                accountNumber: document.getElementById("accountNum").value,
                userId: ""
            }

            workerData.userId = result.id;

            fetch("http://localhost:3000/worker/register", {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(workerData)
            }).then((res) =>{
                return res.json();
            }).then((resp) =>{
                if(resp.alreadyRegistered){
                    let alertFail = document.getElementById("alertFail");
                    alertFail.setAttribute("class", "d-block alert alert-danger");
                    alertFail.textContent = "Você já possui um cadastro como funcionário";
                }
                else{
                    if(!resp.error){
                        let alertFail = document.getElementById("alertFail");
                        alertFail.setAttribute("class", "d-none alert alert-danger");
    
                        let alertSuccess = document.getElementById("alertSuccess");
                        alertSuccess.setAttribute("class", "d-block alert alert-success");
                    }
                    else{
                        let alertFail = document.getElementById("alertFail");
                        alertFail.setAttribute("class", "d-block alert alert-danger");
                        alertFail.textContent = "Houve um erro no cadastro, tente novamente mais tarde";
                    }
                }
                
            });


        });


        window.setTimeout(()=>{
            window.location.href = "http://localhost:3000/profile";
        }, 2000);
    }
    else{
        let alertFail = document.getElementById("alertFail");
        alertFail.setAttribute("class", "d-block alert alert-danger");
        alertFail.textContent = "Informações Inválidas";
    }


}