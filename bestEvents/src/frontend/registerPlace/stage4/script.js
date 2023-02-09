function valid(){
    return true;
}

function next(){
    if(valid()){
        const userPlace = JSON.parse(localStorage.getItem("userPlace"));
      
        const optionsList = document.getElementsByName("option");

        userPlace.availability.detail.pool = false;
        userPlace.availability.detail.field = false;
        userPlace.availability.detail.stage = false;
        userPlace.availability.detail.roof = false;
        userPlace.availability.detail.freezer = false;
        userPlace.availability.detail.table = false;
        userPlace.availability.detail.chair = false;
        userPlace.availability.detail.bed = false;
        userPlace.availability.detail.water = false;

        optionsList.forEach((item) =>{
            if(item.checked) {
                switch(item.id){
                    case 'pool':
                        userPlace.availability.detail.pool = true;
                        break;
                    case 'field':
                        userPlace.availability.detail.field = true;
                        break;
                    case 'stage': 
                        userPlace.availability.detail.stage = true;
                        break;
                    case 'roof': 
                        userPlace.availability.detail.roof = true;
                        break;
                    case 'freezer':
                        userPlace.availability.detail.freezer = true;
                        break;
                    case 'table':
                        userPlace.availability.detail.table = true;
                        break;
                    case 'chair': 
                        userPlace.availability.detail.chair = true;
                        break;
                    case 'bed': 
                        userPlace.availability.detail.bed = true;
                        break;
                    case 'water':
                        userPlace.availability.detail.water = true;
                        break;
                }
                
            }
        })


        localStorage.setItem("userPlace", JSON.stringify(userPlace));




        window.location.href = "http://localhost:3000/registerPlace/stage5";
    }
    else{

    }
    
}

