// VARIAVEIS GERAIS

let card1 = document.querySelector(".card1");
let card2 = document.querySelector(".card2");
let card3 = document.querySelector(".card3");
let card4 = document.querySelector(".card4");
let card5 = document.querySelector(".card5");



fetch("http://localhost:3000/indicador/cadastrosConvertidos").then((res) =>{return res.json()}).then((data)=>{
    console.log(data);
    let result = (parseInt(data.qttEvents) / parseInt(data.Users)) * 100;
    console.log(result);

    let cadastrosConvertidos = document.getElementById("cadastros-convertidos-valor");
    cadastrosConvertidos.textContent = `%${result}`
})

fetch("http://localhost:3000/indicador/funcSemEventos").then((res) =>{return res.json()}).then((data)=>{
    let result = (data.qttEvents / data.qttUsers) * 100;
    console.log(result)

    let trabalhadoresOciosos = document.getElementById("trabalhadores-ocioso");
    trabalhadoresOciosos.textContent = `${result}`; 
})
