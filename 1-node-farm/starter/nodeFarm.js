const fs = require('fs');
const http = require('http');
const url = require('url');

//Preseting the Data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

// Helper Fucntions
 function replaceTemplate (cardTemp,productData){
    //Replaceing all PlaceHolder's one by one 
    let output = cardTemp.replace('[%IMAGE%]',productData.image);
    output = output.replace('[%PRODUCTNAME%]',productData.productName);
    output = output.replace('[%QUANTITY%]',productData.quantity);
    output = output.replace('[%PRICE%]',productData.price);
    output = output.replace('[%ID%]',productData.id);
    if(!productData.organic) output = output.replace('[%NOT_ORGANIC%]',"not-organic");

    //Return the Final o/p
    return output
 };

// Creating a Server
const server = http.createServer((req,res)=>{
    //Getting the URL/PathName
    const pathName = req.url; 

    //Overview and Home-Page
    if(pathName === '/' || pathName === '/overview'){
        
        //Constructing Card's
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');

        //Constructing final Overview
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);

        //Give Overview HTMl as Response
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(output);
    }


    // Products-listing 
    else if( pathName === '/products'){
        res.end("This is Product-Listing page");
    }

    //Product Detail
    else if( pathName === `/api`){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        
    }


    //Page Not Found
    else{
        res.writeHead(404,{'Content-type':'text/HTML'});
        res.end("<h1>PAGE NOT FOUND</h1>");
    }
});

//Start Listening for req
server.listen(8000,'127.0.0.1',()=>{console.log(`Listening to the Port : 8000`)});

