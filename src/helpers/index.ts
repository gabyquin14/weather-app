export const imageCodes = {
  "01d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg",
  "02d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-2.svg",
  "03d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg",
  "04d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg",
  "09d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-4.svg",
  "10d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg",
  "11d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/thunder.svg",
  "13d":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg",
  "50d": "https://loading.io/icon/z1zctu",
  "01n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg",
  "02n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-2.svg",
  "03n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg",
  "04n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg",
  "09n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-4.svg",
  "10n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg",
  "11n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/thunder.svg",
  "13n":
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg",
  "50n": "https://loading.io/icon/z1zctu",
};

export const returnImage = (icon: keyof typeof imageCodes): string => {
  return imageCodes[icon];
};
