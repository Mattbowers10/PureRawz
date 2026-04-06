"use client";

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-mesh)" }} />

      {/* Animated orbs */}
      {/* Primary crimson — top left */}
      <div
        className="absolute -top-[300px] -left-[200px] w-[700px] h-[700px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(160, 3, 3, 0.18) 0%, transparent 70%)",
          animation: "orb-float-1 20s ease-in-out infinite",
        }}
      />
      {/* Secondary crimson — right mid */}
      <div
        className="absolute top-[40%] -right-[150px] w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(160, 3, 3, 0.12) 0%, transparent 70%)",
          animation: "orb-float-2 25s ease-in-out infinite",
        }}
      />
      {/* Cool blue-teal counterpoint — lower center */}
      <div
        className="absolute top-[55%] left-[45%] w-[500px] h-[400px] rounded-full opacity-12"
        style={{
          background: "radial-gradient(ellipse, rgba(55, 130, 230, 0.07) 0%, transparent 70%)",
          animation: "orb-float-2 35s ease-in-out infinite reverse",
        }}
      />
      {/* Deep indigo — bottom left */}
      <div
        className="absolute -bottom-[200px] left-[20%] w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(88, 28, 135, 0.09) 0%, transparent 70%)",
          animation: "orb-float-1 30s ease-in-out infinite reverse",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top edge light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-700/20 to-transparent" />
    </div>
  );
}
