function signUp3(){
    let selectedRadio = document.querySelector("input[name='userType']:checked");

    if(selectedRadio != null){
        document.getElementById("alertFail2").setAttribute("class", "d-none alert alert-danger"); 
        document.getElementById("alertSuccess2").setAttribute("class", "d-block alert alert-success");

        let user = JSON.parse(localStorage.getItem("userData"));

        fetch("http://localhost:3000/user/register", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(user)
        }).then(res =>{
            return res.json();
        }).then(result =>{
            console.log(result);

            if(result == true){
                let login = {email: user.email, password: user.password};

                fetch("http://localhost:3000/user/login", {
                    headers: {"Content-Type": "application/json"},
                    method: "POST",
                    body: JSON.stringify(login)
                }).then(res =>{
                    return res.json();
                }).then((result) =>{
                    
                    localStorage.setItem("session-token", `${result.userToken}`);
                });
            }
        });


        localStorage.removeItem("userData");
        
        

        if(selectedRadio.value == "fornecedor"){
            window.setTimeout(() =>{
                window.location.href = 'http://localhost:3000/registerPlace/stage1';
            }, 1000)
        }
        else if(selectedRadio.value == "trabalhador"){
            window.setTimeout(() =>{
                window.location.href = 'http://localhost:3000/registration/registerWorker';
            }, 1000)
        }
        else if(selectedRadio.value == "organizador"){
            window.setTimeout(() =>{
                window.location.href = 'http://localhost:3000/profile';
            }, 1000)
        }

        
    }
    else{
        document.getElementById("alertFail2").setAttribute("class", "d-block alert alert-danger"); 
    }
}