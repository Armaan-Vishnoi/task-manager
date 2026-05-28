"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  FaBell,
  FaBars,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface Props {
  user: any;
  onLogout: () => void;
  setSidebarOpen?: (value: boolean) => void;
}

export default function Navbar({
  user,
  onLogout,
  setSidebarOpen,
}: Props) {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [open, setOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function fetchNotifications() {
    try {
      if (!user?.id) return;

      const response = await fetch(
        `http://localhost:3000/api/notifications?userId=${user.id}`
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
      await fetch(
        `http://localhost:3000/api/notifications/${id}`,
        {
          method: "DELETE",
        }
      );

      setNotifications((prev) =>
        prev.filter(
          (notification) => notification.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function markAsRead(id: string) {
    try {
      await fetch(
        `http://localhost:3000/api/notifications/${id}`,
        {
          method: "PATCH",
        }
      );

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <nav
      className="
        sticky top-0 z-40
        border-b border-white/10
        bg-[#020617]/80
        backdrop-blur-2xl
        px-4 sm:px-6 lg:px-8
        py-4
      "
    >
      <div className="flex items-center justify-between gap-4">
        {/* LEFT */}

        <div className="flex items-center gap-3 min-w-0">
          {/* MOBILE MENU */}

          <button
            onClick={() => setSidebarOpen?.(true)}
            className="
              lg:hidden
              h-11 w-11
              flex items-center justify-center
              rounded-2xl
              border border-white/10
              bg-white/5
              text-slate-300
              transition-all duration-300
              hover:bg-white/10
              hover:border-indigo-500/20
              flex-shrink-0
            "
          >
            <FaBars size={14} />
          </button>

          {/* LOGO */}

          <div className="min-w-0">
            <h1
              className="
                text-xl sm:text-2xl
                font-black
                tracking-tight
                bg-gradient-to-r
                from-indigo-400
                via-cyan-400
                to-blue-500
                bg-clip-text
                text-transparent
                truncate
              "
            >
              TaskFlow
            </h1>

            <p className="hidden sm:block text-xs text-slate-500 font-medium mt-0.5">
              Workspace Dashboard
            </p>
          </div>
        </div>

        {/* CENTER SEARCH */}

        <div className="hidden xl:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <FaSearch
              className="
                absolute left-4 top-1/2 -translate-y-1/2
                text-slate-500
                text-sm
              "
            />

            <input
              type="text"
              placeholder="Search tasks, projects..."
              className="
                w-full
                h-12
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                pl-11 pr-4
                text-sm
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all duration-300
                focus:border-indigo-500/30
                focus:ring-4 focus:ring-indigo-500/10
                hover:border-white/20
              "
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* NOTIFICATIONS */}

          <div
            className="relative"
            ref={notificationRef}
          >
            <button
              onClick={() => setOpen(!open)}
              className="
                relative
                h-11 w-11
                flex items-center justify-center
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                text-slate-300
                transition-all duration-300
                hover:bg-white/[0.08]
                hover:border-indigo-500/20
                hover:scale-105
              "
            >
              <FaBell size={14} />

              {unreadCount > 0 && (
                <div
                  className="
                    absolute -top-1 -right-1
                    min-w-[20px]
                    h-5
                    px-1
                    rounded-full
                    bg-gradient-to-r
                    from-rose-500
                    to-red-500
                    text-white
                    text-[10px]
                    font-black
                    flex items-center justify-center
                    shadow-lg
                  "
                >
                  {unreadCount}
                </div>
              )}
            </button>

            {/* DROPDOWN */}

            {open && (
              <div
                className="
                  absolute right-0 mt-3
                  w-[92vw] sm:w-[380px]
                  max-w-[380px]
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-[#0f172a]/95
                  backdrop-blur-2xl
                  shadow-[0_20px_80px_rgba(0,0,0,0.55)]
                  z-50
                "
              >
                {/* HEADER */}

                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <div>
                    <h2 className="text-lg font-black text-white">
                      Notifications
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                      Recent updates & alerts
                    </p>
                  </div>

                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* BODY */}

                <div className="max-h-[420px] overflow-y-auto custom-scroll p-3">
                  {notifications.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
                      <p className="text-sm text-slate-500 font-medium">
                        No notifications
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                        className={`
                          group
                          relative
                          rounded-2xl
                          border
                          p-4
                          cursor-pointer
                          transition-all duration-300
                          hover:scale-[1.01]
                          ${
                            notification.read
                              ? `
                                border-white/5
                                bg-white/[0.03]
                              `
                              : `
                                border-indigo-500/20
                                bg-gradient-to-r
                                from-indigo-500/10
                                to-cyan-500/5
                              `
                          }
                        `}
                      >
                        {/* DELETE */}

                        

                        {/* CONTENT */}

                        <div className="pr-8">
                          <p className="text-sm leading-relaxed text-slate-200 font-medium">
                            {notification.message}
                          </p>

                          {!notification.read && (
                            <div className="mt-3 flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-indigo-400" />

                              <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-300">
                                New Notification
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}

          <Link
            href="/profile"
            className="
              group
              flex items-center gap-3
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              px-2 sm:px-3
              py-2
              transition-all duration-300
              hover:bg-white/[0.08]
              hover:border-indigo-500/20
            "
          >
            {/* AVATAR */}

            <div
              className="
                h-10 w-10
                rounded-xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                text-white
                flex items-center justify-center
                font-black
                text-sm
                shadow-lg
                flex-shrink-0
              "
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* INFO */}

            <div className="hidden md:block min-w-0">
              <p className="font-semibold text-sm text-white truncate">
                {user.name}
              </p>

              <p className="text-xs text-slate-500">
                View Profile
              </p>
            </div>
          </Link>

          {/* LOGOUT */}

          <button
            onClick={onLogout}
            className="
              h-11
              px-4
              rounded-2xl
              bg-gradient-to-r
              from-rose-500
              to-red-500
              text-white
              text-sm
              font-semibold
              shadow-lg
              transition-all duration-300
              hover:scale-[1.03]
              active:scale-95
              flex items-center gap-2
            "
          >
            <FaSignOutAlt size={12} />

            <span className="hidden sm:block">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}