let complement = document.getElementById("complement").value;

 function vaildState(){
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
        document.getElementById("city").setAttribute("class", "form-select border-success")
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
        document.getElementById("district").setAttribute("class", "form-select border-success")
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
        document.getElementById("road").setAttribute("class", "form-select border-success")
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
        document.getElementById("address").setAttribute("class", "form-select border-success")
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
        document.getElementById("zipCode").setAttribute("class", "form-select border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "CEP Inválido";
    }
}

function validPhoneNumber(){
    let phoneNumber = document.getElementById("phoneNumber").value;
    if(phoneNumber != "" && !isNaN(phoneNumber) && phoneNumber.length == 11){
        document.getElementById("phoneNumber").setAttribute("class", "form-select border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Telefone Inválido";
    }
}

function validCpf(){
    let cpf = document.getElementById("cpf").value;

    //link da função: https://www.devmedia.com.br/validar-cpf-com-javascript/23916
    function testCpf(strCPF) { 
        var Soma;
        var Resto;
        Soma = 0;
      if (strCPF == "00000000000") return false;
    
      for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    if(cpf != "" && testCpf(cpf) == true){
        document.getElementById("cpf").setAttribute("class", "form-control border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "CPF Inválido";
    }
}

function validBirthDate(){
    let birthDate = document.getElementById("birthDate").value;
    if(birthDate != ""){
        document.getElementById("birthDate").setAttribute("class", "form-select border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Data Inválida";
    }
}

function validGender(){
    let gender = document.getElementById("gender").value;
    if(gender != ""){
        document.getElementById("gender").setAttribute("class", "form-select border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Gênero Inválida";
    }
}

function validPersonType(){
    let personType = document.getElementById("personType").value;
    if(personType != ""){
        document.getElementById("personType").setAttribute("class", "form-select border-success")
        return 1;
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Tipo de Pessoa Inválido";
    }
}

function signUp2(){
    

    let valid = 0;
    valid = vaildState() + validCity() + validDistrict() + validRoad() + validAddress() + validZipCode() + validPhoneNumber() + validCpf() + validBirthDate() + validGender() + validPersonType() ;

    if(valid == 11){
        // alertSuccess1
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-none alert alert-danger");
        document.getElementById("alertSuccess1").setAttribute("class", "d-block alert alert-success")

        let localUser = JSON.parse(localStorage.getItem("userData"));

        localUser.state = document.getElementById("state").value;
        localUser.city = document.getElementById("city").value;
        localUser.district = document.getElementById("district").value;
        localUser.road = document.getElementById("road").value;
        localUser.address = document.getElementById("address").value;
        localUser.complement = document.getElementById("complement").value;
        localUser.zipCode = document.getElementById("zipCode").value;
        localUser.phoneNumber = document.getElementById("phoneNumber").value;
        localUser.cpf = document.getElementById("cpf").value;
        localUser.birthDate = document.getElementById("birthDate").value;
        localUser.gender = document.getElementById("gender").value;
        localUser.personType = document.getElementById("personType").value;

        localStorage.setItem("userData", JSON.stringify(localUser));     


        window.setTimeout(() =>{
            window.location.href = 'http://localhost:3000/registration/userType';
        }, 2000)
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Informações Inválidas";
    }

}