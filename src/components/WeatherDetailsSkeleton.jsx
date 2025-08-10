import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WeatherDetailsSkeleton() {
  return (
    <div>
      <h3 className="uppercase text-sm text-gray-300">
        <Skeleton width={120} />
      </h3>

      <h2 className="mt-1 font-semibold">
        <Skeleton width={200} height={30} />
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <span>
              <Skeleton width={80} />
            </span>

            <span className="flex items-center gap-2">
              <Skeleton width={50} />
              <Skeleton circle={true} width={20} height={20} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
