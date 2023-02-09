fetch("http://localhost:3000/buffet/allCompany").then((res)=>{
    return res.json()
}).then((data)=>{
    console.log(data);

    let companyArea = document.getElementById("companyArea");
    companyArea.textContent = "";

    data.forEach((company) =>{
        companyArea.innerHTML += 
        `
        <div class="company rounded p-4 bg-light" onclick="select('${company.id}')">
            <div class="text-center image-bg rounded">
                <img src="./image/imageCompany.png" style="width: 64px;" class="image rounded opacity-25" alt="">
            </div>
            
            <h2 class="color-red text-center mt-3">$</h2>
            <b class="h1 text-center d-block">${company.name}</b>
            <p>${company.description}</p>
        </div>
        `
    })


})



function noBuffet(){
    window.location.href = "http://localhost:3000/work/workerSelection"
}


function select(id){
    const company = {companyId: id}

    localStorage.setItem("company", JSON.stringify(company));

    window.location.href = "http://localhost:3000/registerEvent/menu"
}