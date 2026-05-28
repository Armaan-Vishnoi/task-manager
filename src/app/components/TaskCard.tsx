"use client";

import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaLayerGroup,
  FaTrash,
  FaUser,
} from "react-icons/fa";

interface Props {
  id: string;

  title: string;

  status: string;

  priority: string;

  parentTaskId: string | null;

  blockedByIds: string[];

  onMove: (id: string, status: string) => void;

  onClick?: () => void;

  description?: string;

  dueDate?: string;

  assignedUserId?: string;
}

export default function TaskCard({
  id,
  title,
  status,
  priority,
  parentTaskId,
  blockedByIds,
  onMove,
  onClick,
  dueDate,
  assignedUserId,
}: Props) {
  async function deleteTask(e: React.MouseEvent) {
    e.stopPropagation();

    const confirmDelete = confirm("Delete this task?");

    if (!confirmDelete) {
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parsedUser?.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);

        return;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const isOverdue =
    dueDate && new Date(dueDate) < new Date() && status !== "DONE";

  const isToday =
    dueDate && new Date(dueDate).toDateString() === new Date().toDateString();

  const statusColor =
    status === "DONE"
      ? "from-emerald-500 to-green-500"
      : status === "IN_PROGRESS"
        ? "from-cyan-500 to-blue-500"
        : "from-indigo-500 to-violet-500";

  return (
    <div
      onClick={onClick}
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border border-white/10
        bg-[#111827]/70
        backdrop-blur-xl
        p-4
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        transition-all duration-300
        hover:border-cyan-500/20
        hover:bg-cyan-500/[0.04]
        hover:-translate-y-1
        hover:shadow-[0_15px_45px_rgba(0,0,0,0.45)]
        cursor-pointer
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

      {/* STATUS LINE */}

      <div
        className={`
          absolute top-0 left-0
          h-1 w-full
          bg-gradient-to-r
          ${statusColor}
        `}
      />

      {/* HEADER */}

      <div className="relative flex items-start gap-3">
        {/* ICON */}

        <div
          className={`
            h-11 w-11
            flex-shrink-0
            rounded-2xl
            bg-gradient-to-r
            ${statusColor}
            flex items-center justify-center
            text-white
            shadow-lg
            font-black
          `}
        >
          {title?.charAt(0)?.toUpperCase()}
        </div>

        {/* TITLE */}

        <div className="flex-1 min-w-0">
          <h3
            className="
              text-[15px]
              font-black
              text-white
              leading-snug
              break-words
            "
          >
            {title}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <div
              className={`
                h-2 w-2
                rounded-full
                ${
                  status === "DONE"
                    ? "bg-emerald-400"
                    : status === "IN_PROGRESS"
                      ? "bg-cyan-400"
                      : "bg-indigo-400"
                }
              `}
            />

            <p className="text-[11px] uppercase tracking-wide font-bold text-slate-500">
              {status.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* DELETE */}

        <button
          onClick={(e) => deleteTask(e)}
          className="
            opacity-0
            group-hover:opacity-100
            transition-all duration-300
            h-8 w-8
            rounded-xl
            border border-red-500/10
            bg-red-500/10
            text-red-400
            flex items-center justify-center
            hover:bg-red-500/20
            hover:scale-105
            flex-shrink-0
          "
        >
          <FaTrash size={10} />
        </button>
      </div>

      {/* BADGES */}

      <div className="relative flex flex-wrap gap-2 mt-4">
        {/* PRIORITY */}

        <span
          className={`
            inline-flex
            items-center gap-1.5
            px-3 py-1.5
            rounded-xl
            text-[10px]
            font-black
            uppercase
            tracking-wide
            border
            ${
              priority === "HIGH"
                ? `
                  bg-red-500/10
                  border-red-500/20
                  text-red-300
                `
                : priority === "MEDIUM"
                  ? `
                  bg-yellow-500/10
                  border-yellow-500/20
                  text-yellow-300
                `
                  : `
                  bg-emerald-500/10
                  border-emerald-500/20
                  text-emerald-300
                `
            }
          `}
        >
          <FaExclamationTriangle size={9} />

          {priority}
        </span>

        {/* SUBTASK */}

        {parentTaskId && (
          <span
            className="
              inline-flex
              items-center gap-1.5
              px-3 py-1.5
              rounded-xl
              text-[10px]
              font-black
              uppercase
              tracking-wide
              border border-indigo-500/20
              bg-indigo-500/10
              text-indigo-300
            "
          >
            <FaLayerGroup size={9} />
            Subtask
          </span>
        )}

        {/* BLOCKED */}

        {blockedByIds?.length > 0 && (
          <span
            className="
              inline-flex
              items-center gap-1.5
              px-3 py-1.5
              rounded-xl
              text-[10px]
              font-black
              uppercase
              tracking-wide
              border border-orange-500/20
              bg-orange-500/10
              text-orange-300
            "
          >
            <FaClock size={9} />
            Blocked
          </span>
        )}

        {/* OVERDUE */}

        {isOverdue && (
          <span
            className="
              inline-flex
              items-center gap-1.5
              px-3 py-1.5
              rounded-xl
              text-[10px]
              font-black
              uppercase
              tracking-wide
              border border-red-500/20
              bg-red-500/10
              text-red-300
            "
          >
            <FaClock size={9} />
            Overdue
          </span>
        )}

        {/* TODAY */}

        {isToday && (
          <span
            className="
              inline-flex
              items-center gap-1.5
              px-3 py-1.5
              rounded-xl
              text-[10px]
              font-black
              uppercase
              tracking-wide
              border border-cyan-500/20
              bg-cyan-500/10
              text-cyan-300
            "
          >
            <FaCheckCircle size={9} />
            Today
          </span>
        )}
      </div>

      {/* FOOTER */}

      <div className="relative mt-5">
        {/* USER */}

        {assignedUserId && (
          <div
            className="
              flex items-center gap-3
              mb-4
              rounded-2xl
              border border-white/5
              bg-white/[0.03]
              p-3
            "
          >
            <div
              className="
                h-10 w-10
                rounded-xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                flex items-center justify-center
                text-white
                shadow-lg
              "
            >
              <FaUser size={12} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wide font-bold text-slate-500">
                Assigned
              </p>

              <p className="text-sm font-semibold text-slate-200">
                Team Member
              </p>
            </div>
          </div>
        )}

        {/* ACTIONS */}

        <div className="flex flex-wrap gap-2">
          {status !== "TODO" && (
            <button
              onClick={(e) => {
                e.stopPropagation();

                onMove(id, "TODO");
              }}
              className="
                inline-flex
                items-center gap-2
                px-3 py-2
                rounded-xl
                text-[11px]
                font-black
                uppercase
                tracking-wide
                border border-white/10
                bg-white/[0.04]
                text-slate-300
                transition-all duration-300
                hover:bg-white/[0.08]
              "
            >
              TODO
              <FaArrowRight size={8} />
            </button>
          )}

          {status !== "IN_PROGRESS" && (
            <button
              onClick={(e) => {
                e.stopPropagation();

                onMove(id, "IN_PROGRESS");
              }}
              className="
                inline-flex
                items-center gap-2
                px-3 py-2
                rounded-xl
                text-[11px]
                font-black
                uppercase
                tracking-wide
                border border-cyan-500/20
                bg-cyan-500/10
                text-cyan-300
                transition-all duration-300
                hover:bg-cyan-500/20
              "
            >
              Progress
              <FaArrowRight size={8} />
            </button>
          )}

          {status !== "DONE" && (
            <button
              onClick={(e) => {
                e.stopPropagation();

                onMove(id, "DONE");
              }}
              className="
                inline-flex
                items-center gap-2
                px-3 py-2
                rounded-xl
                text-[11px]
                font-black
                uppercase
                tracking-wide
                border border-emerald-500/20
                bg-emerald-500/10
                text-emerald-300
                transition-all duration-300
                hover:bg-emerald-500/20
              "
            >
              Done
              <FaArrowRight size={8} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
