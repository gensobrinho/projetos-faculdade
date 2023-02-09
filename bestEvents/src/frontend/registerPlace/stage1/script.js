// const tokenLocal = localStorage.getItem("session-token");
// const token = {token: tokenLocal};

// fetch("http://localhost:3000/user/session", {
//     headers: {"Content-Type": "application/json"},
//     method: "POST",
//     body: JSON.stringify(token)
// }).then(res =>{
//     return res.json();
// }).then((result) =>{
//     console.log(result);
// });

function validForm(){
    return true;
}


function next(){
    

    if(validForm()){
        const userPlace = {
            userId: "", 
            value: "", //
            type: document.querySelector('input[name="type-options"]:checked').value,
            zipCode: document.getElementById("zipCode").value,
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            district: document.getElementById("disctrict").value,
            road: document.getElementById("road").value,
            address: document.getElementById("address").value,
            complement: document.getElementById("complement").value,
            name: "",
            accessibility: "",
            description: "",
            availability: {
                status: false,
                area: "",
                restroom: "",
                carSpace: "",
                detail: {
                    pool: false,
                    field: false,
                    stage: false,
                    roof: false,
                    freezer: false,
                    table: false,
                    chair: false,
                    bed: false,
                    water: false,
                }
            }
        }

        localStorage.setItem("userPlace", JSON.stringify(userPlace));


        window.location.href = "http://localhost:3000/registerPlace/stage2";
    }
    else{
        //alerta de informação errada
    }
}


