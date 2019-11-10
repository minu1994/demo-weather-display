
export function getMock(city: string) {
    if (city.toUpperCase() === "MILANO") {
        return {
            "coord": {"lon": 9.19, "lat": 45.46},
            "weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01n"}],
            "base": "stations",
            "main": {"temp": 8.25, "pressure": 1009, "humidity": 93, "temp_min": 4, "temp_max": 10.56},
            "visibility": 10000,
            "wind": {"speed": 1, "deg": 180},
            "rain": {},
            "clouds": {"all": 0},
            "dt": 1573321295,
            "sys": {"type": 1, "id": 6742, "country": "IT", "sunrise": 1573279992, "sunset": 1573315256},
            "timezone": 3600,
            "id": 6542283,
            "name": "Milan",
            "cod": 200
        }
    }
    if (city.toUpperCase() === "BERLINO") {
        return {
            "coord": {"lon": 13.41, "lat": 52.52},
            "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
            "base": "stations",
            "main": {"temp": 6.65, "pressure": 1008, "humidity": 93, "temp_min": 5.56, "temp_max": 7.78},
            "visibility": 10000,
            "wind": {"speed": 3.6, "deg": 250},
            "rain": {},
            "clouds": {"all": 75},
            "dt": 1573317480,
            "sys":
                {"type": 1, "id": 1275, "country": "DE", "sunrise": 1573280193, "sunset": 1573313029},
            "timezone": 3600,
            "id": 2950159,
            "name": "Berlin",
            "cod": 200
        }
    }
    return undefined
}

/*
export function getData(city: string, URL?: string,  callback?: any, appID?: string) {
    const citiesMapper = {
        Italy: {
            label: "italia",
            id: ITALY_MILAN_ID
        },
        Berlin: {
            label: "berlino",
            id: GERMAN_BERLIN_ID
        }
    }
    console.log("appId: ", appID)
    if(appID) {
        return fetchAPI(URL  + "&appid=" + appID, cityID, callback)
    } else {
        return getMock(city)
    }
}*/

export function fetchAPI(URL: string, cityID: number, appID: string, callback: any) {
    const composedURL = URL + "&appid=" + appID + "&id=" + cityID
    fetch(composedURL)
        .then(response => response.json())
        .then(callback)
}

/*
*
ad8618b2a91d1c1e6491511400ca9225


MILANO (Gradi Celsius):
https://api.openweathermap.org/data/2.5/weather?id=6542283&appid=ad8618b2a91d1c1e6491511400ca9225&units=metric

RISULTATO:
{
            "coord": {"lon": 9.19, "lat": 45.46},
            "weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01n"}],
            "base": "stations",
            "main": {"temp": 8.25, "pressure": 1009, "humidity": 93, "temp_min": 4, "temp_max": 10.56},
            "visibility": 10000,
            "wind": {"speed": 1, "deg": 180},
            "rain": {},
            "clouds": {"all": 0},
            "dt": 1573321295,
            "sys": {"type": 1, "id": 6742, "country": "IT", "sunrise": 1573279992, "sunset": 1573315256},
            "timezone": 3600,
            "id": 6542283,
            "name": "Milan",
            "cod": 200
        }

BERLINO:
https://api.openweathermap.org/data/2.5/weather?id=2950159&appid=ad8618b2a91d1c1e6491511400ca9225&units=metric

RISULTATO:
{"coord":{"lon":13.41,"lat":52.52},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
"base":"stations","main":{"temp":6.65,"pressure":1008,"humidity":93,"temp_min":5.56,"temp_max":7.78},
"visibility":10000,"wind":{"speed":3.6,"deg":250},"rain":{},"clouds":{"all":75},"dt":1573317480,"sys":
{"type":1,"id":1275,"country":"DE","sunrise":1573280193,"sunset":1573313029},
"timezone":3600,"id":2950159,"name":"Berlin","cod":200}
* */