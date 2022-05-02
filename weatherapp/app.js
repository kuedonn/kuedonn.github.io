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
let humidity = document.querySelector('.humidity');

button.addEventListener('click', function(){ //on submit click from user
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=3915b57a37556d0743125578a4b6aaa8&units=metric") //fetching data from the openweathermap api
    .then(response => response.json()) // getting data from api as json
    .then(data => {
        console.log(data) //logging data in the console to find errors on my code
//getting all the values from the API
    let nameValue = data.name;
    let tempValue = data.main.temp;
    let tempfeelsValue = data.main.feels_like;
    let maxtempValue = data.main.temp_max;
    let mintempValue = data.main.temp_min;
    let weatherValue = data.weather[0].id;
    let descValue = data.weather[0].description;
    let timeValue = data.dt;
    let timeZoneValue =  data.timezone;
    let windValue = data.wind.speed;
    let humidityValue = data.main.humidity;

    cityname.innerHTML = "City: " + nameValue;
    temp.innerHTML = "Temperature: " + tempValue.toFixed(1) +"°C"; //temperature now
    feelslike.innerHTML = "Feels like: " + tempfeelsValue.toFixed(1) + "°C"; //feels like temperature
    tempmin.innerHTML = "Min temperature(1h): " + mintempValue.toFixed(1) + "°C"; //min day temperature (doesnt update a lot has a lot of error values)
    tempmax.innerHTML = "Max temperature(1h): " + maxtempValue.toFixed(1) + "°C"; //max day temperature
    desc.innerHTML = "Current weather: " + descValue; //current weather and small description
    weatherdesc(weatherValue,timeValue,timeZoneValue); //calling function to change display background image
    time.innerHTML = "Local time: " + convertDate(timeValue,timeZoneValue); //getting specific location local time from user input city name
    wind.innerHTML = "Wind speed: " + windValue + "m/s"; // wind speed m/s
    humidity.innerHTML = "Humidity: " + humidityValue + "%"; //getting humidity %
})
.catch(err => alert("Wrong city name"))
})

function convertDate (timeValue,timeZoneValue) {
    let date = new Date(timeValue*1000); //convert epoch time to js timestamp
    let dtime = timeZoneValue/3600; //getting GTM/UTC time offset 
    let offset = dtime;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let hours = Math.trunc(Math.abs(date.getHours()-3 + dtime));
    if (offset >= 0) offset = "+" + offset;
    let float_part = scuffedTimeZones(timeZoneValue);
    // this will probably break when time is under 30 minutes i think, needs another fix, soon tm
    if (offset >= 0 && float_part==0.50) { 
         minutes = Math.abs(minutes-30); 
         hours++;
         offset -= 0.5;
         offset = "+" + offset + ":30";
    }
    if (offset >= 0 && float_part==0.75) {
        minutes = Math.abs(minutes-15);
        hours++;
        offset -= 0.75;
        offset = "+" + offset + ":45";
    }
    //it was showing 1 digit only if minutes or seconds were lower than 10, so fixed to show correctly 0+time
    if (minutes>=0 && minutes<=9) minutes = "0" + minutes;
    if (seconds>=0 && seconds<=9) seconds = "0" + seconds;    
        
    return ( hours + ":" + minutes + ":" + seconds + " UTC " + offset);
    //returning the full time + offset in UTC timezone, gethours -3 for summertime, -2 for winter
}

// if its eg 5:45 or 5:30 its scuffed timezone and has to get a fix so it shows properly
function scuffedTimeZones(timeZoneValue){
    let diff = timeZoneValue/3600;
    let int_part = Math.trunc(diff);
    let float_part = Number(diff-int_part).toFixed(2);
    return float_part;
}

//change display background dynamically with the weather id
function weatherdesc(weatherValue,timeValue,timeZoneValue) {
    let displayVal = document.querySelector('.display');
    const img_urls = {
        clouds: './images/clouds.GIF',
        clear: './images/clear.JPG',
        atmosphere: './images/mist.GIF',
        snow: './images/snow.GIF',
        rain: './images/rain.GIF',
        drizzle: './images/drizzle.GIF',
        thunderstorm: './images/thunderstorm.GIF',
        night: './images/night.GIF'
    };
    //need to get hours so i can change to night sky if its night local time
    let date = new Date(timeValue*1000);
    let dtime = timeZoneValue/3600;
    let globalH = date.getHours()-3 + dtime; 

    switch(true) {
        case weatherValue==800:
            if (globalH<=9 || globalH>=19){
            displayVal.style.backgroundImage = "url('"+img_urls.night+"')";
            displayVal.style.color = "white";
            } else {
            displayVal.style.backgroundImage = "url('"+img_urls.clear+"')";
            }
            break;
        case weatherValue>=801 && weatherValue<=804:
            displayVal.style.backgroundImage = "url('"+img_urls.clouds+"')";
            displayVal.style.color = "black";
            break;
        case weatherValue>=701 && weatherValue<=781:
            displayVal.style.backgroundImage = "url('"+img_urls.atmosphere+"')";
            displayVal.style.color = "white";
            break;
        case weatherValue>=600 && weatherValue<=622:
            displayVal.style.backgroundImage = "url('"+img_urls.snow+"')"; 
            displayVal.style.color = "black";  
            break;  
        case weatherValue>=500 && weatherValue<=531:
            displayVal.style.backgroundImage = "url('"+img_urls.rain+"')";
            displayVal.style.color = "black";
            break;  
        case weatherValue>=300 && weatherValue<=321:
            displayVal.style.backgroundImage = "url('"+img_urls.drizzle+"')";
            displayVal.style.color = "black";  
            break; 
        case weatherValue>=200 && weatherValue<=232:
            displayVal.style.backgroundImage = "url('"+img_urls.thunderstorm+"')";
            displayVal.style.color = "white";   
            break;
        default:
            break;   
    }
}
