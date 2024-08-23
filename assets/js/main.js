const apiKey = '8be9a2e1a31daff33351c45341c598a4'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const apiUrlCoords =
	'https://api.openweathermap.org/data/2.5/weather?units=metric&lat='
const weatherSrc = [
	'assets/images/clear.png',
	'assets/images/clouds.png',
	'assets/images/drizzle.png',
	'assets/images/mist.png',
	'assets/images/rain.png',
	'assets/images/snow.png',
]

const inputCity = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
	let data = await response.json()

	console.log(data)

	document.querySelector('.name').innerHTML = data.name
	document.querySelector('.temperature').innerHTML =
		Math.round(data.main.temp) + '°C'
	document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
	document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h'
	document.querySelector('.weather-status').innerHTML = data.weather[0].main

	updateWeatherIcon(data.weather[0].main)
}

async function checkWeatherByCoords(lat, lon) {
	const response = await fetch(
		apiUrlCoords + lat + '&lon=' + lon + `&appid=${apiKey}`
	)
	let data = await response.json()

	console.log(data)

	document.querySelector('.name').innerHTML = data.name
	document.querySelector('.temperature').innerHTML =
		Math.round(data.main.temp) + '°C'
	document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
	document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h'
	document.querySelector('.weather-status').innerHTML = data.weather[0].main

	updateWeatherIcon(data.weather[0].main)
}

function updateWeatherIcon(weatherMain) {
	if (weatherMain == 'Clouds') {
		weatherIcon.src = weatherSrc[1]
	} else if (weatherMain == 'Rain') {
		weatherIcon.src = weatherSrc[4]
	} else if (weatherMain == 'Snow') {
		weatherIcon.src = weatherSrc[5]
	} else if (weatherMain == 'Clear') {
		weatherIcon.src = weatherSrc[0]
	} else if (weatherMain == 'Mist') {
		weatherIcon.src = weatherSrc[3]
	} else if (weatherMain == 'Drizle') {
		weatherIcon.src = weatherSrc[2]
	}
}

inputCity.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		checkWeather(inputCity.value)
		inputCity.blur()
	}
})

searchBtn.addEventListener('click', function () {
	checkWeather(inputCity.value)
})

navigator.geolocation.getCurrentPosition(
	(position) => {
		const lat = position.coords.latitude
		const lon = position.coords.longitude
		checkWeatherByCoords(lat, lon)
	},
	(error) => {
		console.error('Error getting location: ', error)
	}
)
