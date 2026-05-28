"use client";

import Link from "next/link";

import {
  FaArrowRight,
  FaBolt,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
  FaPlus,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4338ca25,transparent_30%),radial-gradient(circle_at_bottom_left,#06b6d425,transparent_35%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LOGO */}

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-black shadow-[0_10px_30px_rgba(59,130,246,0.35)]">
              T
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                TaskFlow
              </h1>

              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold">
                Modern Workspace
              </p>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="h-11 px-5 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-bold text-slate-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="relative overflow-hidden h-11 px-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-sm font-black text-white shadow-[0_10px_35px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.03]">
                <span className="relative z-10">Get Started</span>

                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-14 items-center">
          {/* LEFT */}

          <div>
            {/* BADGE */}

            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 mb-8">
              <FaBolt className="text-cyan-400" />

              <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-cyan-300">
                Advanced Workflow Platform
              </span>
            </div>

            {/* TITLE */}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
              Manage Tasks
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Like Modern SaaS
              </span>
            </h1>

            {/* TEXT */}

            <p className="text-base sm:text-xl text-slate-400 mt-8 leading-relaxed max-w-2xl">
              Organize projects, track dependencies, manage subtasks and
              collaborate with your team using a premium Jira-inspired
              productivity workspace.
            </p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/register">
                <button className="relative overflow-hidden h-14 px-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white text-sm font-black shadow-[0_10px_40px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="relative z-10 inline-flex items-center gap-3">
                    Get Started
                    <FaArrowRight size={12} />
                  </span>
                </button>
              </Link>

              <Link href="/login">
                <button className="h-14 px-8 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-black text-slate-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white">
                  Login Account
                </button>
              </Link>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-3xl font-black text-white">10K+</h3>

                <p className="text-sm text-slate-500 mt-2">Tasks Managed</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-3xl font-black text-white">250+</h3>

                <p className="text-sm text-slate-500 mt-2">Teams Joined</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-3xl font-black text-white">99%</h3>

                <p className="text-sm text-slate-500 mt-2">Productivity</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative rounded-[38px] border border-white/10 bg-[#0f172a]/90 backdrop-blur-2xl p-5 sm:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            {/* GLOW */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none rounded-[38px]" />

            {/* HEADER */}

            <div className="relative flex items-center justify-between mb-7">
              <div>
                <h2 className="text-2xl font-black text-white">
                  Team Workspace
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Live workflow preview
                </p>
              </div>

              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FaChartLine size={15} />
              </div>
            </div>

            {/* BOARD */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* TODO */}

              <div className="rounded-[28px] border border-indigo-500/10 bg-indigo-500/[0.05] p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-400" />

                    <p className="text-xs font-black uppercase tracking-wide text-indigo-300">
                      Todo
                    </p>
                  </div>

                  <span className="text-xs font-black text-slate-500">04</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
                    <h3 className="text-sm font-bold text-white">
                      Setup Backend
                    </h3>

                    <p className="text-xs text-slate-500 mt-2">
                      API integration
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-[#111827] p-4">
                    <h3 className="text-sm font-bold text-white">
                      Add Calendar
                    </h3>

                    <p className="text-xs text-slate-500 mt-2">
                      Timeline planning
                    </p>
                  </div>
                </div>
              </div>

              {/* PROGRESS */}

              <div className="rounded-[28px] border border-cyan-500/10 bg-cyan-500/[0.05] p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />

                    <p className="text-xs font-black uppercase tracking-wide text-cyan-300">
                      Progress
                    </p>
                  </div>

                  <span className="text-xs font-black text-slate-500">02</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-cyan-500/10 bg-[#111827] p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">
                        Dashboard UI
                      </h3>

                      <FaClock className="text-cyan-400 text-xs" />
                    </div>

                    <div className="mt-4">
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-cyan-500/10 bg-[#111827] p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">
                        Analytics
                      </h3>

                      <FaLayerGroup className="text-cyan-400 text-xs" />
                    </div>

                    <div className="mt-4">
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DONE */}

              <div className="rounded-[28px] border border-emerald-500/10 bg-emerald-500/[0.05] p-4">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                    <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                      Done
                    </p>
                  </div>

                  <span className="text-xs font-black text-slate-500">06</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-emerald-500/10 bg-[#111827] p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">
                        Auth System
                      </h3>

                      <FaCheckCircle className="text-emerald-400 text-xs" />
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Completed successfully
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/10 bg-[#111827] p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Database</h3>

                      <FaCheckCircle className="text-emerald-400 text-xs" />
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Production ready
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ADD TASK */}

            <button className="w-full mt-5 h-14 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] text-slate-400 text-sm font-bold transition-all duration-300 hover:bg-white/[0.05] hover:text-white flex items-center justify-center gap-3">
              <FaPlus size={12} />
              Add New Task
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-3 mb-6">
            <FaTasks className="text-indigo-400" />

            <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-indigo-300">
              Premium Features
            </span>
          </div>

          <h2 className="text-5xl font-black text-white">
            Everything For Productivity
          </h2>

          <p className="text-slate-500 text-lg mt-5 max-w-2xl mx-auto">
            Powerful task management tools designed for modern teams and
            scalable workflows.
          </p>
        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD */}

          <div className="rounded-[32px] border border-white/10 bg-[#0f172a]/90 backdrop-blur-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/20">
            <div className="h-16 w-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-7">
              <FaTasks size={22} />
            </div>

            <h3 className="text-2xl font-black text-white">Task Management</h3>

            <p className="text-slate-500 mt-5 leading-relaxed">
              Manage tasks with advanced Kanban boards, sprints and workflow
              tracking.
            </p>
          </div>

          {/* CARD */}

          <div className="rounded-[32px] border border-white/10 bg-[#0f172a]/90 backdrop-blur-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/20">
            <div className="h-16 w-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-7">
              <FaProjectDiagram size={22} />
            </div>

            <h3 className="text-2xl font-black text-white">Dependencies</h3>

            <p className="text-slate-500 mt-5 leading-relaxed">
              Create dependency graphs and manage advanced project
              relationships.
            </p>
          </div>

          {/* CARD */}

          <div className="rounded-[32px] border border-white/10 bg-[#0f172a]/90 backdrop-blur-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/20">
            <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-7">
              <FaUsers size={22} />
            </div>

            <h3 className="text-2xl font-black text-white">Team Workflow</h3>

            <p className="text-slate-500 mt-5 leading-relaxed">
              Collaborate with your team using real-time scalable workspace
              systems.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
