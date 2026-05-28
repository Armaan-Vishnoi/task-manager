"use client";

import { useEffect, useState } from "react";

import { FaBolt, FaCheckCircle, FaClock } from "react-icons/fa";

interface Activity {
  id: string;
  message: string;
  createdAt: string;
}

interface Props {
  user?: {
    id: string;
  };
}

export default function ActivityPanel({ user }: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!user?.id) {
      setActivities([]);
      return;
    }

    fetchActivities(user.id);

    const interval = setInterval(() => {
      fetchActivities(user.id);
    }, 5000);

    return () => clearInterval(interval);
  }, [user?.id]);

  async function fetchActivities(userId: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/activity?userId=${userId}`,
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setActivities(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[26px]
        border border-white/10
        bg-[#0b1120]/95
        backdrop-blur-2xl
        shadow-[0_10px_50px_rgba(0,0,0,0.45)]
      "
    >
      {/* GLOW */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

      {/* HEADER */}

      <div
        className="
          sticky top-0 z-20
          flex items-center justify-between
          px-4 py-4
          border-b border-white/5
          bg-[#0b1120]/90
          backdrop-blur-xl
        "
      >
        <div>
          <h2 className="text-[13px] font-black tracking-[0.18em] uppercase text-white">
            Activity Feed
          </h2>

          <p className="text-[11px] text-slate-500 mt-1">
            Live workspace updates
          </p>
        </div>

        <div
          className="
            h-9 w-9
            rounded-xl
            bg-cyan-500/10
            border border-cyan-500/20
            flex items-center justify-center
            text-cyan-400
          "
        >
          <FaBolt size={12} />
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          overflow-y-auto
          custom-scroll
          p-3
        "
        style={{
          maxHeight: "75vh",
          minHeight: "140px",
        }}
      >
        {activities.length === 0 && (
          <div
            className="
              rounded-2xl
              border border-dashed border-white/10
              bg-white/[0.03]
              p-7
              text-center
            "
          >
            <div
              className="
                mx-auto mb-4
                h-12 w-12
                rounded-2xl
                bg-white/[0.04]
                border border-white/10
                flex items-center justify-center
                text-slate-500
              "
            >
              <FaClock size={16} />
            </div>

            <p className="text-sm font-semibold text-slate-400">
              No activity yet
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Team updates will appear here
            </p>
          </div>
        )}

        <div className="relative">
          {/* TIMELINE */}

          {activities.length > 0 && (
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-indigo-500/20 to-transparent" />
          )}

          <div className="space-y-2.5">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="
                  group
                  relative
                  flex gap-3
                  rounded-2xl
                  border border-white/5
                  bg-white/[0.025]
                  p-3
                  transition-all duration-300
                  hover:border-cyan-500/20
                  hover:bg-cyan-500/[0.04]
                  hover:translate-x-1
                "
              >
                {/* ICON */}

                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="
                      h-9 w-9
                      rounded-xl
                      border border-white/10
                      bg-[#111827]
                      flex items-center justify-center
                      text-emerald-400
                      shadow-lg
                      transition-all duration-300
                      group-hover:scale-105
                    "
                  >
                    <FaCheckCircle size={11} />
                  </div>
                </div>

                {/* TEXT */}

                <div className="flex-1 min-w-0">
                  <p
                    className="
                      text-[13px]
                      leading-relaxed
                      text-slate-200
                      font-medium
                      break-words
                    "
                  >
                    {activity.message}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

                    <p className="text-[10px] uppercase tracking-wide font-bold text-slate-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* HOVER LIGHT */}

                <div
                  className="
                    absolute inset-0
                    rounded-2xl
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                    bg-gradient-to-r
                    from-cyan-500/[0.03]
                    to-indigo-500/[0.03]
                    pointer-events-none
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
