const server = require("./src/app");
const PORT = 3001;
const {sequelize}=require("./src/db")

server.listen(PORT,()=>{
    sequelize.sync({ force: true });
    console.log("We are in port "+ PORT)
})


