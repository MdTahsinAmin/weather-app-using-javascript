let appId = '40d133bcf25184deb317b1621512cf42';
let units = "imperial";
let searchMethod ;

function getSearchMethod(searchTerm){

    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod = 'zip'
    }
    else searchMethod = 'q';

}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        intIt(result);
    })
}

function intIt(resultFormSever){
  switch (resultFormSever.weather[0].main) {
        case 'Thunderstorm':
            document.body.style.backgroundImage ='url("images/clear.jpeg")';
            break;
            
        case 'Drizzle':
             document.body.style.backgroundImage = 'url("images/lightning.jpeg")';
           break;

        case 'Rain':
            document.body.style.backgroundImage = 'url("images/rain.jpeg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("images/snow1.jpeg")';
            break;

        case 'Atmosphere':
              document.body.style.backgroundImage = 'url("images/atmosphere.jpeg")';
            break;

        case 'Clear':
             document.body.style.backgroundImage = 'url("images/clear.jpeg")';
             //document.body.style.backgroundSize ="100%";
            break;

        case 'Clouds':
             document.body.style.backgroundImage = 'url("images/clouds.jpeg")';
            break;
            
        default:
           break;
  }
  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');

  let temperatureElement = document.getElementById('temperature');

  let humidityElement = document.getElementById('humidity');

  let windSpeedElement = document.getElementById('windSpeed');

  let cityHeader = document.getElementById('cityHeader');
  
  let weatherIcon = document.getElementById('documentIdImg');

  weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFormSever.weather[0].icon+'.png';

  let weatherDescription = resultFormSever.weather[0].description;

  weatherDescriptionHeader.innerText = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultFormSever.main.temp) +"&#176";
  
  windSpeedElement.innerHTML = 'Winds at : ' +Math.floor(resultFormSever.wind.speed) +"m/s";

  cityHeader.innerHTML = resultFormSever.name;

  humidityElement.innerHTML = 'Humidity at : '+ resultFormSever.main.humidity +"%";
   setPositionForWeatherInfo();

}

function setPositionForWeatherInfo(){
  let weatherContainer = document.getElementById('weather-container');

  let weatherContainerHeight = weatherContainer.clientHeight;

  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left =`calc(50%- ${weatherContainerWidth/2}px)`;

  weatherContainer.style.top  =`calc(50%- ${weatherContainerHeight/1.3}px)`;

   weatherContainer.style.visibility =`visible`;
}

document.getElementById('search-Btn').addEventListener('click',function(){
    let searchTerm = document.getElementById('searchInput').value;

    if(searchTerm){
        searchWeather(searchTerm);
    }
})

