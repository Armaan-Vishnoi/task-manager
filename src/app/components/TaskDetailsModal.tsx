"use client";

import { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaLayerGroup,
  FaLink,
  FaSave,
  FaTimes,
} from "react-icons/fa";

interface Task {
  id: string;

  title: string;

  description?: string;

  status: string;

  priority: string;

  dueDate?: string;

  parentTaskId?: string;

  blockedByIds: string[];
}

interface Props {
  task: Task | null;

  open: boolean;

  onClose: () => void;
}

export default function TaskDetailsModal({ task, open, onClose }: Props) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");

      setDescription(task.description || "");

      setPriority(task.priority || "");

      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    }
  }, [task]);

  async function saveTask() {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/tasks/${task?.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title,
            description,
            priority,
            dueDate,
          }),
        },
      );

      const data = await response.json();

      if (data.error) {
        alert(data.error);

        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!open || !task) {
    return null;
  }

  const statusColor =
    task.status === "DONE"
      ? "from-emerald-500 to-green-500"
      : task.status === "IN_PROGRESS"
        ? "from-cyan-500 to-blue-500"
        : "from-indigo-500 to-violet-500";

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex justify-end
        bg-black/70
        backdrop-blur-md
      "
    >
      {/* PANEL */}

      <div
        className="
          relative
          h-screen
          w-full
          sm:max-w-2xl
          overflow-hidden
          border-l border-white/10
          bg-[#020617]/95
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          animate-[slideIn_.25s_ease]
        "
      >
        {/* GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

        {/* CONTENT */}

        <div className="relative h-full flex flex-col">
          {/* HEADER */}

          <div
            className="
              sticky top-0 z-30
              border-b border-white/5
              bg-[#020617]/90
              backdrop-blur-xl
              px-5 sm:px-7
              py-5
            "
          >
            <div className="flex items-start gap-4">
              {/* ICON */}

              <div
                className={`
                  h-14 w-14
                  flex-shrink-0
                  rounded-2xl
                  bg-gradient-to-r
                  ${statusColor}
                  flex items-center justify-center
                  text-white
                  shadow-lg
                  text-xl
                  font-black
                `}
              >
                {title?.charAt(0)?.toUpperCase()}
              </div>

              {/* TITLE */}

              <div className="flex-1 min-w-0">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="
                    w-full
                    bg-transparent
                    text-2xl sm:text-4xl
                    font-black
                    text-white
                    outline-none
                    placeholder:text-slate-600
                  "
                />

                <div className="flex items-center gap-2 mt-3">
                  <div
                    className={`
                      h-2 w-2
                      rounded-full
                      ${
                        task.status === "DONE"
                          ? "bg-emerald-400"
                          : task.status === "IN_PROGRESS"
                            ? "bg-cyan-400"
                            : "bg-indigo-400"
                      }
                    `}
                  />

                  <p className="text-xs uppercase tracking-[0.15em] font-bold text-slate-500">
                    Task Details
                  </p>
                </div>
              </div>

              {/* CLOSE */}

              <button
                onClick={onClose}
                className="
                  h-11 w-11
                  flex-shrink-0
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.04]
                  text-slate-400
                  flex items-center justify-center
                  transition-all duration-300
                  hover:bg-white/[0.08]
                  hover:text-white
                  hover:rotate-90
                "
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>

          {/* BODY */}

          <div className="flex-1 overflow-y-auto custom-scroll px-5 sm:px-7 py-6 space-y-5">
            {/* STATUS */}

            <div
              className="
                rounded-[28px]
                border border-white/10
                bg-[#111827]/60
                backdrop-blur-xl
                p-5
              "
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="
                    h-11 w-11
                    rounded-2xl
                    bg-cyan-500/10
                    border border-cyan-500/20
                    flex items-center justify-center
                    text-cyan-400
                  "
                >
                  <FaCheckCircle size={14} />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Status</h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Current task state
                  </p>
                </div>
              </div>

              <div
                className={`
                  inline-flex
                  items-center gap-2
                  px-4 py-3
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
                        bg-indigo-500/10
                        border-indigo-500/20
                        text-indigo-300
                      `
                  }
                `}
              >
                <div className="h-2 w-2 rounded-full bg-current" />

                {task.status.replace("_", " ")}
              </div>
            </div>

            {/* PRIORITY + DATE */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* PRIORITY */}

              <div
                className="
                  rounded-[28px]
                  border border-white/10
                  bg-[#111827]/60
                  backdrop-blur-xl
                  p-5
                "
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="
                      h-11 w-11
                      rounded-2xl
                      bg-red-500/10
                      border border-red-500/20
                      flex items-center justify-center
                      text-red-400
                    "
                  >
                    <FaExclamationTriangle size={13} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">Priority</h3>

                    <p className="text-xs text-slate-500 mt-1">Task urgency</p>
                  </div>
                </div>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    px-4 py-4
                    text-sm
                    font-bold
                    text-white
                    outline-none
                    transition-all duration-300
                    focus:border-indigo-500/30
                    focus:ring-4 focus:ring-indigo-500/10
                  "
                >
                  <option value="LOW">LOW</option>

                  <option value="MEDIUM">MEDIUM</option>

                  <option value="HIGH">HIGH</option>
                </select>
              </div>

              {/* DATE */}

              <div
                className="
                  rounded-[28px]
                  border border-white/10
                  bg-[#111827]/60
                  backdrop-blur-xl
                  p-5
                "
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="
                      h-11 w-11
                      rounded-2xl
                      bg-indigo-500/10
                      border border-indigo-500/20
                      flex items-center justify-center
                      text-indigo-400
                    "
                  >
                    <FaCalendarAlt size={13} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">Due Date</h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Deadline tracking
                    </p>
                  </div>
                </div>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    px-4 py-4
                    text-sm
                    font-bold
                    text-white
                    outline-none
                    transition-all duration-300
                    focus:border-indigo-500/30
                    focus:ring-4 focus:ring-indigo-500/10
                  "
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div
              className="
                rounded-[28px]
                border border-white/10
                bg-[#111827]/60
                backdrop-blur-xl
                p-5
              "
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="
                    h-11 w-11
                    rounded-2xl
                    bg-cyan-500/10
                    border border-cyan-500/20
                    flex items-center justify-center
                    text-cyan-400
                  "
                >
                  <FaLayerGroup size={13} />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Description</h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Task details & notes
                  </p>
                </div>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={7}
                placeholder="Write task description..."
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.04]
                  px-4 py-4
                  text-sm
                  leading-relaxed
                  text-slate-200
                  placeholder:text-slate-500
                  outline-none
                  resize-none
                  transition-all duration-300
                  focus:border-indigo-500/30
                  focus:ring-4 focus:ring-indigo-500/10
                "
              />
            </div>

            {/* RELATIONS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* PARENT */}

              <div
                className="
                  rounded-[28px]
                  border border-white/10
                  bg-[#111827]/60
                  backdrop-blur-xl
                  p-5
                "
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="
                      h-11 w-11
                      rounded-2xl
                      bg-indigo-500/10
                      border border-indigo-500/20
                      flex items-center justify-center
                      text-indigo-400
                    "
                  >
                    <FaArrowRight size={12} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">
                      Parent Task
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Task hierarchy
                    </p>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border border-white/5
                    bg-white/[0.03]
                    p-4
                  "
                >
                  <p className="text-sm font-semibold text-slate-200">
                    {task.parentTaskId ? "This is a subtask" : "Main task"}
                  </p>
                </div>
              </div>

              {/* DEPENDENCIES */}

              <div
                className="
                  rounded-[28px]
                  border border-white/10
                  bg-[#111827]/60
                  backdrop-blur-xl
                  p-5
                "
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="
                      h-11 w-11
                      rounded-2xl
                      bg-orange-500/10
                      border border-orange-500/20
                      flex items-center justify-center
                      text-orange-400
                    "
                  >
                    <FaLink size={12} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">
                      Dependencies
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Blocking tasks
                    </p>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border border-white/5
                    bg-white/[0.03]
                    p-4
                  "
                >
                  <p className="text-sm font-semibold text-slate-200">
                    {task.blockedByIds?.length} blocking task(s)
                  </p>
                </div>
              </div>
            </div>

            {/* SAVE */}

            <button
              onClick={saveTask}
              disabled={loading}
              className="
                relative
                overflow-hidden
                w-full
                h-16
                rounded-[26px]
                bg-gradient-to-r
                from-indigo-500
                via-blue-500
                to-cyan-500
                text-white
                text-sm
                font-black
                shadow-[0_10px_40px_rgba(59,130,246,0.35)]
                transition-all duration-300
                hover:scale-[1.01]
                active:scale-[0.98]
                disabled:opacity-50
                disabled:hover:scale-100
              "
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                <FaSave size={13} />

                {loading ? "Saving..." : "Save Changes"}
              </span>

              <div
                className="
                  absolute inset-0
                  opacity-0 hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-r
                  from-white/10
                  to-transparent
                "
              />
            </button>

            {/* FOOTER */}

            <div
              className="
                pt-2
                flex flex-col sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
              "
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] font-black text-slate-500">
                  Task ID
                </p>

                <p className="text-xs sm:text-sm text-slate-400 mt-2 break-all">
                  {task.id}
                </p>
              </div>

              <div
                className={`
                  h-20 w-20
                  rounded-[28px]
                  bg-gradient-to-r
                  ${statusColor}
                  text-white
                  flex items-center justify-center
                  text-4xl
                  font-black
                  shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                `}
              >
                {title?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
