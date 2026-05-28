"use client";

import { useEffect, useState } from "react";

import { FaBolt, FaClock, FaTrash } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

interface Notification {
  id: string;

  message: string;

  createdAt: string;
}

export default function ActivityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [activeProjectId, setActiveProjectId] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    setUser(parsedUser);

    fetchNotifications(parsedUser.id);
  }, []);

  async function fetchNotifications(userId: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notifications?userId=${userId}`,
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteNotification(id: string) {
    try {
      await fetch(`http://localhost:3000/api/notifications/${id}`, {
        method: "DELETE",
      });

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  }

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
                Activity Timeline
              </h1>

              <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
                Workspace activity history
              </p>
            </div>

            {/* CONTENT AREA */}

            <div className="max-w-4xl">
              {/* EMPTY */}

              {notifications.length === 0 ? (
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border border-white/10
                    bg-[#0f172a]/90
                    backdrop-blur-2xl
                    shadow-[0_10px_50px_rgba(0,0,0,0.45)]
                    p-10 sm:p-14
                    text-center
                  "
                >
                  {/* GLOW */}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

                  <div
                    className="
                      relative
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

                  <h2 className="relative text-2xl sm:text-3xl font-black text-white">
                    No Activity Yet
                  </h2>

                  <p className="relative text-slate-500 mt-3 text-sm sm:text-base">
                    Task updates and team activity will appear here.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* TIMELINE */}

                  <div
                    className="
                      absolute
                      left-[18px]
                      top-0
                      bottom-0
                      w-px
                      bg-gradient-to-b
                      from-indigo-500/20
                      via-cyan-500/10
                      to-transparent
                    "
                  />

                  {/* FEED */}

                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="
                            group
                            relative
                            flex gap-3
                          "
                      >
                        {/* DOT */}

                        <div
                          className="
                              relative z-10
                              flex-shrink-0
                            "
                        >
                          <div
                            className="
                                h-9 w-9
                                rounded-xl
                                border border-white/10
                                bg-[#111827]
                                flex items-center justify-center
                                text-cyan-400
                                shadow-lg
                              "
                          >
                            <FaBolt size={11} />
                          </div>
                        </div>

                        {/* CARD */}

                        <div
                          className="
                              relative
                              flex-1
                              overflow-hidden
                              rounded-2xl
                              border border-white/[0.04]
                              bg-[#111827]/60
                              backdrop-blur-xl
                              p-4
                              transition-all duration-300
                              hover:border-cyan-500/20
                              hover:bg-cyan-500/[0.04]
                              hover:translate-x-1
                            "
                        >
                          {/* HOVER GLOW */}

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

                          {/* DELETE */}

                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="
                                absolute
                                top-3 right-3
                                h-8 w-8
                                rounded-xl
                                border border-red-500/10
                                bg-red-500/10
                                text-red-400
                                flex items-center justify-center
                                transition-all duration-300
                                hover:bg-red-500/20
                                hover:scale-105
                              "
                          >
                            <FaTrash size={10} />
                          </button>

                          {/* CONTENT */}

                          <div className="pr-10">
                            <p
                              className="
                                  text-[13px]
                                  sm:text-sm
                                  leading-relaxed
                                  text-slate-200
                                  font-semibold
                                  break-words
                                "
                            >
                              {notification.message}
                            </p>

                            <div className="flex items-center gap-2 mt-3">
                              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

                              <p
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-wide
                                    font-bold
                                    text-slate-500
                                  "
                              >
                                {new Date(
                                  notification.createdAt,
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
