
let ar=process.argv;

let a=+ar[2],b=+ar[3];

if(isNaN(a) || isNaN(b)){
    console.log('Invalid number argumet');
    return;
}

if(ar[4]==='+'){
    console.log(a+b);
}
else if(ar[4]==='-'){
    console.log(a-b);
}
else if(ar[4]==='*'){
    console.log(a*b);
}
else if(ar[4]==='/'){
    if(b==0){
        console.log('Not divisible by 0');
        return ;
    }
    console.log(a/b);
}
else{
    console.log("Invalid operation");
}