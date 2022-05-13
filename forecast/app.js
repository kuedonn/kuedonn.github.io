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
    let descValue = data.list[i].weather[0].description;
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

  
    convertTempWind(tempValue, tempfeelsValue, maxtempValue, windValue, cell3, cell4, cell5, cell6);
    cell2.innerHTML = descValue; 
    cell7.innerHTML = humidityValue + "%";
    cell1.innerHTML =  timeValue;
    }
    
})
.catch(err => alert("Wrong city name"))
})

function convertTempWind(tempValue, tempfeelsValue, maxtempValue, windValue, cell3, cell4, cell5, cell6) { 
    let temp = document.querySelector('.temp');
    let feelslike = document.querySelector('.feelslike');
    let tempmax = document.querySelector('.tempmax');
    let wind = document.querySelector('.wind');

    let convertValue = document.getElementById('temps').value;

    let tempF = ((tempValue * 1.8) + 32).toFixed(1);
    let feelslikeF = ((tempfeelsValue * 1.8) + 32).toFixed(1);
    let tempmaxF = ((maxtempValue * 1.8) + 32).toFixed(1);

    let windMPH = ((windValue*2.2369)).toFixed(2); // m/s to mph
    let windKMH = ((windValue*3.6).toFixed(2)); // m/s to kmh

    switch(convertValue){
        case 'cms':
              cell3.innerHTML =  tempValue.toFixed(1) +"°C"; //douleuei
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
}