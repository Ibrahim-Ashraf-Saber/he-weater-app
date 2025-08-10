import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";
// import ForecastList from "./ForecastList";
import WeatherDetailsSkeleton from "./WeatherDetailsSkeleton";

export default function RightSection({
  weatherData,
  setCity,
  handleUseLocation,
  isLoading,
  error,
}) {
  return (
    <div className="backdrop-blur-md bg-transparent p-8 flex flex-col gap-8 z-10 w-[35%] pr-24">
      <SearchBar
        setCity={setCity}
        handleUseLocation={handleUseLocation}
        isLoading={isLoading}
      />
      {isLoading ? (
        <WeatherDetailsSkeleton />
      ) : error ? (
        <p className="text-2xl text-red-600">{error}</p>
      ) : (
        <WeatherDetails weatherData={weatherData} />
      )}
      <hr />
      {/* <ForecastList /> */}
    </div>
  );
}
