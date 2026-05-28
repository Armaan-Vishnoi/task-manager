"use client";

import { useEffect, useState } from "react";

import { FaFolderPlus, FaLayerGroup, FaTimes } from "react-icons/fa";

interface Props {
  open: boolean;

  onClose: () => void;

  onCreated: () => void;
}

export default function ProjectModal({ open, onClose, onCreated }: Props) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open) return null;

  async function createProject() {
    if (!name.trim()) {
      setError("Project name is required");

      return;
    }

    try {
      setLoading(true);

      setError("");
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const user = JSON.parse(storedUser);
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          description,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);

        return;
      }

      setName("");

      setDescription("");

      onCreated();

      onClose();
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70
        backdrop-blur-md
        px-4 py-6
        overflow-y-auto
      "
    >
      {/* MODAL */}

      <div
        className="
          relative
          w-full
          max-w-xl
          overflow-hidden
          rounded-[32px]
          border border-white/10
          bg-[#0f172a]/95
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          animate-[fadeIn_.25s_ease]
        "
      >
        {/* BACKGROUND GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4338ca20,transparent_30%),radial-gradient(circle_at_bottom_left,#06b6d420,transparent_35%)] pointer-events-none" />

        {/* HEADER */}

        <div
          className="
            relative
            flex items-start justify-between
            gap-4
            px-5 sm:px-7
            py-5
            border-b border-white/5
          "
        >
          <div className="flex items-start gap-4 min-w-0">
            {/* ICON */}

            <div
              className="
                h-14 w-14
                flex-shrink-0
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                flex items-center justify-center
                text-white
                shadow-lg
              "
            >
              <FaFolderPlus size={20} />
            </div>

            {/* TEXT */}

            <div className="min-w-0">
              <h2
                className="
                  text-2xl sm:text-3xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                Create Project
              </h2>

              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Setup a new workspace project for your team.
              </p>
            </div>
          </div>

          {/* CLOSE */}

          <button
            onClick={onClose}
            className="
              h-11 w-11
              flex items-center justify-center
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              text-slate-400
              transition-all duration-300
              hover:bg-white/[0.08]
              hover:text-white
              hover:rotate-90
              flex-shrink-0
            "
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* BODY */}

        <div className="relative px-5 sm:px-7 py-6">
          {/* ERROR */}

          {error && (
            <div
              className="
                mb-5
                rounded-2xl
                border border-red-500/20
                bg-red-500/10
                px-4 py-3
                text-sm
                font-medium
                text-red-300
              "
            >
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* PROJECT NAME */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-500
                "
              >
                Project Name
              </label>

              <div className="relative">
                <FaLayerGroup
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-slate-500
                    text-sm
                  "
                />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter project name"
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    pl-11 pr-4
                    py-4
                    text-sm
                    font-medium
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

            {/* DESCRIPTION */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-500
                "
              >
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write project details..."
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.04]
                  px-4 py-4
                  text-sm
                  font-medium
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  resize-none
                  h-32
                  transition-all duration-300
                  focus:border-indigo-500/30
                  focus:ring-4 focus:ring-indigo-500/10
                  hover:border-white/20
                "
              />
            </div>

            {/* ACTIONS */}

            <div
              className="
                flex flex-col-reverse sm:flex-row
                gap-3
                pt-2
              "
            >
              {/* CANCEL */}

              <button
                onClick={onClose}
                className="
                  flex-1
                  h-14
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.04]
                  text-sm
                  font-semibold
                  text-slate-300
                  transition-all duration-300
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                Cancel
              </button>

              {/* CREATE */}

              <button
                onClick={createProject}
                disabled={loading}
                className="
                  relative
                  overflow-hidden
                  flex-1
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  via-blue-500
                  to-cyan-500
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_10px_30px_rgba(59,130,246,0.35)]
                  transition-all duration-300
                  hover:scale-[1.01]
                  active:scale-[0.98]
                  disabled:opacity-50
                  disabled:hover:scale-100
                "
              >
                <span className="relative z-10">
                  {loading ? "Creating..." : "Create Project"}
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
      </div>
    </div>
  );
}
