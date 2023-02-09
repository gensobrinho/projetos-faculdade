//  Math.random().toString(36).substring(2,9),

const tokenLocal = localStorage.getItem("session-token");
const token = {token: tokenLocal};


if(token.token != undefined || token.token != null){
    fetch("http://localhost:3000/user/session", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(token)
    }).then((res) =>{
        return res.json();
    }).then((result) =>{

        let username = document.getElementById("username");

        username.textContent = result.name;

    });
}





function addEventType(type){
    if(token.token != undefined || token.token != null){

        if(type != null && type != ""){
            localStorage.setItem("typeEvent", JSON.stringify({type: type}));

            fetch("http://localhost:3000/user/session", {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(token)
            }).then((res) =>{
                return res.json();
            }).then((result) =>{
                let event = {
                    id: "",
                    idUser: "",
                    idPayment: "",
                    place: "",
                    peopleQtd: "",
                    date: "",
                    type: "",
                    totalValue: "",
                    description: "",
                    equipaments: "",
                    buffet: "",
                    workes: "",
                }

                const type = JSON.parse(localStorage.getItem("typeEvent"));

                event.type = type.type;
                event.idUser = result.id;

                localStorage.setItem("userEvent", JSON.stringify(event));
                localStorage.removeItem("typeEvent");

                window.location.href = "http://localhost:3000/registerEvent/eventInfo";
            });
        }
        
        //window.location.href = "./criacaoEvento/index.html";
    }
    else{
        alert("Antes de começar a criar um evento você precisa entrar em uma conta");

        window.location.href = "http://localhost:3000/login"
    }
}

function user(){

    if(token.token != undefined || token.token != null){
        window.location.href = "http://localhost:3000/profile";
    }
    else{
        window.location.href = "http://localhost:3000/login";
    }

        
}
