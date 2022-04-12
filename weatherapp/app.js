let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let cityname = document.querySelector('.cityname');
let desc = document.querySelector('.desc');
let temp = document.querySelector('.temp');
let time = document.querySelector('.time');
let wind = document.querySelector('.wind');
let feelslike = document.querySelector('.feelslike');
let tempmin = document.querySelector('.tempmin');
let tempmax = document.querySelector('.tempmax');
let rain = document.querySelector('.rain');
let humidity = document.querySelector('.humidity');

button.addEventListener('click', function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=3915b57a37556d0743125578a4b6aaa8&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data)

    let nameValue = data.name;
    let tempValue = data.main.temp;
    let tempfeelsValue = data.main.feels_like;
    let maxtempValue = data.main.temp_max;
    let mintempValue = data.main.temp_min;
    let weatherValue = data.weather[0].main;
    let descValue = data.weather[0].description;
    let timeValue = data.dt;
    let timeZoneValue =  data.timezone;
    let windValue = data.wind.speed;
    let rainValue = data.rain['1h'];
    let humidityValue = data.main.humidity;

    cityname.innerHTML = nameValue;
    temp.innerHTML = "Temperature: " + tempValue.toFixed(1) +"°C";
    feelslike.innerHTML = "Feels like: " + tempfeelsValue.toFixed(1) + "°C";
    tempmin.innerHTML = "Min temperature: " + mintempValue.toFixed(1) + "°C";
    tempmax.innerHTML = "Max temperature: " + maxtempValue.toFixed(1) + "°C";
    desc.innerHTML = "Current weather: " + weatherValue + " with " + descValue;
    time.innerHTML = "Local time: " + convertDate(timeValue,timeZoneValue);
    wind.innerHTML = "Wind speed: " + windValue + "m/s";
    if (rainValue == null){
        rain.innerHTML = "No rain recorded";
    }else{
        rain.innerHTML = "Rain(1h): " + rainValue + "mm";
    }
    humidity.innerHTML = "Humidity: " + humidityValue + "%";
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

        //africa timezones
        case 0:
            hours = Math.abs(hours - 3);
            timeZoneStr = "UTC";
            break;
        case 3600:
            hours = Math.abs(hours - 2);
            timeZoneStr = "UTC+1";
            break;
        case 7200:
            hours = Math.abs(hours - 1);
            timeZoneStr = "UTC+2";
            break;
        case 10800:
            timeZoneStr = "UTC+3"
            break;
         
        //north and south america timezones    
        case -32400:
            hours = Math.abs(hours - 12);
            timeZoneStr = "UTC-9"; 
            break;
        case -28800:
            hours = Math.abs(hours - 11);
            timeZoneStr = "UTC-8";
            break;
        case -25200:
            hours = Math.abs(hours - 10);
            timeZoneStr = "UTC-7";
            break;    
        case -21600:
            hours = Math.abs(hours - 9);
            timeZoneStr = "UTC-6";
            break;
        case -18000:
            hours = Math.abs(hours-8);
            timeZoneStr = "UTC-5";
            break;    
        case -14400:
            hours = Math.abs(hours - 7);
            timeZoneStr = "UTC-4";
            break;
        case -10800:
            hours = Math.abs(hours - 6);
            timeZoneStr = "UTC-3";
            break;
        case -7200:
            hours = Math.abs(hours - 2);
            timeZoneStr = "UTC-2";
            break;  
            
        //antarctica and arctic and asia timezones
        case 43200:
            hours = Math.abs(hours + 10);
            timeZoneStr = "UTC+12"
            break;
        case 39600:
            hours = Math.abs(hours + 9);
            timeZoneStr = "UTC+11";
            break;
        case 36000:
            hours = Math.abs(hours + 8);
            timeZoneStr = "UTC+10";
            break;
        case 32400:
            hours = Math.abs(hours + 7);
            timeZoneStr = "UTC+9"    
        case 25200:
            hours = Math.abs(hours + 5);
            timeZoneStr = "UTC+7";
            break;
        case 21600:
            hours = Math.abs(hours + 4);
            timeZoneStr = "UTC+6";
            break;
        case 19800:
            hours = Math.abs(hours + 3) //colombo asia
            timeZoneStr = "UTC+5:30"      
        case 18000:
            hours = Math.abs(hours + 3);
            timeZoneStr = "UTC+5";
            break;
        case 14400:
            hours = Math.abs(hours + 4)
            timeZoneStr = "UTC+2";
            break;    

                     
    }

    let convertedTime = hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2) + ' '+ timeZoneStr;
    return convertedTime;
}

function darktheme() {

}