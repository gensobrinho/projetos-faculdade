function valid(){
    return true;
}

function register(){
    if(valid()){
        const userPlace = JSON.parse(localStorage.getItem("userPlace"));

        userPlace.value = document.getElementById("value").value;
        userPlace.availability.status = true;



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

                    const event = JSON.parse(localStorage.getItem("userEvent"));

                    if(event != null || event != undefined){
                        event.idPlace = resp.id;

                        localStorage.setItem("userEvent", JSON.stringify(event));

                        window.location.href = "http://localhost:3000/registerEvent/equipamentSelection";
                    }
                    else
                        window.location.href = "http://localhost:3000/profile";
                }
                else{   //fail place registration  
                    alert("Houve um erro. Tente novamente mais tarde");
                    window.location.href="http://localhost:3000/"
                }
            })

    });





        
    }
    else{

    }
    
}
