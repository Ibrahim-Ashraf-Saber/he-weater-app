const weatherBackgrounds = {
  Clear: "/images/clear.jpg",
  Clouds: "/images/clouds.jpg",
  Rain: "/images/rain.jpg",
  Drizzle: "/images/drizzle.jpg",
  Thunderstorm: "/images/thunderstorm.jpg",
  Snow: "/images/snow.jpg",
  Mist: "/images/mist.jpg",
};

export default function Background({ weatherData }) {
  const bgImage =
    weatherBackgrounds[weatherData?.weather[0]?.main] || "/images/clear.jpg";
  return (
    <>
      <div
        className="bg-cover bg-center w-full h-full absolute inset-0 -z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="bg-black/30 w-full h-full absolute inset-0 z-0"></div>
    </>
  );
}
