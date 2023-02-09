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
                        window.location.href = 'http://localhost:3000/registration/personalData';
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



function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
