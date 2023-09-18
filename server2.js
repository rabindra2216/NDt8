let express = require("express");
//const { studentsData } = require("./studentData");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
const port = 2410;
app.listen(port, () =>console.log(`Node app listening on port ${port}!`));
let {mobiles}=require('./mobilesData')

app.get('/mobiles/:name',function(req,res){
     let name=req.params.name;
     let mobile=mobiles.find(st=>st.name===name);
     if(mobile) {
       //res.send(students[2]);
        res.send(mobile);
    }
     else{ res.status(404).send('No Mobile Found!')
}
})
app.get('/mobiles',function(req,res){
    let brandStr=req.query.brand;
    let ramStr=req.query.RAM;
    let romStr=req.query.ROM;
    let sort=req.query.sort;
    //console.log('Query=',req.query)
    let arr1=mobiles;
    if(brandStr)
    {
        let brandArr=brandStr.split(','); 
        arr1=arr1.filter(st=>brandArr.find(c1=>c1===st.brand));
    }
    if(ramStr)
    {
        let ramArr=ramStr.split(','); 
        arr1=arr1.filter(st=>ramArr.find(c1=>c1===st.RAM));
    }
    if(romStr)
    {
        let romArr=romStr.split(','); 
        arr1=arr1.filter(st=>romArr.find(c1=>c1===st.ROM));
    }

     res.send(arr1);
})
app.post("/mobiles", function (req, res) {
    let body = req.body; 
    //console.log(body);
    // let maxid = students.reduce((acc, curr)=>curr.id >= acc ? curr.id : acc,0);
    // let newid = maxid + 1;
    let newMobile= {...body };
    mobiles.push(newMobile);
    res.send(newMobile);
    });
    app.put("/mobiles/:name", function (req, res) {
        let name= req.params.name;
        let body= req.body;
        let index = mobiles.findIndex((st)=> st.name===name);
        if(index>=0){
        let updatedMobiles = {...body };
        mobiles[index] = updatedMobiles;
        res.send(updatedMobiles);
        }
        else res.status(404).send('No MobileS found!');
        });
    app.delete("/mobiles/:name", function (req, res) {
            let name = req.params.name; 
            let index = mobiles.findIndex ((st) => st.name===name);
            if(index>=0){
             let deletedMobile = mobiles.splice (index, 1); 
             res.send(deletedMobile)
            }
            else res.status(404).send('No Mobile found!');
    });

    const { Client } = require("pg");
 const client = new Client({
    user: "postgres",
     password: "Rdatabase@2216",
     database:"postgres",
    port: 5432,
    host: "db.nvpowactnetkahazvbds.supabase.co", 
    ssl: { rejectUnauthorized: false },
    }); 
    client.connect(function (res, error)
     { console.log("Connected!!!");
    
    });
    
    app.get("/users", function (req, res, next) 
    { console.log("Inside /users get api");
    const query = `SELECT * FROM users`;
client.query(query, function (err, result)
 { if (err) 
{ res.status(400).send(err);}
res.send(result.rows);
client.end();
});
});

app.post("/users", function (req, res, next)
 { console.log("Inside post of user"); 
 var values = Object.values (req.body);
console.log(values);
const query =`INSERT INTO users (email, firstname, lastname, age) VALUES ($1,$2,$3,$4)`;
client.query(query, values, function (err, result) {
    if (err) {
    res.status(400).send(err);
    }
    //console.log(result);
    res.send(`${result.rowCount} insertion successful`);
    });
    
    });

    //put
app.put("/users/:id", function (req, res, next) 
{ console.log("Inside put of use r^ prime prime ") ;
let userId = req.params.id;
let age = req.body.age;
let values= [age,userId]
const query =`UPDATE users SET age =$1 WHERE id= $2`;
client.query(query, values, function (err, result)
{ if (err) {res.status(400).send(err);}

res.send(`${result.rowCount} updation successful`);
});
});
    // CREATE TABLE users (id SERIAL PRIMARY KEY,email varchar, firstName varchar,lastName varchar,age int)