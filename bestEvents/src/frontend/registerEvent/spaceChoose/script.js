
function progress2(){
    let selectedRadio = document.querySelector("input[name='userType']:checked");

    if(selectedRadio != null){
        selectedRadio = selectedRadio.value;

        if(selectedRadio == "mySpace"){
            window.location.href = "http://localhost:3000/registerEvent/mySpaces"
        }
        else{
            
            window.location.href = "http://localhost:3000/registerEvent/placeSelection"
        }
    }
    else{
        let alert = document.getElementById("alertFail");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Selecione um opção";
    }


}