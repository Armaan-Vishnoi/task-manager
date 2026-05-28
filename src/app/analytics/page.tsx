"use client";

import { useEffect, useState } from "react";

import {
  FaChartPie,
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskAnalytics from "../components/TaskAnalytics";
import Loader from "../components/Loader";

export default function AnalyticsPage() {
  const [tasks, setTasks] = useState<any[]>([]);

  const [activeProjectId, setActiveProjectId] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");

      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const todoTasks = tasks.filter((task) => task.status === "TODO");

  const progressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");

  const doneTasks = tasks.filter((task) => task.status === "DONE");

  const totalTasks = tasks.length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((doneTasks.length / totalTasks) * 100);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* SIDEBAR */}

      <Sidebar
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        openProjectModal={() => {}}
      />

      {/* CONTENT */}

      <div className="flex-1 overflow-x-hidden">
        <Navbar
          user={user}
          setSidebarOpen={setSidebarOpen}
          onLogout={() => {
            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href = "/login";
          }}
        />

        {/* PAGE */}

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* HEADER */}

            <div className="mb-8">
              <h1
                className="
                  text-4xl sm:text-5xl
                  font-black
                  tracking-tight
                  bg-gradient-to-r
                  from-indigo-400
                  via-cyan-400
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                Analytics
              </h1>

              <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
                Workspace productivity insights & team performance
              </p>
            </div>

            {/* STATS */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-4
                mb-8
              "
            >
              {/* TOTAL */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-[#0f172a]/90
                  backdrop-blur-2xl
                  p-5
                  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold">
                      Total Tasks
                    </p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {totalTasks}
                    </h2>
                  </div>

                  <div
                    className="
                      h-14 w-14
                      rounded-2xl
                      bg-indigo-500/10
                      border border-indigo-500/20
                      flex items-center justify-center
                      text-indigo-400
                    "
                  >
                    <FaLayerGroup size={18} />
                  </div>
                </div>
              </div>

              {/* TODO */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-[#0f172a]/90
                  backdrop-blur-2xl
                  p-5
                  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold">
                      Todo
                    </p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {todoTasks.length}
                    </h2>
                  </div>

                  <div
                    className="
                      h-14 w-14
                      rounded-2xl
                      bg-rose-500/10
                      border border-rose-500/20
                      flex items-center justify-center
                      text-rose-400
                    "
                  >
                    <FaClock size={18} />
                  </div>
                </div>
              </div>

              {/* PROGRESS */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-[#0f172a]/90
                  backdrop-blur-2xl
                  p-5
                  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold">
                      In Progress
                    </p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {progressTasks.length}
                    </h2>
                  </div>

                  <div
                    className="
                      h-14 w-14
                      rounded-2xl
                      bg-cyan-500/10
                      border border-cyan-500/20
                      flex items-center justify-center
                      text-cyan-400
                    "
                  >
                    <FaChartPie size={18} />
                  </div>
                </div>
              </div>

              {/* DONE */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-[#0f172a]/90
                  backdrop-blur-2xl
                  p-5
                  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold">
                      Completed
                    </p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {doneTasks.length}
                    </h2>
                  </div>

                  <div
                    className="
                      h-14 w-14
                      rounded-2xl
                      bg-emerald-500/10
                      border border-emerald-500/20
                      flex items-center justify-center
                      text-emerald-400
                    "
                  >
                    <FaCheckCircle size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* ANALYTICS */}

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
                  flex flex-col sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  px-5 sm:px-7
                  py-5
                  border-b border-white/5
                "
              >
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Productivity Overview
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Task distribution & completion analysis
                  </p>
                </div>

                {/* COMPLETION */}

                <div
                  className="
                    inline-flex
                    items-center gap-3
                    rounded-2xl
                    border border-emerald-500/20
                    bg-emerald-500/10
                    px-4 py-3
                  "
                >
                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

                  <div>
                    <p className="text-[11px] uppercase tracking-wide font-bold text-emerald-300">
                      Completion
                    </p>

                    <h3 className="text-xl font-black text-white">
                      {completionRate}%
                    </h3>
                  </div>
                </div>
              </div>

              {/* CHART */}

              <div className="relative p-4 sm:p-6 lg:p-8">
                <TaskAnalytics
                  todo={todoTasks.length}
                  progress={progressTasks.length}
                  done={doneTasks.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
