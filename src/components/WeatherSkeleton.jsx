import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WeatherSkeleton() {
  return (
    <div className="flex mb-10 mt-7 items-center gap-3 justify-start">
      <h1 className="text-8xl font-bold">
        <Skeleton width={100} height={100} />
      </h1>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-6xl font-semibold">
          <Skeleton width={160} height={50} />
        </h2>
        <p className="mt-2">
          <Skeleton width={120} height={20} />
        </p>
      </div>

      <div className="w-24 h-24">
        <Skeleton circle={true} height={96} width={96} />
      </div>
    </div>
  );
}
