import WeatherSkeleton from "./WeatherSkeleton";
import { motion } from "motion/react";

export default function LeftSection({
  weatherData,
  language,
  handleChangeLanguage,
  isLoading,
  error,
}) {
  const iconCode = weatherData?.weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="flex-1 flex flex-col justify-between p-8 pl-24 z-10 w-[60%]"
    >
      <div className="flex items-start justify-between">
        <div className="text-3xl font-bold">
          <span className="text-yellow-500">HE</span>Weather
        </div>

        <select
          value={language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
          className="p-2 rounded-full outline-none cursor-pointer bg-black/20 backdrop-blur-md"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
      {isLoading ? (
        <WeatherSkeleton />
      ) : error ? (
        <p className="text-4xl text-red-600">{error}</p>
      ) : (
        <div className="flex items-center justify-start gap-3 mb-10 mt-7">
          <h1 className="font-bold text-8xl">
            {Math.round(weatherData?.main?.temp)}°
          </h1>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-6xl font-semibold">{weatherData?.name}</h2>
            <p className="mt-2">
              {new Date().toLocaleDateString(
                language === "ar" ? "ar-EG" : "en-US"
              )}
            </p>
          </div>
          <img
            className="w-24 h-24"
            src={iconUrl}
            alt={weatherData?.weather[0]?.description}
          />
        </div>
      )}
    </motion.div>
  );
}
