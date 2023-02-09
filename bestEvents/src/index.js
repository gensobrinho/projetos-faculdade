// const PORT = 3000;
const express = require("express");
const app = express();
const apiRoute = require("./routes/api.js");

const dotenv = require("dotenv").config();

const path = require("path");

const userRouter = require("./routes/userRouter");
const placeRouter = require("./routes/placeRouter");
const workerRouter = require("./routes/workerRouter");
const equipamentRouter = require("./routes/equipamentRouter");
const buffetRouter = require("./routes/buffetRouter");
const eventRouter = require("./routes/eventRouter");
const indicadorRouter = require("./routes/indicadorRouter");

const adminRouter = require("./routes/adminRouter");


//any request for register or login of user
app.use("/user", express.json(), userRouter);

app.use("/place", express.json(), placeRouter);

app.use("/worker", express.json(), workerRouter);

app.use("/event", express.json(), eventRouter);

app.use("/equipament", express.json(), equipamentRouter);

app.use("/buffet", express.json(), buffetRouter);


app.use("/indicador", express.json(), indicadorRouter);





app.use("/admin", express.json(), adminRouter);

//--------------------------------------------------------------------------------------------
//Indicadores
app.use("/indicadores", express.static(path.join(__dirname, "frontend/indicadores")));


//--------------------------------------------------------------------------------------------
//landing page
app.use("/", express.static(path.join(__dirname, "frontend/landingPage")));

//login for users who already have you registration
app.use("/login", express.static(path.join(__dirname, "frontend/loginUser")));

//profile page
app.use("/profile", express.static(path.join(__dirname, "frontend/profile")));


//---------------------------------------------------------------------------------------------
//user registration part 1
app.use("/registration/loginData", express.static(path.join(__dirname, "frontend/registerUser/loginData")));

//user registration part 2
app.use("/registration/personalData", express.static(path.join(__dirname, "frontend/registerUser/personalData")));

//user registration part 3
app.use("/registration/userType", express.static(path.join(__dirname, "frontend/registerUser/userType")));


//---------------------------------------------------------------------------------------------
//user registration like fornecedor
//part 1
app.use("/registerPlace/stage1", express.static(path.join(__dirname, "frontend/registerPlace/stage1")));
//part 2
app.use("/registerPlace/stage2", express.static(path.join(__dirname, "frontend/registerPlace/stage2")));
//part 3
app.use("/registerPlace/stage3", express.static(path.join(__dirname, "frontend/registerPlace/stage3")));
//part 4
app.use("/registerPlace/stage4", express.static(path.join(__dirname, "frontend/registerPlace/stage4")));
//part 5
app.use("/registerPlace/stage5", express.static(path.join(__dirname, "frontend/registerPlace/stage5")));



//user registration like trabalhador
app.use("/registration/registerWorker", express.static(path.join(__dirname, "frontend/registerWorker")));


//---------------------------------------------------------------------------------------------
//event registration part 1
app.use("/registerEvent/eventInfo", express.static(path.join(__dirname, "frontend/registerEvent/eventInfo")));

//event registration part 2
app.use("/registerEvent/spaceChoose", express.static(path.join(__dirname, "frontend/registerEvent/spaceChoose")));

//event registration part 3 - My Space
app.use("/registerEvent/mySpaces", express.static(path.join(__dirname, "frontend/registerEvent/mySpaces")));

//event registration - register your space pt.1 
app.use("/registerEvent/localInformation", express.static(path.join(__dirname, "frontend/registerEvent/localInformation")));

app.use("/registerEvent/registerPlace/stage1", express.static(path.join(__dirname, "frontend/registerEvent/localInformation/stage1")));

app.use("/registerEvent/registerPlace/stage2", express.static(path.join(__dirname, "frontend/registerEvent/localInformation/stage2")));







//event registration part 3 - Choose Space
app.use("/registration/placeSelection", express.static(path.join(__dirname, "frontend/registerEvent/localSelection")));

//event registration part 4 - Equipament selection
app.use("/registerEvent/equipamentSelection", express.static(path.join(__dirname, "frontend/registerEvent/equipamentSelection")));

//event registration part 5.1 - Buffet | Choose Company
app.use("/registerEvent/company", express.static(path.join(__dirname, "frontend/registerEvent/buffet/chooseCompany")));

//event registration part 5.2 - Buffet | Menu
app.use("/registerEvent/menu", express.static(path.join(__dirname, "frontend/registerEvent/buffet/menuOptions")));

//---------------------------------------------------------------------------------------------
//worker selection for event
app.use("/work/workerSelection", express.static(path.join(__dirname, "frontend/workerSelection")));



//---------------------------------------------------------------------------------------------
app.use("/registerEvent/payment", express.static(path.join(__dirname, "frontend/payment")));




//app.use("/api", apiRoute); //chamada primeiro para evitar pastar com o nome api




app.listen(process.env.PORT, ()=>{
    console.log("Server Running...");
})


// app.listen(PORT, ()=>{
//     console.log("Server Running...");
// })