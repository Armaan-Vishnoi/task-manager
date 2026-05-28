"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";

interface Props {
  todo: number;

  progress: number;

  done: number;
}

export default function TaskAnalytics({
  todo,
  progress,
  done,
}: Props) {
  const data = [
    {
      name: "TODO",
      value: todo,
      color: "#8B5CF6",
      bg: "from-violet-500/15 to-indigo-500/5",
      border:
        "border-violet-500/20",
      text: "text-violet-300",
      icon: (
        <FaClock size={13} />
      ),
    },

    {
      name: "IN PROGRESS",
      value: progress,
      color: "#06B6D4",
      bg: "from-cyan-500/15 to-blue-500/5",
      border:
        "border-cyan-500/20",
      text: "text-cyan-300",
      icon: (
        <FaLayerGroup
          size={13}
        />
      ),
    },

    {
      name: "DONE",
      value: done,
      color: "#10B981",
      bg: "from-emerald-500/15 to-green-500/5",
      border:
        "border-emerald-500/20",
      text: "text-emerald-300",
      icon: (
        <FaCheckCircle
          size={13}
        />
      ),
    },
  ];

  const total =
    todo + progress + done;

  const completionRate =
    total === 0
      ? 0
      : Math.round(
          (done / total) * 100
        );

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-[#0f172a]/90
        backdrop-blur-2xl
        shadow-[0_10px_50px_rgba(0,0,0,0.45)]
      "
    >
      {/* GLOW */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

      {/* HEADER */}

      <div
        className="
          relative
          flex flex-col lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          px-5 sm:px-7
          py-5
          border-b border-white/5
        "
      >
        {/* TITLE */}

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Task Analytics
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Workspace productivity
            overview
          </p>
        </div>

        {/* COMPLETION */}

        <div
          className="
            inline-flex
            items-center gap-4
            rounded-2xl
            border border-emerald-500/20
            bg-emerald-500/10
            px-5 py-4
            self-start
          "
        >
          <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

          <div>
            <p className="text-[11px] uppercase tracking-wide font-black text-emerald-300">
              Completion Rate
            </p>

            <h3 className="text-2xl font-black text-white mt-1">
              {completionRate}%
            </h3>
          </div>
        </div>
      </div>

      {/* CHART */}

      <div
        className="
          relative
          grid
          grid-cols-1
          xl:grid-cols-[420px_1fr]
          gap-6
          p-5 sm:p-7
        "
      >
        {/* PIE */}

        <div
          className="
            relative
            flex items-center justify-center
            rounded-[28px]
            border border-white/10
            bg-[#111827]/60
            backdrop-blur-xl
            min-h-[360px]
          "
        >
          {/* CENTER */}

          <div
            className="
              absolute z-10
              h-32 w-32
              rounded-full
              border border-white/10
              bg-[#020617]/90
              backdrop-blur-xl
              flex flex-col items-center justify-center
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
            "
          >
            <p className="text-[11px] uppercase tracking-wide font-black text-slate-500">
              Total
            </p>

            <h2 className="text-4xl font-black text-white mt-1">
              {total}
            </h2>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={125}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="transparent"
                >
                  {data.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.color
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background:
                      "#0f172a",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius:
                      "18px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
          {data.map((item) => (
            <div
              key={item.name}
              className={`
                relative
                overflow-hidden
                rounded-[28px]
                border
                ${item.border}
                bg-gradient-to-br
                ${item.bg}
                backdrop-blur-xl
                p-5
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              `}
            >
              {/* HOVER GLOW */}

              <div
                className="
                  absolute inset-0
                  opacity-0 hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-r
                  from-white/[0.03]
                  to-transparent
                  pointer-events-none
                "
              />

              <div className="relative flex items-start justify-between">
                {/* LEFT */}

                <div>
                  <p
                    className={`
                      text-[11px]
                      uppercase
                      tracking-[0.18em]
                      font-black
                      ${item.text}
                    `}
                  >
                    {item.name}
                  </p>

                  <h3 className="text-5xl font-black text-white mt-4">
                    {item.value}
                  </h3>

                  <p className="text-sm text-slate-500 mt-3">
                    {total === 0
                      ? 0
                      : Math.round(
                          (item.value /
                            total) *
                            100
                        )}
                    % of total tasks
                  </p>
                </div>

                {/* ICON */}

                <div
                  className={`
                    h-14 w-14
                    rounded-2xl
                    border
                    flex items-center justify-center
                    ${item.border}
                    ${item.text}
                    bg-[#020617]/50
                    shadow-lg
                  `}
                >
                  {item.icon}
                </div>
              </div>

              {/* PROGRESS */}

              <div className="mt-5">
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        total === 0
                          ? 0
                          : (item.value /
                              total) *
                            100
                      }%`,
                      background:
                        item.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}