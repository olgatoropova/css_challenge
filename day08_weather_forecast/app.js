const wrapperElement = document.querySelector('.wrapper');

const daysOfWeekMap = {
	0: 'SUN',
	1: 'MON',
	2: 'TUE',
	3: 'WED',
	4: 'THU',
	5: 'FRI',
	6: 'SAT'
};

const iconNameToSizeMap = {
	cloudy: { width: 264, height: 166 },
	sunny: { width: 208, height: 213 },
	stormy: { width: 246, height: 187 },
	snowy: { width: 230, height: 196 },
	rainy: { width: 160, height: 222 },
	'partly-cloudy': { width: 230, height: 209 }
};

const getWeatherTypeByCode = (weatherCode) => {
	switch (Math.round(weatherCode / 100)) {
		case 2:
			return 'stormy';
		case 3:
		case 5:
			return 'rainy';
		case 6:
			return 'snowy';
		case 8:
			return weatherCode == 800
				? 'sunny'
				: weatherCode == 801
				? 'partly-cloudy'
				: 'cloudy';
		default:
			console.error(`Unknown weather type code ${weatherCode}`);
			return 'sunny';
	}
};

const getWeatherForecast = async () => {
	try {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'API_KEY!!!',
				'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
			}
		};

		const res = await fetch(
			'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=74.1111&lon=-57.0592',
			options
		);
		const data = await res.json();
		console.log(data);

		const retVal = data.data.map((dayWeather) => {
			return {
				date: dayWeather.valid_date,
				minTemp: Math.round(dayWeather.min_temp),
				maxTemp: Math.round(dayWeather.max_temp),
				pop: dayWeather.pop,
				weatherType: getWeatherTypeByCode(dayWeather.weather.code)
			};
		});
		console.log(retVal);
		return retVal;
	} catch (err) {
		console.error(err);
	}
};

const updateUI = (weatherData) => {
	let weatherHTML = '';
	for (i = 0; i < 7; i++) {
		// adding time for correct timezone initialization
		const date = new Date(weatherData[i].date + 'T12:00');
		const weatherType = weatherData[i].weatherType;
		const width = iconNameToSizeMap[weatherType].width;
		const height = iconNameToSizeMap[weatherType].height;

		weatherHTML += `<div class="day ${weatherType}">
            <span class="day-of-week">${daysOfWeekMap[date.getDay()]}</span>
            <span class="date">${date.getDate()}</span>
            <div class="bar">
                <div class="weather">
                    <svg role="img" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                        <use xlink:href="#${weatherType}"></use>
                    </svg>
                </div>
                <div class="high-temp">
                    ${weatherData[i].maxTemp}<span class="degrees">&deg;</span>
                </div>
                <div class="content">
                    <div class="precipitation">
                        <svg role="img" class="icon">
                            <use xlink:href="#precipitation"></use>
                        </svg>
                        ${weatherData[i].pop}%
                    </div>
                    <div class="low-temp">
                        <svg role="img" class="icon">
                            <use xlink:href="#low-temp"></use>
                        </svg>
                        ${weatherData[i].minTemp}&deg;
                    </div>
                </div>
            </div>
        </div>`;
	}

	wrapperElement.innerHTML = weatherHTML;
};

const loadItUp = async () => {
	const weatherData = await getWeatherForecast();
	updateUI(weatherData);
};

loadItUp();
