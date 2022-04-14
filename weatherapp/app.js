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
    let weatherValue = data.weather[0].main;
    let descValue = data.weather[0].description;
    let timeValue = data.dt;
    let timeZoneValue =  data.timezone;
    let windValue = data.wind.speed;
    // let rainValue = data.rain['1h']; this breaks everything
    let humidityValue = data.main.humidity;

    cityname.innerHTML = nameValue;
    temp.innerHTML = "Temperature: " + tempValue.toFixed(1) +"°C"; //temperature now
    feelslike.innerHTML = "Feels like: " + tempfeelsValue.toFixed(1) + "°C"; //feels like temperature
    tempmin.innerHTML = "Min temperature: " + mintempValue.toFixed(1) + "°C"; //min day temperature (doesnt update a lot has a lot of error values)
    tempmax.innerHTML = "Max temperature: " + maxtempValue.toFixed(1) + "°C"; //max day temperature
    desc.innerHTML = "Current weather: " + weatherValue + " with " + descValue; //current weather and small description
    time.innerHTML = "Local time: " + convertDate(timeValue,timeZoneValue); //getting specific location local time from user input city name
    wind.innerHTML = "Wind speed: " + windValue + "m/s"; // wind speed m/s
    /*if (rainValue == null){
        rain.innerHTML = "No rain recorded";
    }else{
        rain.innerHTML = "Rain(1h): " + rainValue + "mm";
    }
     */
    humidity.innerHTML = "Humidity: " + humidityValue + "%"; //getting humidity %
})
.catch(err => alert("Wrong city name"))
})

function convertDate (timeValue,timeZoneValue) {
    let date = new Date(timeValue*1000);  //convert epoch time to js timestamp
    let dtime = timeZoneValue/3600;  //getting GTM time offset 
    let offset = dtime;
    if (offset > 0) offset = "+" + offset; //getting correct symbol for positive GMT time
    return ( date.getHours()-3 + dtime + ":" + date.getMinutes() + ":" + date.getSeconds() + " GMT " + offset); 
    //returning the full time + offset in GMT timezone, gethours -3 for summertime, -2 for winter
}

function darktheme() {

}
