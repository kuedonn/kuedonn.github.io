let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let desc = document.querySelector('.desc');
let time = document.querySelector('.time');
let humidity = document.querySelector('.humidity');
let table = document.querySelector('.table');

let count = 0;

button.addEventListener('click', function(){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+inputValue.value+"&appid=3915b57a37556d0743125578a4b6aaa8&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        //reset table after every submit so user doesnt have to refresh page every time or brick the app
    if (count == 0) {
        count=1;
    }else if (count==1){
        for (let i=40; i>=1; i--){
            table.deleteRow(i+1);  
        }
    }

    //get data from 5d/3h API 
    for (let i=0; i<40; i++){
    let tempValue = data.list[i].main.temp;
    let tempfeelsValue = data.list[i].main.feels_like;
    let maxtempValue = data.list[i].main.temp_max;
    let weatherValue = data.list[i].weather[0].id;
    let timeValue = data.list[i].dt_txt;
    let windValue = data.list[i].wind.speed;
    let humidityValue = data.list[i].main.humidity;

    //insert elements at row cells
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);

    weatherIcons(weatherValue,cell2);
    convertTempWind(tempValue, tempfeelsValue, maxtempValue, windValue, cell3, cell4, cell5, cell6); 
    cell7.innerHTML = humidityValue + "%";
    cell1.innerHTML =  timeValue;
    }
})
.catch(err => alert("Wrong city name"))
})

//this whole code block is for submitting input with enter key, works when the cursor is in the input field atm 
inputValue.addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.keyCode === 13){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+inputValue.value+"&appid=3915b57a37556d0743125578a4b6aaa8&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data)
    if (count == 0) {
        count=1;
    }else if (count==1){
        for (let i=40; i>=1; i--){
            table.deleteRow(i+1);  
        }
    }

    for (let i=0; i<40; i++){
    let tempValue = data.list[i].main.temp;
    let tempfeelsValue = data.list[i].main.feels_like;
    let maxtempValue = data.list[i].main.temp_max;
    let weatherValue = data.list[i].weather[0].id;
    console.log(weatherValue);
    let timeValue = data.list[i].dt_txt;
    console.log(timeValue);
    let windValue = data.list[i].wind.speed;
    let humidityValue = data.list[i].main.humidity;
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);

    weatherIcons(weatherValue,cell2);
    convertTempWind(tempValue, tempfeelsValue, maxtempValue, windValue, cell3, cell4, cell5, cell6); 
    cell7.innerHTML = humidityValue + "%";
    cell1.innerHTML =  timeValue;
    }
})
.catch(err => alert("Wrong city name"))
    }
})


function convertTempWind(tempValue, tempfeelsValue, maxtempValue, windValue, cell3, cell4, cell5, cell6) { 
    let convertValue = document.getElementById('temps').value;

    let tempF = ((tempValue * 1.8) + 32).toFixed(1);
    let feelslikeF = ((tempfeelsValue * 1.8) + 32).toFixed(1);
    let tempmaxF = ((maxtempValue * 1.8) + 32).toFixed(1);

    let windMPH = ((windValue*2.2369)).toFixed(2); // m/s to mph
    let windKMH = ((windValue*3.6).toFixed(2)); // m/s to kmh

    switch(convertValue){
        case 'cms':
                cell3.innerHTML =  tempValue.toFixed(1) +"°C"; 
                cell4.innerHTML = tempfeelsValue.toFixed(1) + "°C";
                cell5.innerHTML =  maxtempValue.toFixed(1) + "°C";
                cell6.innerHTML = windValue + "m/s";
            break;
        
        case 'ckmh':
                cell3.innerHTML =  tempValue.toFixed(1) +"°C";
                cell4.innerHTML = tempfeelsValue.toFixed(1) + "°C";
                cell5.innerHTML =  maxtempValue.toFixed(1) + "°C";
                cell6.innerHTML = windKMH + "km/h";
            break;

        case 'cmph':
                cell3.innerHTML =  tempValue.toFixed(1) +"°C";
                cell4.innerHTML = tempfeelsValue.toFixed(1) + "°C";
                cell5.innerHTML =  maxtempValue.toFixed(1) + "°C";
                cell6.innerHTML =  windMPH + "mph";
            break;   
            
        case 'fmph':
                cell3.innerHTML =  tempF +"F";
                cell4.innerHTML = feelslikeF + "F";
                cell5.innerHTML = tempmaxF + "F";
                cell6.innerHTML = windMPH + "mph";
            break;

    }

    switch(true){
        case (tempValue<=0):
            cell3.style.backgroundColor = "#0770FF";
            cell4.style.backgroundColor = "#0770FF";
            cell5.style.backgroundColor = "#0770FF";
            break;

        case (tempValue>0 && tempValue<=5):
            cell3.style.backgroundColor = "#1F99D6";
            cell4.style.backgroundColor = "#1F99D6";
            cell5.style.backgroundColor = "#1F99D6";
            break;
            
        case (tempValue>5 && tempValue<=10):
            cell3.style.backgroundColor = "#21D3F3";
            cell4.style.backgroundColor = "#21D3F3";
            cell5.style.backgroundColor = "#21D3F3";
            break;
            
        case (tempValue>10 && tempValue<=15):
            cell3.style.backgroundColor = "#14EAA3";
            cell4.style.backgroundColor = "#14EAA3";
            cell5.style.backgroundColor = "#14EAA3";
            break;

        case (tempValue>15 && tempValue<=20):
            cell3.style.backgroundColor = "#14EA5F";
            cell4.style.backgroundColor = "#14EA5F";
            cell5.style.backgroundColor = "#14EA5F";
            break;
            
        case (tempValue>20 && tempValue<=25):
            cell3.style.backgroundColor = "#BCF34D";
            cell4.style.backgroundColor = "#BCF34D";
            cell5.style.backgroundColor = "#BCF34D";
            break;
            
        case (tempValue>25 && tempValue<=30):
            cell3.style.backgroundColor = "#FFFF00";
            cell4.style.backgroundColor = "#FFFF00";
            cell5.style.backgroundColor = "#FFFF00";
            break;
            
        case (tempValue>30 && tempValue<=35):
            cell3.style.backgroundColor = "#D1871C";
            cell4.style.backgroundColor = "#D1871C";
            cell5.style.backgroundColor = "#D1871C";
            break;
            
        case (tempValue>35 && tempValue<=37):
            cell3.style.backgroundColor = "#C2590B";
            cell4.style.backgroundColor = "#C2590B";
            cell5.style.backgroundColor = "#C2590B";
            break;
            
        case (tempValue>37):
            cell3.style.backgroundColor = "#FF0000";
            cell4.style.backgroundColor = "#FF0000";
            cell5.style.backgroundColor = "#FF0000";
            break;    

    }
}

//this function shows icons instead of description for the weather with id taken from API
function weatherIcons(weatherValue,cell2) {

const icons = {
    clear: './assets/icons/clear.png',
    clear2: './assets/icons/clear2.png',
    clouds: './assets/icons/clouds.png',
    clouds2: './assets/icons/clouds2.png',
    mist: './assets/icons/mist.png',
    rain: './assets/icons/rain.png',
    rain2: './assets/icons/rain2.png',
    snow: './assets/icons/snow.png',
    sunnyclound: './assets/icons/sunnycloud.png',
    sunnyclound2: './assets/icons/sunnycloud2.png',
    thunderstorm: './assets/icons/thunderstorm.png'
};

    switch(true){
        case (weatherValue>=200 && weatherValue<=232):
            cell2.style.backgroundImage = "url('"+icons.thunderstorm+"')";
            break;
        
        case (weatherValue>=500 && weatherValue<=504):
            cell2.style.backgroundImage = "url('"+icons.rain+"')";
            break;    

        case ((weatherValue>=300 && weatherValue<=321) || (weatherValue>=520 && weatherValue<=531)):
            cell2.style.backgroundImage = "url('"+icons.rain2+"')";
            break;
            
        case ((weatherValue==511) || (weatherValue>=600 && weatherValue<=622)):
            cell2.style.backgroundImage = "url('"+icons.snow+"')";
            break;
            
        case (weatherValue<=701 && weatherValue<=781):
            cell2.style.backgroundImage = "url('"+icons.mist+"')";
            break;
            
        case (weatherValue==800):
            cell2.style.backgroundImage = "url('"+icons.clear+"')"; 
            break;
            
        case (weatherValue==801):
            cell2.style.backgroundImage = "url('"+icons.sunnyclound+"')";
            break;
            
        case (weatherValue==802):
            cell2.style.backgroundImage = "url('"+icons.clouds+"')";
            break;
            
        case (weatherValue==803 || weatherValue==804):
            cell2.style.backgroundImage = "url('"+icons.clouds2+"')";
            break;    
    }

}