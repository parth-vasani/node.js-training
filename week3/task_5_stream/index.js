const fs = require("fs");

// // for creating a large file

// const wStream=fs.createWriteStream("file2.txt");
// for(let i=0;i<1e6;i++){
//     wStream.write("This is a large file with the same concurrent line created with a js program. This is a large file with the same concurrent line created with a js program. This is a large file with the same concurrent line created with a js program.\n");
// }

const readFileStream = fs.createReadStream("file2.txt");
const writeFileStream = fs.createWriteStream("tempfile2.txt");


readFileStream.on("data", (chunk) => {
  console.log('.');
  writeFileStream.write(chunk);
});

readFileStream.on("end", () => {
  writeFileStream.end();
  console.log("Finish");
});


// readFileStream.on('data',(chunk)=>{
//   console.log('.')
// })

// readFileStream.pipe(writeFileStream).on("finish", () => {
//   console.log("Finish");
// });
