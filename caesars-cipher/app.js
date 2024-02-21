let button = document.querySelector('.button');
let inputVal = document.querySelector('.inputVal');
let inputVal2 = document.querySelector('.inputVal2');

button.addEventListener('click', function(){
    encrypt(inputVal.value, inputVal2.value)
})

function encrypt(inputVal,inputVal2){
    let result = document.querySelector(".result");
    let message = inputVal.split('');
    let key = parseInt(inputVal2);
    console.log(message,"message");
    console.log(key,"key");
    let a = 'a'.charCodeAt();
    let A = 'A'.charCodeAt();
    let z = 'z'.charCodeAt();
    let Z = 'Z'.charCodeAt();

    //choice gia encrypt i decrypt edw
    let ch,ascii=[];
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
        ascii[i] = String.fromCharCode(message[i]);
        console.log(ascii);
    }
    result.innerText = ascii.join("");
}
