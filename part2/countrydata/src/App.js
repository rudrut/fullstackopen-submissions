import React, { useState, useEffect } from "react";
import axios from "axios";

const access_key = process.env.REACT_APP_API_KEY;

let temperature;
let windSpeed;
let windDirection = "";
let imageSource = "";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [showAll, setShowAll] = useState(false);
	const [search, setSearch] = useState("");

	const countriesToShow = showAll
		? countries
		: countries.filter((country) =>
				country.name.toLowerCase().includes(search.toLowerCase())
		  );

	const showTenCountries =
		countriesToShow.length > 1 && countriesToShow.length <= 10;

	const moreThanTenCountries = countriesToShow.length > 10;

	const showCountryInfo = (name) => setSearch(name);

	useEffect(() => {
		console.log("effect");
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			console.log("promise fulfilled");
			setCountries(response.data);
		});
	}, []);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
		//console.log(search)
	};

	return (
		<div>
			<div>
				find countries
				<input value={search} onChange={handleSearchChange}></input>
			</div>
			<div>
				{moreThanTenCountries
					? "too many entries, specify filter"
					: showTenCountries
					? countriesToShow.map((country) => {
							return (
								<div key={country.name}>
									{country.name}{" "}
									<button onClick={() => showCountryInfo(country.name)}>
										{" "}
										show{" "}
									</button>
								</div>
							);
					  })
					: countriesToShow.map((country) => {
							const params = { access_key: access_key, query: country.capital };
							axios
								.get("http://api.weatherstack.com/current", { params })
								.then((response) => {
									const apiResponse = response.data;
									console.log(apiResponse);
									temperature = apiResponse.current.temperature;
									windSpeed = apiResponse.current.wind_speed;
									imageSource = apiResponse.current.weather_icons;
									windDirection = apiResponse.current.wind_dir;
								})
								.catch((error) => {
									console.log(error);
								});
							return (
								<div key={country.name}>
									<h2>{country.name}</h2>
									<p>capital {country.capital}</p>
									<p>population {country.population}</p>
									<h3>languages</h3>
									<ul>
										{country.languages.map((language) => (
											<li key={language.name}>{language.name}</li>
										))}
									</ul>
									<img
										src={country.flag}
										alt='flag'
										style={{ width: 300, height: 250 }}
									/>
									<h3>weather in {country.capital}</h3>
									<h4>temperature:</h4> {temperature}℃
									<img
										src={imageSource}
										alt='weather'
										style={{ width: 50, height: 50 }}
									/>
									<h4>
										wind: {windSpeed}mph direction: {windDirection}
									</h4>
								</div>
							);
					  })}
			</div>
		</div>
	);
};

export default App;
