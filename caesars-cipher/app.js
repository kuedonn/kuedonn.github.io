let button = document.querySelector('.button');
let inputVal = document.querySelector('.inputVal');
let inputVal2 = document.querySelector('.inputVal2');

button.addEventListener('click', function(){
    encrypt(inputVal.value, inputVal2.value)
})

function encrypt(inputVal,inputVal2){
    //splitting string in an array so its easy to convert chars to int and do the maths for the cipher
    let message = inputVal.split('');
    let key = parseInt(inputVal2);
    console.log(message,"message");
    console.log(key,"key");
    //making chars to integers
    let a = 'a'.charCodeAt();
    let A = 'A'.charCodeAt();
    let z = 'z'.charCodeAt();
    let Z = 'Z'.charCodeAt();

    //choice gia encrypt i decrypt edw
    let ch;
    for (let i=0; i<message.length; i++){
        ch = message[i].charCodeAt();
        console.log(ch,"ch");
        if (ch == 32){
            ch = ch + key;
            message[i] = ch;
        }
        if (ch >= a && ch<= z){
            ch = ch + key;
            if (ch > z){
                ch = ch - z + a - 1;
            }
            message[i] = ch;
            console.log(message[i]);
        }
        else if (ch >= A && ch <= Z){
            ch += key;
            if (ch > Z){
                ch = ch - Z + A; - 1;
            }
            message[i] = ch;
        }
    }
    console.log(message);
    message.innerText = message;
}
