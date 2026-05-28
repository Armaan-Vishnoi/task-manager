"use client";

import {
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";

export default function Loader() {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020617]
        flex items-center justify-center
        px-4
      "
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4338ca25,transparent_30%),radial-gradient(circle_at_bottom_left,#06b6d425,transparent_35%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* LOADER CARD */}

      <div
        className="
          relative
          w-full
          max-w-xl
          overflow-hidden
          rounded-[38px]
          border border-white/10
          bg-[#0f172a]/90
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          p-6 sm:p-8
        "
      >
        {/* GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

        {/* HEADER */}

        <div className="relative flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Loading Workspace
            </h1>

            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Syncing tasks and project data...
            </p>
          </div>

          {/* SPINNER */}

          <div className="relative h-16 w-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-cyan-500/10" />

            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-400 border-r-indigo-500 animate-spin" />

            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_25px_rgba(59,130,246,0.6)]" />
          </div>
        </div>

        {/* TASK BOARD */}

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TODO */}

          <div className="rounded-[26px] border border-indigo-500/10 bg-indigo-500/[0.05] p-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-indigo-400 animate-pulse" />

                <p className="text-[11px] font-black uppercase tracking-wide text-indigo-300">
                  Todo
                </p>
              </div>

              <FaClock className="text-indigo-400 text-xs" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      rounded-2xl
                      border border-white/5
                      bg-[#111827]
                      p-4
                      animate-pulse
                    "
                  >
                    <div className="h-4 rounded-full bg-white/[0.06] w-[75%]" />

                    <div className="h-3 rounded-full bg-white/[0.04] w-[45%] mt-3" />
                  </div>
                )
              )}
            </div>
          </div>

          {/* PROGRESS */}

          <div className="rounded-[26px] border border-cyan-500/10 bg-cyan-500/[0.05] p-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />

                <p className="text-[11px] font-black uppercase tracking-wide text-cyan-300">
                  Progress
                </p>
              </div>

              <FaLayerGroup className="text-cyan-400 text-xs" />
            </div>

            <div className="space-y-3">
              {[1, 2].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      rounded-2xl
                      border border-cyan-500/10
                      bg-[#111827]
                      p-4
                      animate-pulse
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-4 rounded-full bg-white/[0.06] w-[65%]" />

                      <div className="h-4 w-4 rounded-full bg-cyan-500/20" />
                    </div>

                    <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* DONE */}

          <div className="rounded-[26px] border border-emerald-500/10 bg-emerald-500/[0.05] p-4">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />

                <p className="text-[11px] font-black uppercase tracking-wide text-emerald-300">
                  Done
                </p>
              </div>

              <FaCheckCircle className="text-emerald-400 text-xs" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      rounded-2xl
                      border border-emerald-500/10
                      bg-[#111827]
                      p-4
                      animate-pulse
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-4 rounded-full bg-white/[0.06] w-[70%]" />

                      <div className="h-4 w-4 rounded-full bg-emerald-500/20" />
                    </div>

                    <div className="h-3 rounded-full bg-white/[0.04] w-[50%] mt-3" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="relative mt-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              Workspace Sync
            </p>

            <p className="text-xs font-black text-cyan-400">
              Loading...
            </p>
          </div>

          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}