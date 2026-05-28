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
  FaPlus,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";

interface Task {
  id: string;

  title: string;
}

interface Props {
  open: boolean;

  onClose: () => void;

  onCreated: () => void;

  projectId: string;
}

export default function TaskModal({
  open,
  onClose,
  onCreated,
  projectId,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState("MEDIUM");

  const [users, setUsers] = useState<any[]>([]);

  const [assignedUserId, setAssignedUserId] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [parentTaskId, setParentTaskId] = useState("");

  const [dependencyId, setDependencyId] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      fetchTasks();

      fetchUsers();
    }
  }, [open]);

 async function fetchTasks() {

  try {

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (!storedUser) {
      return;
    }

    const user =
      JSON.parse(
        storedUser
      );

    const response =
      await fetch(
        `http://localhost:3000/api/tasks?projectId=${projectId}&userId=${user.id}`
      );

    const data =
      await response.json();

    if (Array.isArray(data)) {

      setTasks(data);

    } else {

      setTasks([]);
    }

  } catch (error) {

    console.error(error);

    setTasks([]);
  }
}

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users");

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createTask() {

  if (!title.trim()) {

    setError(
      "Task title is required"
    );

    return;
  }

  try {

    setLoading(true);

    setError("");

    // Normalize empty-string values to null for backend
    const parentTaskIdPayload = parentTaskId === "" ? null : parentTaskId;
    const dependencyIdPayload = dependencyId === "" ? null : dependencyId;
    const assignedUserIdPayload = assignedUserId === "" ? null : assignedUserId;

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (!storedUser) {

      setError(
        "User not found"
      );

      return;
    }

    const user =
      JSON.parse(
        storedUser
      );

    const response =
      await fetch(
        "http://localhost:3000/api/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            priority,
            projectId,
            dueDate,
            assignedUserId: assignedUserIdPayload,
            parentTaskId: parentTaskIdPayload,
            userId: user.id,
          }),
        }
      );

    const createdTask =
      await response.json();

    if (createdTask.error) {

      setError(
        createdTask.error
      );

      return;
    }

    if (dependencyId && dependencyIdPayload) {
      await fetch(
        `http://localhost:3000/api/tasks/${createdTask.id}/dependencies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dependencyId: dependencyIdPayload,
          }),
        }
      );
    }

    setTitle("");

    setPriority("MEDIUM");

    setParentTaskId("");

    setDependencyId("");

    setAssignedUserId("");

    setDueDate("");

    onCreated();

    onClose();

  } catch (error) {

    console.error(error);

    setError(
      "Something went wrong"
    );

  } finally {

    setLoading(false);
  }
}

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70
        backdrop-blur-md
        p-4
        overflow-y-auto
      "
    >
      {/* MODAL */}

      <div
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[34px]
          border border-white/10
          bg-[#020617]/95
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.55)]
        "
      >
        {/* GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

        {/* HEADER */}

        <div
          className="
            relative
            flex items-start justify-between
            gap-4
            border-b border-white/5
            px-5 sm:px-7
            py-5
          "
        >
          <div className="flex items-start gap-4">
            {/* ICON */}

            <div
              className="
                h-14 w-14
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                flex items-center justify-center
                text-white
                shadow-lg
              "
            >
              <FaPlus size={18} />
            </div>

            {/* TEXT */}

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Create Task
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Create and organize workspace tasks
              </p>
            </div>
          </div>

          {/* CLOSE */}

          <button
            onClick={onClose}
            className="
              h-11 w-11
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

        {/* BODY */}

        <div className="relative px-5 sm:px-7 py-6 space-y-5 max-h-[85vh] overflow-y-auto custom-scroll">
          {/* ERROR */}

          {error && (
            <div
              className="
                rounded-2xl
                border border-red-500/20
                bg-red-500/10
                px-4 py-3
                text-sm
                font-semibold
                text-red-300
              "
            >
              {error}
            </div>
          )}

          {/* TITLE */}

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
                <FaLayerGroup size={13} />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">Task Title</h3>

                <p className="text-xs text-slate-500 mt-1">
                  Define the task name
                </p>
              </div>
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="
                w-full
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                px-4 py-4
                text-sm
                font-semibold
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all duration-300
                focus:border-indigo-500/30
                focus:ring-4 focus:ring-indigo-500/10
              "
            />
          </div>

          {/* GRID */}

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

              <Select value={priority} onValueChange={(val: string) => setPriority(val)}>
                <SelectTrigger className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                </SelectContent>
              </Select>
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
                    bg-cyan-500/10
                    border border-cyan-500/20
                    flex items-center justify-center
                    text-cyan-400
                  "
                >
                  <FaCalendarAlt size={13} />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Due Date</h3>

                  <p className="text-xs text-slate-500 mt-1">Set deadline</p>
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
                  <FaArrowRight size={12} />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Parent Task</h3>

                  <p className="text-xs text-slate-500 mt-1">Create subtask</p>
                </div>
              </div>

              <select
                value={parentTaskId}
                onChange={(e) => setParentTaskId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white"
              >
                <option value="">Select parent task</option>
                <option value="NONE">Main Task</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>

            {/* DEPENDENCY */}

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
                    bg-orange-500/10
                    border border-orange-500/20
                    flex items-center justify-center
                    text-orange-400
                  "
                >
                  <FaLink size={12} />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Dependency</h3>

                  <p className="text-xs text-slate-500 mt-1">Blocking tasks</p>
                </div>
              </div>

              <select
                value={dependencyId}
                onChange={(e) => setDependencyId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white"
              >
                <option value="">Select dependency</option>
                <option value="NONE">No Dependency</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ASSIGN */}

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
                  bg-emerald-500/10
                  border border-emerald-500/20
                  flex items-center justify-center
                  text-emerald-400
                "
              >
                <FaUser size={12} />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">Assign User</h3>

                <p className="text-xs text-slate-500 mt-1">Assign task owner</p>
              </div>
            </div>

            <select
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white"
            >
              <option value="">Assign user</option>
              <option value="NONE">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTON */}

          <button
            onClick={createTask}
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
              <FaCheckCircle size={13} />

              {loading ? "Creating..." : "Create Task"}
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
        </div>
      </div>
    </div>
  );
}
