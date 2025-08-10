import { FaSnowflake } from "react-icons/fa";

export default function ForecastList() {
  return (
    <div>
      <h3 className="uppercase text-sm text-gray-300">
        Today's Weather Forecast...
      </h3>
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <FaSnowflake /> 09:00 Snow
          </span>
          <span>19°</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <FaSnowflake /> 10:00 Snow
          </span>
          <span>19°</span>
        </div>
      </div>
    </div>
  );
}
