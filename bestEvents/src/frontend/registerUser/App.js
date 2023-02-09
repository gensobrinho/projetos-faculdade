

let user = {
    name: "",
    email: "",
    password: "",
    state: "",
    city: "",
    district: "",
    road: "",
    address: "",
    complement: "",
    zipCode: "",
    phoneNumber: "",
    cpf: "",
    birthDate: "",
    gender: "",
    personType: "",
    userType: "",
}

function SignUp1(){
    //console.log("SignUp1")

    let name = document.getElementById("name").value;
    console.log(name)
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if(name != ""){
        console.log("entrou nome")
        if(validateEmail(email)){
            if(password != "" && password.length >= 8){
                if(password == confirmPassword){
                    //tudo certo
                    let alertFail = document.getElementById("alertFail");
                    alertFail.setAttribute("class", "d-none alert alert-danger");
                    let alertSuccess = document.getElementById("alertSuccess");
                    alertSuccess.setAttribute("class", "d-block alert alert-success");

                    user.name = document.getElementById("name").value;
                    user.email = document.getElementById("email").value;
                    user.password = document.getElementById("password").value;

                    localStorage.setItem("userData", JSON.stringify(user));                    

                    window.setTimeout(() =>{
                        window.location.href = '../personalData/index.html';
                    }, 2000)
                }
                else{
                    //problema na confirmaçao de senha
                    let alert = document.getElementById("alertFail");
                    alert.setAttribute("class", "d-block alert alert-danger");
                    alert.textContent = "Senhas Diferentes";
                }
            }
            else{
                //problema na senha
                let alert = document.getElementById("alertFail");
                alert.setAttribute("class", "d-block alert alert-danger");
                alert.textContent = "Senha Inválida (deve conter pelo menos 8 caracteres)";
            }

        }
        else{
            //problema no email
            let alert = document.getElementById("alertFail");
            alert.setAttribute("class", "d-block alert alert-danger");
            alert.textContent = "E-mail Inválido";
        }
    }
    else{
        //problema no nome
        let alert = document.getElementById("alertFail");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Nome Inválido";
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
            window.location.href = '../userType/index.html';
        }, 2000)
    }
    else{
        let alert = document.getElementById("alertFail1");
        alert.setAttribute("class", "d-block alert alert-danger");
        alert.textContent = "Informações Inválidas";
    }

}

function signUp3(){
    let selectedRadio = document.querySelector("input[name='userType']:checked");

    if(selectedRadio != null){
        document.getElementById("alertFail2").setAttribute("class", "d-none alert alert-danger"); 
        document.getElementById("alertSuccess2").setAttribute("class", "d-block alert alert-success");

        let localUser = JSON.parse(localStorage.getItem("userData"));

        fetch("/api/register", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(localUser)
        });

        localStorage.clear();
        //localStorage.setItem("userData", JSON.stringify(localUser));  

        if(selectedRadio.value == "fornecedor"){
            window.setTimeout(() =>{
                window.location.href = '../../cadastroLocal/index.html';
            }, 1000)
        }
        else if(selectedRadio.value == "trabalhador"){
            window.setTimeout(() =>{
                window.location.href = '../../cadastroTrabalhador/index.html';
            }, 1000)
        }
        else if(selectedRadio.value == "organizador"){
            window.setTimeout(() =>{
                window.location.href ='../../telaPerfil/index.html';
            }, 1000)
        }

        
    }
    else{
        document.getElementById("alertFail2").setAttribute("class", "d-block alert alert-danger"); 
    }
}


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
