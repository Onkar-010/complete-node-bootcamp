const fs = require('fs');

//////////////////////////////////
// FILES
// const name = "onkar";
// console.log(name);

// // Blocking Synchronous way 
// const fileText = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(fileText);

// const textOut = `This is what we Know aboth the avocardo: ${fileText},\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log(`file has been written`)

// //Non-blocking Asynchronous way
// fs.readFile('./txt/start.txt',`utf-8`,(err,data1)=>{
//     if (err) console.log(`💥`);
//     fs.readFile(`./txt/${data1}.txt`,`utf-8`,(err,data2)=>{
//         if (err) console.log(`💥`);
//         console.log(`${data2}`);
//         fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
//             if (err) console.log(`💥`);
//             console.log(`${data3}`);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', err=>{
//                 if (err) console.log(`💥`);
//                 console.log(`Data written success fully`);
//             })
//         })
//     });
// });

//////////////////////////////
// SERVERS

// requiring the module's
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

// Creating the Server
const server = http.createServer((req,res)=>{
    // Storing the current request Url
    const pathName  = req.url;
    


    //if else condition to act accordingly based on url/route
    if(pathName === '/' || pathName === '/overview') res.end("THis is Overview");
    else if( pathName === '/products') res.end("THis is Product");
    else if( pathName === '/api') {
            res.writeHead(200,{'Content-type':'application/json'});
            res.end(data);
        } 
    else {
        // writing head to discript the User 
        res.writeHead(404,{
            'Content-type':'text.html',
            'my-own-header':'hello-world'
        })
        res.end("<h1>The Page not Found</h1>")
    }
})

// Litsening to the Server
server.listen(8000,'127.0.0.1',()=>{console.log(`Listening to the Request`);})