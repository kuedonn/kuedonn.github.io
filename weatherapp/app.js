let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let cityname = document.querySelector('.cityname');
let desc = document.querySelector('.desc');
let time = document.querySelector('.time');
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
    convertTempWind(tempValue, tempfeelsValue, maxtempValue, mintempValue, windValue);
    desc.innerHTML = "Current weather: " + descValue; //current weather and small description
    weatherdesc(weatherValue,timeValue,timeZoneValue); //calling function to change display background image
    time.innerHTML = "Local time: " + convertDate(timeValue,timeZoneValue); //getting specific location local time from user input city name
    humidity.innerHTML = "Humidity: " + humidityValue + "%"; //getting humidity %
})
.catch(err => alert("Wrong city name"))
})

//this whole code block is for submitting input with enter key, works when the cursor is in the input field atm
inputValue.addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.keyCode === 13){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=3915b57a37556d0743125578a4b6aaa8&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data)

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
    convertTempWind(tempValue, tempfeelsValue, maxtempValue, mintempValue, windValue);
    desc.innerHTML = "Current weather: " + descValue; 
    weatherdesc(weatherValue,timeValue,timeZoneValue);
    time.innerHTML = "Local time: " + convertDate(timeValue,timeZoneValue);
    humidity.innerHTML = "Humidity: " + humidityValue + "%";
})
.catch(err => alert("Wrong city name"))
}
})


//function that uses a dropdown html element to choose values for different temperature and wind format values
function convertTempWind(tempValue, tempfeelsValue, maxtempValue, mintempValue, windValue) { 
    let temp = document.querySelector('.temp');
    let feelslike = document.querySelector('.feelslike');
    let tempmin = document.querySelector('.tempmin');
    let tempmax = document.querySelector('.tempmax');
    let wind = document.querySelector('.wind');

    let convertValue = document.getElementById('temps').value;

    //FAHRENEIT CONVERTIONS
    let tempF = ((tempValue * 1.8) + 32).toFixed(1);
    let feelslikeF = ((tempfeelsValue * 1.8) + 32).toFixed(1);
    let tempminF = ((mintempValue * 1.8) + 32).toFixed(1);
    let tempmaxF = ((maxtempValue * 1.8) + 32).toFixed(1);

    let windMPH = ((windValue*2.2369)).toFixed(2); // m/s to mph
    let windKMH = ((windValue*3.6).toFixed(2)); // m/s to kmh

    switch(convertValue){
        case 'cms':
            temp.innerHTML = "Temperature: " + tempValue.toFixed(1) +"°C";
            feelslike.innerHTML = "Feels like: " + tempfeelsValue.toFixed(1) + "°C";
            tempmin.innerHTML = "Min temperature(1h): " + mintempValue.toFixed(1) + "°C";
            tempmax.innerHTML = "Max temperature(1h): " + maxtempValue.toFixed(1) + "°C";
            wind.innerHTML = "Wind speed: " + windValue + "m/s";
            break;
        
        case 'ckmh':
            temp.innerHTML = "Temperature: " + tempValue.toFixed(1) +"°C";
            feelslike.innerHTML = "Feels like: " + tempfeelsValue.toFixed(1) + "°C";
            tempmin.innerHTML = "Min temperature(1h): " + mintempValue.toFixed(1) + "°C";
            tempmax.innerHTML = "Max temperature(1h): " + maxtempValue.toFixed(1) + "°C";
            wind.innerHTML = "Wind speed: " + windKMH + "km/h";
            break;

        case 'cmph':
            temp.innerHTML = "Temperature: " + tempValue.toFixed(1) +"°C";
            feelslike.innerHTML = "Feels like: " + tempfeelsValue.toFixed(1) + "°C";
            tempmin.innerHTML = "Min temperature(1h): " + mintempValue.toFixed(1) + "°C";
            tempmax.innerHTML = "Max temperature(1h): " + maxtempValue.toFixed(1) + "°C";
            wind.innerHTML = "Wind speed: " + windMPH + "mph";
            break;   
            
        case 'fmph':
            temp.innerHTML = "Temperature: " + tempF +"F";
            feelslike.innerHTML = "Feels like: " + feelslikeF + "F";
            tempmin.innerHTML = "Min temperature(1h): " + tempminF + "F";
            tempmax.innerHTML = "Max temperature(1h): " + tempmaxF + "F";
            wind.innerHTML = "Wind speed: " + windMPH + "mph";
            break;

    }
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
