
let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let cityname = document.querySelector('.cityname');
let desc = document.querySelector('.desc');
let temp = document.querySelector('.temp');
let time = document.querySelector('.time');

button.addEventListener('click', function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=3915b57a37556d0743125578a4b6aaa8&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data)

    let nameValue = data['name'];
    let tempValue = data['main']['temp'];
    let descValue = data['weather'][0]['description'];
    let timeValue = data['dt'];
    let timeZoneValue =  data['timezone'];
    cityname.innerHTML = nameValue;
    temp.innerHTML = "temperature: " + (tempValue.toFixed(1)) +"°C";
    desc.innerHTML = "Current weather: " + descValue;
    time.innerHTML = "Local time: " + convertDate(timeValue,timeZoneValue);
})
.catch(err => alert("Wrong city name"))
})


function convertDate (timeValue,timeZoneValue) {
    let date = new Date(timeValue*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let timeZoneStr;

    switch(timeZoneValue){
        case 0:
            hours = hours - 3;
            timeZoneStr = "UTC";
            break;
        case 3600:
            hours = hours - 2;
            timeZoneStr = "UTC+1";
            break;
        case 7200:
            hours = hours - 1;
            timeZoneStr = "UTC+2";
            break;
        case 10800:
            timeZoneStr = "UTC+3"
            break;
        case -32400:
            hours = hours - 12;
            timeZoneStr = "UTC-9"; 
            break;
        case -28800:
            hours = hours - 11;
            timeZoneStr = "UTC-8";
            break;
        case -14400:
            hours = hours - 7;
            timeZoneStr = "UTC-4";
            break;
        case -10800:
            hours = hours - 9;
            timeZoneStr = "UTC-6";
            break;
        case -21600:
            hours = hours             
    }

    let convertedTime = hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2) + ' '+ timeZoneStr;
    return convertedTime;
}

