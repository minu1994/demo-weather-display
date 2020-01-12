

export function fetchAPI(URL: string, cityID: number, appID: string, callback: any) {
    const composedURL = URL + "&appid=" + appID + "&id=" + cityID
    fetch(composedURL)
        .then(response => response.json())
        .then(callback)
}
