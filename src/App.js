import { useEffect, useState } from "react";
import Background from "./components/Background";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
import { ToastContainer, Bounce } from "react-toastify";
import { useTranslation } from "react-i18next";

const API_KEY = "21034e9de31b09ec9a73c70cf65d65e1";

export default function App() {
  const [city, setCity] = useState("cairo");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

  async function fetchWeatherData({ cityName, lat, lon }) {
    try {
      setIsLoading(true);
      setError("");

      const url =
        lat && lon
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${language}`
          : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=${language}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch weather data`);

      const data = await res.json();
      if (!data.weather) throw new Error("No weather data found");

      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWeatherData({ cityName: city });
  }, [city, language]);

  function handleUseLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        fetchWeatherData({ lat: coords.latitude, lon: coords.longitude }),
      () => setError("Unable to retrieve your location")
    );
  }

  function handleChangeLanguage(value) {
    i18n.changeLanguage(value);
    setLanguage(value);
  }

  return (
    <div
      className="min-h-screen w-screen flex text-white"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Background weatherData={weatherData} />

      <LeftSection
        weatherData={weatherData}
        language={language}
        handleChangeLanguage={handleChangeLanguage}
        isLoading={isLoading}
        error={error}
      />
      <RightSection
        weatherData={weatherData}
        setCity={setCity}
        handleUseLocation={handleUseLocation}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
