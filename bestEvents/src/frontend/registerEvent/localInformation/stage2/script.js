function validForm(){
    return true;
}


function next(){
    if(validForm()){

        const myModal = new bootstrap.Modal('#menuEvents', {
            keyboard: false
        })

        const modalToggle = document.getElementById('menuEvents'); 

        myModal.show(modalToggle);

        
    }
    else{
        //alerta de informação errada
    }
}


function confirm(){
    const userPlace = JSON.parse(localStorage.getItem("userPlace"));

    userPlace.name = document.getElementById("name").value;
    userPlace.accessibility = document.getElementById("accessibility").value;
    userPlace.description = document.getElementById("description").value;

    localStorage.setItem("userPlace", JSON.stringify(userPlace));


    window.location.href = "http://localhost:3000/registerPlace/stage3";
}

function cancel(){
    const userPlace = JSON.parse(localStorage.getItem("userPlace"));

    userPlace.name = document.getElementById("name").value;
    userPlace.accessibility = document.getElementById("accessibility").value;
    userPlace.description = document.getElementById("description").value;

    userPlace.availability.status = false;

    const tokenLocal = localStorage.getItem("session-token");
    const token = {token: tokenLocal};

    fetch("http://localhost:3000/user/session", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(token)
    }).then(res =>{
        return res.json();
    }).then((result) =>{

        userPlace.userId = result.id; 

        const options = {
            method: "POST",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(userPlace)
        }

    fetch("http://localhost:3000/place/register", options).then(res=>{
        return res.json();
        }).then((resp) =>{

            if(resp.check){ //success place registration
                localStorage.removeItem("userPlace");
                const userEvent = JSON.parse(localStorage.getItem("userEvent"));

                userEvent.place = {id: resp.id, mySpace: true}

                localStorage.setItem("userEvent", JSON.stringify(userEvent));

                window.location.href = "http://localhost:3000/registerEvent/equipamentSelection";
            }
            else{   //fail place registration 
                localStorage.removeItem("userPlace"); 
                alert("Houve um erro. Tente novamente mais tarde");
                window.location.href="http://localhost:3000/registerEvent/spaceChoose";
            }
        })

    });
    
}

