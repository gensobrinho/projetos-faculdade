function valid(){
    return true;
}


function next(){
    if(valid()){
        const userPlace = JSON.parse(localStorage.getItem("userPlace"));

        userPlace.availability.area = document.getElementById("area").value;
        userPlace.availability.restroom = document.getElementById("restroom").value;
        userPlace.availability.carSpace = document.getElementById("car-space").value;



        localStorage.setItem("userPlace", JSON.stringify(userPlace));


        window.location.href = "http://localhost:3000/registerPlace/stage4";
    }
    else{
        //alerta de informação errada
    }
}

