const http = require('http');
const fs=require('fs');
const url=require('url');
const moment = require('moment');

const getBody=(req)=>{
    return new Promise((resolve,reject)=>{
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            console.log(body);
            resolve(body);
        })
    })
}

const writeToFile=(data)=>{
    fs.writeFile(__dirname+'/books.txt',JSON.stringify(data),(err)=>{
        if(err){
            res.writeHead(400);
            res.end(JSON.stringify({err}));
            return;
        }
    });
}

console.log(moment().format('DDMMyyyy hhmmss'))
console.log(Date.now())

let keys=['title','author','pages'];

const server=http.createServer(async(req,res)=>{

    console.log(req.url)
    console.log(req.method)

    let reqObj=url.parse(`http://localhost:8000${req.url}`);

    let body=await getBody(req);
    body=await JSON.parse(body);

    let books=[];
    fs.readFile(__dirname+'/books.txt',(err,data)=>{
        if(data)
            books=JSON.parse(data);
        console.log(books);


        if(req.url==="/"){
            res.writeHead(200);
            res.write("Welcome")
            res.end();
        }
        else if(req.url==='/books' && req.method==='GET'){
            // res.writeHead(200);
            res.write(JSON.stringify(books));
            res.end();
            
        }
        else if(reqObj.pathname==='/book' && req.method==='GET'){
            let id=reqObj.query.split('=')[1];

            let book=books.filter((b)=>b.id==id);

            console.log(book)
            if(book.length===0){
                res.writeHead(404);
                res.end(JSON.stringify({msg:"Book not found."}));
                return;
            }

            res.writeHead(200);
            res.write(JSON.stringify(book[0]));
            res.end();
        }
        else if(reqObj.pathname==='/book' && req.method==='POST'){
            // let id=moment().format('DDMMyyyy');
            let id=Date.now().toString();
            let newBook={id};

            for(key of keys){
                if(!body[key]){
                    res.writeHead(400);
                    res.end(JSON.stringify({error:"Missing some attribute for book."}))
                    return;
                }
                newBook[key]=body[key];
            }

            books.push(newBook);
            writeToFile(books)
            
            res.writeHead(201);
            res.end(JSON.stringify({msg:"Added."}))
        }
        else if(reqObj.pathname==='/book' && req.method==='PUT'){
            let id=reqObj.query.split('=')[1];
            let book=books.filter((b)=>b.id==id);
            if(book.length===0){
                res.writeHead(404);
                res.end(JSON.stringify({err:"Book not found."}));
                return;
            }

            book=book[0];
            for(key of keys){
                if(body[key]){
                    book[key]=body[key];
                }
            }

            writeToFile(books);
            
            res.writeHead(200);
            res.end(JSON.stringify({msg:"Modified."}))
        }
        else if(reqObj.pathname==='/book' && req.method==="DELETE"){
            let id=reqObj.query.split('=')[1];

            let updatedBooks=books.filter((b)=>b.id!=id);

            if(updatedBooks.length===books.length){
                res.writeHead(404);
                res.end(JSON.stringify({msg:"Book not found."}));
                return;
            }
            books=updatedBooks;

            writeToFile(books);
            
            res.writeHead(200);
            res.end(JSON.stringify({msg:"Deleted."}))
        }
        else{
            res.writeHead(400)
            res.end(JSON.stringify({msg:"Invalid path."}))
        }

    })

});

server.listen(8000,()=>{
    console.log("Server running on port 8000.");
})