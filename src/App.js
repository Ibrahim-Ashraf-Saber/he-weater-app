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

  useEffect(() => {
    const controller = new AbortController();
    async function fetchWeather() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${language}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Failed to fetch weather for ${city}`);
        const data = await res.json();
        if (!data || !data.weather) throw new Error("No weather data found");
        setWeatherData(data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [city, language]);

  useEffect(() => {
    handleUseLocation();
  }, []);

  async function fetchWeatherByCoords(lat, lon) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${language}`
      );
      if (!res.ok) throw new Error(`Failed to fetch weather for ${city}`);
      const data = await res.json();
      if (!data || !data.weather) throw new Error("No weather data found");
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleUseLocation() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
        setIsLoading(false);
        setError("");
      },
      (error) => {
        setError("Unable to retrieve your location");
        setIsLoading(false);
      }
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
