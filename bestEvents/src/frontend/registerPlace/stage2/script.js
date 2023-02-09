

function validForm(){
    return true;
}


function next(){
    if(validForm()){
        const userPlace = JSON.parse(localStorage.getItem("userPlace"));

        userPlace.name = document.getElementById("name").value;
        userPlace.accessibility = document.getElementById("accessibility").value;
        userPlace.description = document.getElementById("description").value;

        localStorage.setItem("userPlace", JSON.stringify(userPlace));


        window.location.href = "http://localhost:3000/registerPlace/stage3";
    }
    else{
        //alerta de informação errada
    }
}

