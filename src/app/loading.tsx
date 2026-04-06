import { FlaskConical } from "lucide-react";

export default function Loading() {
  return (
    <div className="pt-32 lg:pt-40 pb-24 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative inline-flex mb-4">
          <div className="w-14 h-14 rounded-xl bg-crimson-700/10 flex items-center justify-center animate-pulse">
            <FlaskConical className="w-7 h-7 text-crimson-500" />
          </div>
        </div>
        <p className="text-sm text-foreground-subtle animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
