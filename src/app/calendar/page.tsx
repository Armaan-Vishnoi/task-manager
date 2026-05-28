"use client";

import { useEffect, useState } from "react";

import Calendar from "react-calendar";

// @ts-ignore
import "react-calendar/dist/Calendar.css";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

interface Task {
  id: string;

  title: string;

  dueDate?: string;

  status: string;
}

export default function CalendarPage() {
  const [user, setUser] = useState<any>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [date, setDate] = useState(new Date());

  const [activeProjectId, setActiveProjectId] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  const selectedTasks = tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }

    return new Date(task.dueDate).toDateString() === date.toDateString();
  });

  const completedCount = selectedTasks.filter(
    (task) => task.status === "DONE",
  ).length;

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
                Calendar
              </h1>

              <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
                Task scheduling, planning & deadlines
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
                      Selected Date
                    </p>

                    <h2 className="text-xl font-black text-white mt-3 leading-snug">
                      {date.toDateString()}
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
                    <FaCalendarAlt size={18} />
                  </div>
                </div>
              </div>

              {/* TASKS */}

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
                      Tasks
                    </p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {selectedTasks.length}
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
                    <FaLayerGroup size={18} />
                  </div>
                </div>
              </div>

              {/* COMPLETED */}

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
                      {completedCount}
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

              {/* PENDING */}

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
                      Pending
                    </p>

                    <h2 className="text-4xl font-black text-white mt-3">
                      {selectedTasks.length - completedCount}
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
            </div>

            {/* MAIN */}

            <div className="grid grid-cols-1 2xl:grid-cols-[420px_1fr] gap-6">
              {/* CALENDAR */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border border-white/10
                  bg-[#0f172a]/90
                  backdrop-blur-2xl
                  shadow-[0_10px_50px_rgba(0,0,0,0.45)]
                  p-5
                "
              >
                {/* GLOW */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

                {/* HEADER */}

                <div className="relative mb-5">
                  <h2 className="text-2xl font-black text-white">Schedule</h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Plan and track tasks by deadline
                  </p>
                </div>

                {/* CALENDAR */}

                <div className="relative calendar-dark">
                  <Calendar
                    onChange={(value) => setDate(value as Date)}
                    value={date}
                  />
                </div>
              </div>

              {/* TASKS */}

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
                      Scheduled Tasks
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Tasks planned for {date.toDateString()}
                    </p>
                  </div>

                  <div
                    className="
                      inline-flex
                      items-center gap-3
                      rounded-2xl
                      border border-cyan-500/20
                      bg-cyan-500/10
                      px-4 py-3
                    "
                  >
                    <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />

                    <div>
                      <p className="text-[11px] uppercase tracking-wide font-bold text-cyan-300">
                        Active
                      </p>

                      <h3 className="text-xl font-black text-white">
                        {selectedTasks.length}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* TASK LIST */}

                <div className="relative p-4 sm:p-6">
                  {selectedTasks.length === 0 ? (
                    <div
                      className="
                        rounded-[28px]
                        border border-dashed border-white/10
                        bg-white/[0.03]
                        p-10
                        text-center
                      "
                    >
                      <div
                        className="
                          mx-auto mb-5
                          h-16 w-16
                          rounded-3xl
                          border border-white/10
                          bg-white/[0.04]
                          flex items-center justify-center
                          text-slate-500
                        "
                      >
                        <FaClock size={20} />
                      </div>

                      <h3 className="text-2xl font-black text-white">
                        No Tasks Scheduled
                      </h3>

                      <p className="text-slate-500 mt-3 text-sm sm:text-base">
                        No tasks found for this date.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="
                              group
                              relative
                              overflow-hidden
                              rounded-[26px]
                              border border-white/10
                              bg-[#111827]/60
                              backdrop-blur-xl
                              p-5
                              transition-all duration-300
                              hover:border-cyan-500/20
                              hover:bg-cyan-500/[0.04]
                              hover:-translate-y-1
                            "
                        >
                          {/* GLOW */}

                          <div
                            className="
                                absolute inset-0
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity duration-300
                                bg-gradient-to-r
                                from-cyan-500/[0.03]
                                to-indigo-500/[0.03]
                                pointer-events-none
                              "
                          />

                          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                            {/* LEFT */}

                            <div className="min-w-0">
                              <h3
                                className="
                                    text-lg sm:text-xl
                                    font-black
                                    text-white
                                    leading-snug
                                    break-words
                                  "
                              >
                                {task.title}
                              </h3>

                              <p className="text-slate-500 mt-2 text-sm">
                                Due on{" "}
                                {new Date(
                                  task.dueDate || "",
                                ).toLocaleDateString()}
                              </p>
                            </div>

                            {/* STATUS */}

                            <div
                              className={`
                                  inline-flex
                                  items-center
                                  justify-center
                                  px-4 py-2.5
                                  rounded-2xl
                                  text-xs
                                  font-black
                                  uppercase
                                  tracking-wide
                                  border
                                  ${
                                    task.status === "DONE"
                                      ? `
                                        bg-emerald-500/10
                                        border-emerald-500/20
                                        text-emerald-300
                                      `
                                      : task.status === "IN_PROGRESS"
                                        ? `
                                        bg-cyan-500/10
                                        border-cyan-500/20
                                        text-cyan-300
                                      `
                                        : `
                                        bg-slate-500/10
                                        border-slate-500/20
                                        text-slate-300
                                      `
                                  }
                                `}
                            >
                              {task.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
