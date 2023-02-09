var equipSelected = [];

let equip = {
    id: "",
    type: "",
    equipament: "",
    qtd: "",
    price: "",
}


fetch("http://localhost:3000/equipament/all").then((res)=>{
    return res.json();
}).then((data) =>{

    let type = document.getElementById("type");
    let name = document.getElementById("name");
    let qtd = document.getElementById("qtd");

    console.log(data);

    //code link: https://plainenglish.io/blog/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    let distinct = [...new Set(data.map(item => item.type))];
    console.log(distinct);
    
    distinct.forEach((item)=>{

        type.innerHTML += `<option value="${item}">${item}</option>`

    })
})


function searchName(type){

    equip.type = type;
    
    fetch(`http://localhost:3000/equipament/${type}`).then((res)=>{
        return res.json();
    }).then((data) =>{

        let qtd = document.getElementById("qtd");
        // let type = document.getElementById("type");

        let name = document.getElementById("name");
        name.removeAttribute("disabled");
        name.innerHTML = '<option value="" disabled selected>Equipamento</option>';

        qtd.value = "";
        
        data.forEach((item)=>{

            if(item.type == type){
                name.innerHTML += `<option value="${item.name}">${item.name}</option>`
                qtd.setAttribute("price", `${item.value}`);
                qtd.setAttribute("idItem", `${item.id}`)
            }

        })
    })
}

function activeQtd(name){

    let qtd = document.getElementById("qtd");
    qtd.value = "";
    qtd.removeAttribute("disabled");

    equip.equipament = name;

    

}

function valid(value){
    let button = document.getElementById("add-btn");

    equip.qtd = Number(value);
    equip.price = Number(document.getElementById("qtd").getAttribute("price")) * value;
    equip.id = document.getElementById("qtd").getAttribute("idItem");

    // equipSelected.push(equip);

    // equip = {};

    if(value != 0){
        button.removeAttribute("disabled");
    }
    
}


function addEquipament(){
    equipSelected.push(equip);
    console.log(equipSelected);

    equip = {
        id: "",
        type: "",
        equipament: "",
        qtd: "",
        price: "",
    }

    document.getElementById("type").value = "";
    document.getElementById("name").value = "";
    document.getElementById("qtd").value = "";

    load()
}

function load(){
    let table = document.getElementById("table-list");
    let i = 1;

    table.innerHTML = ""; 

    equipSelected.forEach((item) =>{
        table.innerHTML += 
        `
        <tr class="row">
            <th scope="row" class="col-1">${i}</th>
            <td class="col-3 overflow-hidden">${item.type}</td>
            <td class="col-3 overflow-hidden">${item.equipament}</td>
            <td class="col-2 overflow-hidden">${item.qtd}</td>
            <td class="col-2 overflow-hidden">R$${item.price}</td>
            <td class="col-1 overflow-hidden" onclick="removeEquip('${item.id}')"><button type="button" class="btn-close" aria-label="Close"></button></td>
        </tr>
        `
        i++;
    })

    
}


function removeEquip(id){
    let aux = 0;

    equipSelected.forEach((item) =>{
        if(item.id == id){
            equipSelected.splice(aux, 1);
        }
        aux++;
    })

    load();
}


function progress(){
    console.log(equipSelected)

    let event = JSON.parse(localStorage.getItem("userEvent"));

    event.equipaments = equipSelected;

    localStorage.setItem("userEvent", JSON.stringify(event));
    
    window.setTimeout(()=>{
        // window.location.href="proxima etapa";
        window.location.href = "http://localhost:3000/registerEvent/company";
    }, 1000)
}