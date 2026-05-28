"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Sidebar from "../components/Sidebar";
import ActivityPanel from "../components/ActivityPanel";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import ProjectModal from "../components/ProjectModal";
import TaskDetailsModal from "../components/TaskDetailsModal";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
import TaskSkeleton from "../components/TaskSkeleton";
import useAuth from "../hooks/useAuth";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignedUserId?: string;
  parentTaskId: string | null;
  blockedByIds: string[];
  createdAt: string;
  dueDate?: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const { loading: authLoading } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("NEWEST");

  const [selectedTask, setSelectedTask] = useState<any>(null);

  const [openDetails, setOpenDetails] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [openProjectModal, setOpenProjectModal] = useState(false);

  const [activeProjectId, setActiveProjectId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));

    const savedProject = localStorage.getItem("activeProjectId");

    if (savedProject) {
      setActiveProjectId(savedProject);
      fetchTasks(savedProject);
    }
  }, [router]);

  useEffect(() => {
    if (activeProjectId) {
      localStorage.setItem("activeProjectId", activeProjectId);
      fetchTasks(activeProjectId);
    }
  }, [activeProjectId]);

  async function fetchTasks(projectId?: string) {
    setLoading(true);

    try {
      if (!projectId) return;

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      const response = await fetch(
        `http://localhost:3000/api/tasks?projectId=${projectId}&userId=${parsedUser.id}`,
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function moveTask(id: string, status: string) {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
          userId: parsedUser.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setToast({
          show: true,
          message: data.error,
          type: "error",
        });

        return;
      }

      fetchTasks(activeProjectId);
    } catch (error) {
      console.error(error);
    }
  }

  async function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const taskId = result.draggableId;

    const newStatus = result.destination.droppableId;

    await moveTask(taskId, newStatus);
  }

  function logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");
  }

  if (!user) {
    return <Loader />;
  }

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "ALL" || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === "NEWEST") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const todoTasks = filteredTasks.filter((task) => task.status === "TODO");

  const progressTasks = filteredTasks.filter(
    (task) => task.status === "IN_PROGRESS",
  );

  const doneTasks = filteredTasks.filter((task) => task.status === "DONE");

  const boardColumns = [
    {
      id: "TODO",
      title: "TODO",
      tasks: todoTasks,
      glow: "from-pink-500/20 to-purple-500/10",
      border: "hover:border-pink-500/30",
      badge: "text-pink-300 bg-pink-500/20",
    },
    {
      id: "IN_PROGRESS",
      tasks: progressTasks,
      glow: "from-cyan-500/20 to-blue-500/10",
      border: "hover:border-cyan-500/30",
      badge: "text-cyan-300 bg-cyan-500/20",
    },
    {
      id: "DONE",
      title: "DONE",
      tasks: doneTasks,
      glow: "from-emerald-500/20 to-green-500/10",
      border: "hover:border-emerald-500/30",
      badge: "text-emerald-300 bg-emerald-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#312e81_0%,transparent_30%),radial-gradient(circle_at_bottom_left,#0f766e_0%,transparent_25%)] opacity-40 pointer-events-none" />

      <div className="relative flex min-h-screen">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeProjectId={activeProjectId}
          setActiveProjectId={setActiveProjectId}
          openProjectModal={() => setOpenProjectModal(true)}
        />

        <div className="flex-1 w-full overflow-x-hidden">
          <Navbar user={user} onLogout={logout} />

          <div className="px-4 sm:px-6 lg:px-8 py-5">
            {/* TOP TOOLBAR */}

            <div className="mb-8 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_10px_60px_rgba(0,0,0,0.45)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* SEARCH */}

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="
                    w-full
                    bg-[#111827]
                    border border-white/10
                    rounded-2xl
                    px-4 py-3
                    text-sm
                    font-medium
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all duration-300
                    focus:border-indigo-500
                    focus:ring-4 focus:ring-indigo-500/20
                    hover:border-indigo-400/40
                    hover:shadow-lg
                  "
                />

                {/* PRIORITY */}

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="
                    w-full
                    bg-[#111827]
                    border border-white/10
                    rounded-2xl
                    px-4 py-3
                    text-sm
                    font-medium
                    text-white
                    outline-none
                    transition-all duration-300
                    focus:border-indigo-500
                    focus:ring-4 focus:ring-indigo-500/20
                    hover:border-indigo-400/40
                    cursor-pointer
                  "
                >
                  <option value="ALL">All Priorities</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>

                {/* SORT */}

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
                    w-full
                    bg-[#111827]
                    border border-white/10
                    rounded-2xl
                    px-4 py-3
                    text-sm
                    font-medium
                    text-white
                    outline-none
                    transition-all duration-300
                    focus:border-indigo-500
                    focus:ring-4 focus:ring-indigo-500/20
                    hover:border-indigo-400/40
                    cursor-pointer
                  "
                >
                  <option value="NEWEST">Newest First</option>
                  <option value="OLDEST">Oldest First</option>
                </select>
              </div>
            </div>

            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Project Board
                </h1>

                <p className="text-slate-400 mt-2 text-sm sm:text-base font-medium">
                  Welcome back, {user.name}
                </p>
              </div>

              <button
                onClick={() => setOpenModal(true)}
                disabled={!activeProjectId}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500
                  hover:scale-[1.03]
                  active:scale-[0.98]
                  disabled:opacity-40
                  disabled:hover:scale-100
                  text-white
                  px-5 py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                  shadow-[0_10px_40px_rgba(59,130,246,0.35)]
                  transition-all duration-300
                "
              >
                + Create Task
              </button>
            </div>

            {/* NO PROJECT */}

            {!activeProjectId && (
              <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 text-center shadow-[0_10px_60px_rgba(0,0,0,0.4)] min-h-[500px] flex flex-col justify-center">
                <h2 className="text-3xl font-black text-white mb-4">
                  No Project Selected
                </h2>

                <p className="text-slate-400 text-lg">
                  Create or select a project from sidebar
                </p>
              </div>
            )}

            {/* BOARD */}

            {activeProjectId && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="overflow-x-auto pb-4 custom-scroll">
                  <div className="flex gap-5 items-start min-w-max">
                    {boardColumns.map((column) => (
                      <div
                        key={column.id}
                        className={`
            relative
            w-[340px]
            flex-shrink-0
            rounded-[28px]
            border border-white/10
            bg-[#0f172a]/90
            backdrop-blur-2xl
            shadow-[0_10px_40px_rgba(0,0,0,0.45)]
            transition-all duration-300
            hover:border-indigo-500/30
            overflow-hidden
          `}
                      >
                        {/* GLOW */}

                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${column.glow} opacity-30 pointer-events-none`}
                        />

                        {/* HEADER */}

                        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0f172a]/95 border-b border-white/5 px-4 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />

                              <h2 className="text-sm font-bold tracking-wide text-white uppercase">
                                {column.title}
                              </h2>
                            </div>

                            <span
                              className={`
                  px-2.5 py-1
                  rounded-full
                  text-[11px]
                  font-bold
                  border border-white/10
                  ${column.badge}
                `}
                            >
                              {column.tasks.length}
                            </span>
                          </div>
                        </div>

                        {/* TASK LIST */}

                        <Droppable droppableId={column.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="
                  p-3
                  space-y-3
                  overflow-y-auto
                  custom-scroll
                "
                              style={{
                                maxHeight: "75vh",
                                minHeight: "120px",
                                height:
                                  column.tasks.length > 5
                                    ? "75vh"
                                    : `${Math.max(
                                        column.tasks.length * 145,
                                        140,
                                      )}px`,
                              }}
                            >
                              {column.tasks.length === 0 ? (
                                <div className="bg-[#111827]/70 border border-dashed border-white/10 rounded-2xl p-6 text-center text-slate-500 font-medium text-sm">
                                  No tasks
                                </div>
                              ) : loading ? (
                                Array.from({
                                  length: 3,
                                }).map((_, index) => (
                                  <TaskSkeleton key={index} />
                                ))
                              ) : (
                                column.tasks.map((task, index) => (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="
                            transition-all duration-300
                            hover:-translate-y-1
                            hover:scale-[1.01]
                            hover:z-30
                          "
                                      >
                                        <TaskCard
                                          assignedUserId={task.assignedUserId}
                                          onClick={() => {
                                            setSelectedTask(task);
                                            setOpenDetails(true);
                                          }}
                                          id={task.id}
                                          title={task.title}
                                          status={task.status}
                                          priority={task.priority}
                                          parentTaskId={task.parentTaskId}
                                          dueDate={task.dueDate}
                                          blockedByIds={task.blockedByIds}
                                          onMove={moveTask}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                ))
                              )}

                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    ))}

                    {/* ACTIVITY PANEL */}

                    <div className="w-[340px] flex-shrink-0">
                      <div className="rounded-[28px] border border-white/10 bg-[#0f172a]/90 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)] overflow-hidden">
                        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0f172a]/95 border-b border-white/5 px-4 py-4">
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold tracking-wide text-white uppercase">
                              Activity Feed
                            </h2>

                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                        </div>

                        <div
                          className="overflow-y-auto custom-scroll p-3"
                          style={{
                            maxHeight: "75vh",
                            minHeight: "140px",
                          }}
                        >
                          <ActivityPanel user={user} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DragDropContext>
            )}
          </div>
        </div>

        {/* MODALS */}

        <TaskModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onCreated={() => fetchTasks(activeProjectId)}
          projectId={activeProjectId}
        />

        <ProjectModal
          open={openProjectModal}
          onClose={() => setOpenProjectModal(false)}
          onCreated={() => window.location.reload()}
        />

        <TaskDetailsModal
          task={selectedTask}
          open={openDetails}
          onClose={() => setOpenDetails(false)}
        />
      </div>

      {/* TOAST */}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type as "success" | "error"}
          onClose={() =>
            setToast({
              show: false,
              message: "",
              type: "success",
            })
          }
        />
      )}
    </div>
  );
}
