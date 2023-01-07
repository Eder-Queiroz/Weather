//b89f3c6c4edde3132d76c5d414955d80

// !variaveis
let weatherObj = {};

const cityReference = document.getElementById('city-reference');
const containerCard = document.getElementById('container-card');
const search = document.getElementById('search');
const error = document.getElementById('error');

// !funções

async function chamadaApi(city) {

    // const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-19.753248&lon=-48.0195734&appid=b89f3c6c4edde3132d76c5d414955d80';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=b89f3c6c4edde3132d76c5d414955d80&units=metric`

    try {
        let res = await fetch(url);
        let weather = await res.json();

        // informações do obj
        let name = weather['name'];
        let temp = weather['main']['temp'];
        let tempMin = weather['main']['temp_min'];
        let tempMax = weather['main']['temp_max'];
        let humidity = weather['main']['humidity'];
        let country = weather['sys']['country'];
        let weatherMain = weather['weather']['0']['main'];
        let description = weather['weather']['0']['description'];
        let icon = weather['weather']['0']['icon'];
        let wind = weather['wind']['speed']

        // console.log(weather);
        
        // montando obj para retorno
        weatherObj = {
            'name': name,
            'temperature': {'temp': temp, 'temp_min': tempMin, 'temp_max': tempMax, 'humidity': humidity},
            'country': country,
            'weather': {'main': weatherMain, 'description': description, 'icon': icon},
            'wind': wind
        };
        createWeatherHtml();

    }catch (e) {
        error.classList.remove('hide');
    }
    

}

const createWeatherHtml = () => {

    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    weatherInfo.id = 'weather-info';

    containerCard.appendChild(weatherInfo);

    const cityInfo = document.createElement('div');
    cityInfo.className = 'city-info'

    weatherInfo.appendChild(cityInfo);

    const iconLocation = document.createElement('i');
    iconLocation.className = 'fa-solid fa-location-dot';

    cityInfo.appendChild(iconLocation);

    const cityName = document.createElement('span');
    cityName.innerText = weatherObj['name'];

    cityInfo.appendChild(cityName);

    // todo create flag
    const imgFlag = document.createElement('img');
    imgFlag.setAttribute('crossorigin', 'anonymous');
    imgFlag.src = `https://countryflagsapi.com/png/${weatherObj['country']}`;
    imgFlag.alt = `Flag ${weatherObj['country']}`;

    cityInfo.appendChild(imgFlag);
    // .....

    const h2 = document.createElement('h2');
    h2.innerText = `${weatherObj['temperature']['temp']} °C`;

    weatherInfo.appendChild(h2);

    const divDescription = document.createElement('div');
    divDescription.className = 'description';
    
    weatherInfo.appendChild(divDescription);

    const spanDescription = document.createElement('span');
    spanDescription.innerText = weatherObj['weather']['description'];

    divDescription.appendChild(spanDescription);

    const img = document.createElement('img');
    img.src = `http://openweathermap.org/img/w/${weatherObj['weather']['icon']}.png`;
    img.alt = 'Weather icon';

    divDescription.appendChild(img);

    const info = document.createElement('div');
    info.className = 'info';

    weatherInfo.appendChild(info);

    const humidity = document.createElement('div');
    
    info.appendChild(humidity);

    const iconDroplet = document.createElement('i');
    iconDroplet.className = 'fa-solid fa-droplet';

    humidity.appendChild(iconDroplet);

    const spanHumidity = document.createElement('span');
    spanHumidity.innerText = `${weatherObj['temperature']['humidity']}%`;

    humidity.appendChild(spanHumidity);

    const line = document.createElement('div');
    line.className = 'line-info';

    info.appendChild(line);

    const windInfo = document.createElement('div');

    info.appendChild(windInfo);

    const windIcon = document.createElement('i');
    windIcon.className = 'fa-solid fa-wind';

    windInfo.appendChild(windIcon);

    const windSpan = document.createElement('span');
    windSpan.innerText = `${weatherObj['wind']}m/s`;

    windInfo.appendChild(windSpan);

}

// !Eventos

document.addEventListener('click', (e) => {

    e.preventDefault();

    if(e.target.className === 'city' ) {
        
        cityReference.classList.add('hide');
        error.classList.add('hide');
        chamadaApi(e.target.innerText);

    }

})

search.addEventListener('click', (e) => {

    e.preventDefault();

    const inputCity = document.getElementById('city');
    const weatherCheck = document.getElementById('weather-info');

    if(weatherCheck) {

        if(inputCity.value.trim() !== '') {
            
            error.classList.add('hide');
            weatherCheck.remove()
            chamadaApi(inputCity.value);
    
        }else {

            alert('Informe um valor válido!');

        }

    }else {

        if(inputCity.value.trim() !== '') {
            
            cityReference.classList.add('hide');
            error.classList.add('hide');
            chamadaApi(inputCity.value);
    
        }else {

            alert('Informe um valor válido!');

        }

    }

})