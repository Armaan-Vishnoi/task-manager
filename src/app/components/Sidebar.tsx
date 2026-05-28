"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FaFolder,
  FaPlus,
  FaChartPie,
  FaHistory,
  FaCalendarAlt,
  FaChevronLeft,
} from "react-icons/fa";

interface Project {
  id: string;
  name: string;
}

interface Props {
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  openProjectModal: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export default function Sidebar({
  activeProjectId,
  setActiveProjectId,
  openProjectModal,
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  const [projects, setProjects] = useState<Project[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await fetch(
        `http://localhost:3000/api/projects?userId=${user.id}`,
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* MOBILE OVERLAY */}

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen
          w-[300px]
          flex-shrink-0
          overflow-hidden
          border-r border-white/10
          bg-[#020617]/95
          backdrop-blur-2xl
          shadow-[0_10px_60px_rgba(0,0,0,0.45)]
          transition-all duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#4338ca20,transparent_35%),radial-gradient(circle_at_bottom_right,#06b6d420,transparent_30%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* HEADER */}

          <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                TaskFlow
              </h1>

              <p className="text-xs text-slate-500 mt-1 font-medium">
                Project Workspace
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openProjectModal}
                className="
                  h-11 w-11
                  flex items-center justify-center
                  rounded-2xl
                  bg-gradient-to-r from-indigo-500 to-cyan-500
                  text-white
                  shadow-lg
                  transition-all duration-300
                  hover:scale-105
                "
              >
                <FaPlus size={14} />
              </button>

              <button
                onClick={() => setSidebarOpen(false)}
                className="
                  lg:hidden
                  h-11 w-11
                  flex items-center justify-center
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  text-slate-300
                "
              >
                <FaChevronLeft size={13} />
              </button>
            </div>
          </div>

          {/* PROJECTS */}

          <div className="flex-1 overflow-y-auto custom-scroll px-4 py-5">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">
                Projects
              </h2>

              <span className="text-[11px] font-bold text-slate-500">
                {projects.length}
              </span>
            </div>

            <div className="space-y-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    localStorage.setItem("activeProjectId", project.id);

                    setActiveProjectId(project.id);

                    router.push("/dashboard");

                    setSidebarOpen(false);
                  }}
                  className={`
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-2xl
                    border
                    px-4 py-3.5
                    transition-all duration-300
                    text-left
                    ${
                      activeProjectId === project.id
                        ? `
                          border-indigo-500/30
                          bg-gradient-to-r
                          from-indigo-500/20
                          to-cyan-500/10
                        `
                        : `
                          border-white/5
                          bg-white/[0.03]
                        `
                    }
                  `}
                >
                  <div className="relative flex items-center gap-3">
                    <div
                      className={`
                        h-10 w-10
                        flex items-center justify-center
                        rounded-xl
                        ${
                          activeProjectId === project.id
                            ? "bg-indigo-500 text-white"
                            : "bg-white/5 text-slate-400"
                        }
                      `}
                    >
                      <FaFolder size={14} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`
                          text-sm
                          font-semibold
                          truncate
                          ${
                            activeProjectId === project.id
                              ? "text-white"
                              : "text-slate-300"
                          }
                        `}
                      >
                        {project.name}
                      </p>

                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Workspace Project
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* NAVIGATION */}

            <div className="mt-8">
              <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 px-1">
                Workspace
              </h2>

              <div className="space-y-2">
                <Link
                  href="/analytics"
                  className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5"
                >
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <FaChartPie size={14} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Analytics
                    </p>
                  </div>
                </Link>

                <Link
                  href="/activity"
                  className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5"
                >
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                    <FaHistory size={14} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Activity
                    </p>
                  </div>
                </Link>

                <Link
                  href="/calendar"
                  className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5"
                >
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <FaCalendarAlt size={14} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Calendar
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* FOOTER */}

          <div className="border-t border-white/5 p-4">
            <div className="rounded-2xl border border-indigo-500/10 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-4">
              <p className="text-sm font-bold text-white">
                Productivity Workspace
              </p>

              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Manage projects, tasks, analytics and collaboration in one
                place.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
