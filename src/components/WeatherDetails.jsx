import { FaThermometerHalf, FaTint, FaCloud, FaWind } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function WeatherDetails({ weatherData }) {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="uppercase text-sm text-gray-300">
        {t("Weather Details...")}
      </h3>
      <h2 className="mt-1 font-semibold">
        {weatherData?.weather[0]?.description?.toUpperCase()}
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <span>{t("Temp max")}</span>
          <span className="flex items-center gap-2">
            {Math.round(weatherData?.main?.temp_max)}° <FaThermometerHalf />
          </span>
        </div>
        <div className="flex justify-between">
          <span>{t("Temp min")}</span>
          <span className="flex items-center gap-2">
            {Math.round(weatherData?.main?.temp_min)}° <FaThermometerHalf />
          </span>
        </div>
        <div className="flex justify-between">
          <span>{t("Humidity")}</span>
          <span className="flex items-center gap-2">
            {weatherData?.main?.humidity}% <FaTint />
          </span>
        </div>
        <div className="flex justify-between">
          <span>{t("Cloudy")}</span>
          <span className="flex items-center gap-2">
            {weatherData?.clouds?.all}% <FaCloud />
          </span>
        </div>
        <div className="flex justify-between">
          <span>{t("Wind")}</span>
          <span className="flex items-center gap-2">
            {Math.round(weatherData?.wind?.speed)} km/h <FaWind />
          </span>
        </div>
      </div>
    </div>
  );
}
