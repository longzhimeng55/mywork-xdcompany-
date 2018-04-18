/*这是最基础的内容*/
const fs=require("fs");
fs.readFile("./package.json",(err,data)=>{
    if(err) return console.log(err)
    data=JSON.parse(data)
    console.log(data.name)
    }
)
/*封装一下*/

