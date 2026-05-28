export default function TaskSkeleton() {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border border-white/10
        bg-[#111827]/70
        backdrop-blur-xl
        p-4
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        animate-pulse
      "
    >
      {/* TOP STATUS LINE */}

      <div
        className="
          absolute top-0 left-0
          h-1 w-full
          bg-gradient-to-r
          from-indigo-500/60
          via-cyan-500/60
          to-emerald-500/60
        "
      />

      {/* GLOW */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d415,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca15,transparent_35%)] pointer-events-none" />

      {/* HEADER */}

      <div className="relative flex items-start gap-3">
        {/* ICON */}

        <div
          className="
            h-11 w-11
            flex-shrink-0
            rounded-2xl
            bg-white/[0.06]
            border border-white/10
          "
        />

        {/* TITLE */}

        <div className="flex-1 min-w-0">
          <div
            className="
              h-5
              w-[75%]
              rounded-xl
              bg-white/[0.06]
            "
          />

          <div
            className="
              h-3
              w-24
              rounded-full
              bg-white/[0.05]
              mt-3
            "
          />
        </div>

        {/* ACTION */}

        <div
          className="
            h-8 w-8
            rounded-xl
            bg-white/[0.05]
            border border-white/5
          "
        />
      </div>

      {/* BADGES */}

      <div className="relative flex flex-wrap gap-2 mt-5">
        <div
          className="
            h-8
            w-24
            rounded-xl
            bg-red-500/10
            border border-red-500/10
          "
        />

        <div
          className="
            h-8
            w-28
            rounded-xl
            bg-cyan-500/10
            border border-cyan-500/10
          "
        />

        <div
          className="
            h-8
            w-20
            rounded-xl
            bg-indigo-500/10
            border border-indigo-500/10
          "
        />
      </div>

      {/* USER CARD */}

      <div
        className="
          relative
          mt-5
          rounded-2xl
          border border-white/5
          bg-white/[0.03]
          p-3
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              h-10 w-10
              rounded-xl
              bg-white/[0.06]
            "
          />

          <div className="flex-1">
            <div
              className="
                h-3
                w-20
                rounded-full
                bg-white/[0.05]
              "
            />

            <div
              className="
                h-4
                w-28
                rounded-full
                bg-white/[0.06]
                mt-2
              "
            />
          </div>
        </div>
      </div>

      {/* BUTTONS */}

      <div className="relative flex flex-wrap gap-2 mt-5">
        <div
          className="
            h-10
            w-24
            rounded-xl
            bg-white/[0.05]
            border border-white/5
          "
        />

        <div
          className="
            h-10
            w-28
            rounded-xl
            bg-cyan-500/10
            border border-cyan-500/10
          "
        />

        <div
          className="
            h-10
            w-20
            rounded-xl
            bg-emerald-500/10
            border border-emerald-500/10
          "
        />
      </div>

      {/* SHIMMER */}

      <div
        className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_2s_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/[0.04]
          to-transparent
        "
      />
    </div>
  );
}