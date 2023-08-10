const fs = require("fs")
const path = require("path")
let dapath = path.resolve(__dirname, "..")



function insert(data) {
    return new Promise((res, rej) => {

       if (data.pass === " "|| data.email ===" " || data.fname === " "|| data.lname ===" ") {
        rej("samething wrong")
       }else{

           fs.readFile(path.join(dapath, "userData", "csDB.json"),(err, dataOld) => {
                if (err) {
                    console.log(err);
                }
                let newdata = JSON.parse(dataOld);
                let used=newdata.find(item => {
                    if (item.email == data.email) {
                        return item  
                    }
                })
                if (used) {
                    rej("used")
                }else{
                    newdata.push(data)
                    const modifiedContent = JSON.stringify(newdata, null, 2);
                    fs.writeFile(path.join(dapath, "userData", "csDB.json"), modifiedContent, err => {
                        if (err) {
        
                            rej(err)
        
                        } else {
                            res(data)
                        }
                    })  
                }
                
    
    
            })
       }

    })




}


function select(userData) {
    return new Promise((re, rej) => {

        fs.readFile(path.join(dapath, "userData", "csDB.json"), (err, dbdata) => {

            if (err) {
                console.log(err);
                return null
            }

            let jsondata = JSON.parse(dbdata);

            let user = jsondata.find(item => {
                if (item.email === userData.email) {
                    return item
                }
            })
            console.log("user:" + user);
            if (user) {
                if(user.pass === userData.pass){
                    re(user)
                }else{
                    userData.code =1
                    rej(userData)
                }

            } else {
                userData.code =2
                rej(userData)

            }
        })




    })







}

module.exports = { insert, select }
