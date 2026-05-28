"use client";

import { useState } from "react";

import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  async function login() {
    if (!email || !password) {
      setError("Please enter email and password");

      return;
    }

    try {
      setLoading(true);

      setError("");

      // LOADING DELAY

      await new Promise((resolve) => setTimeout(resolve, 2600));

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // ERROR

      if (data.error) {
        setLoading(false);

        setError("Invalid email or password");

        setTimeout(() => {
          router.push("/login");
        }, 1200);

        return;
      }

      // SUCCESS

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (error) {
      console.error(error);

      setLoading(false);

      setError("Unable to connect to server");
    }
  }

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020617]
        flex items-center justify-center
        px-4
      "
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4338ca25,transparent_30%),radial-gradient(circle_at_bottom_left,#06b6d425,transparent_35%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* CARD */}

      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-[34px]
          border border-white/10
          bg-[#0f172a]/90
          backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.55)]
        "
      >
        {/* GLOW */}

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

        {/* HEADER */}

        <div className="relative px-6 sm:px-8 pt-8 pb-6">
          {/* LOGO */}

          <div
            className="
              h-16 w-16
              rounded-[22px]
              bg-gradient-to-r
              from-indigo-500
              via-blue-500
              to-cyan-500
              flex items-center justify-center
              shadow-[0_10px_40px_rgba(59,130,246,0.35)]
              text-white
              text-2xl
              font-black
            "
          >
            T
          </div>

          {/* TITLE */}

          <div className="mt-6">
            <h1
              className="
                text-4xl sm:text-5xl
                font-black
                tracking-tight
                text-white
              "
            >
              Welcome
            </h1>

            <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
              Login to access your workspace dashboard and manage tasks
              efficiently.
            </p>
          </div>
        </div>

        {/* BODY */}

        <div className="relative px-6 sm:px-8 pb-8">
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
                font-semibold
                text-red-300
              "
            >
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* EMAIL */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.15em]
                  text-slate-500
                "
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    text-sm
                  "
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    pl-11 pr-4
                    py-4
                    text-sm
                    font-semibold
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

            {/* PASSWORD */}

            <div>
              <label
                className="
                  mb-2 block
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.15em]
                  text-slate-500
                "
              >
                Password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    text-sm
                  "
                />

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    pl-11 pr-14
                    py-4
                    text-sm
                    font-semibold
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all duration-300
                    focus:border-indigo-500/30
                    focus:ring-4 focus:ring-indigo-500/10
                    hover:border-white/20
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    transition-colors duration-300
                    hover:text-white
                  "
                >
                  {showPassword ? (
                    <FaEyeSlash size={15} />
                  ) : (
                    <FaEye size={15} />
                  )}
                </button>
              </div>
            </div>

            {/* OPTIONS */}

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="
                    h-4 w-4
                    rounded
                    border-white/20
                    bg-white/5
                    accent-indigo-500
                  "
                />

                <span className="text-sm text-slate-400 font-medium">
                  Remember me
                </span>
              </label>

              <button
                onClick={() => router.push("/forgot-password")}
                className="
    text-sm
    font-semibold
    text-cyan-400
    hover:text-cyan-300
    transition-colors duration-300
  "
              >
                Forgot password?
              </button>
            </div>

            {/* BUTTON */}

            <button
              onClick={login}
              disabled={loading}
              className="
                relative
                overflow-hidden
                w-full
                h-14
                rounded-2xl
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
                {loading ? "Authenticating..." : "Login"}

                {!loading && <FaArrowRight size={12} />}
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

          {/* FOOTER */}

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don’t have an account?{" "}
              <span
                className="
                  font-bold
                  text-cyan-400
                  cursor-pointer
                  hover:text-cyan-300
                  transition-colors duration-300
                "
              >
                Create account
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LOADING */}

      {loading && (
        <div
          className="
            fixed inset-0 z-[999]
            bg-[#020617]
            flex items-center justify-center
            px-4
          "
        >
          {/* BG */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4338ca25,transparent_30%),radial-gradient(circle_at_bottom_left,#06b6d425,transparent_35%)]" />

          {/* CARD */}

          <div
            className="
              relative
              w-full
              max-w-2xl
              overflow-hidden
              rounded-[38px]
              border border-white/10
              bg-[#0f172a]/90
              backdrop-blur-2xl
              shadow-[0_20px_80px_rgba(0,0,0,0.55)]
              p-6 sm:p-8
            "
          >
            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  Verifying Account
                </h1>

                <p className="text-slate-500 mt-3">
                  Syncing workspace and tasks...
                </p>
              </div>

              {/* SPINNER */}

              <div className="relative h-16 w-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[3px] border-cyan-500/10" />

                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-400 border-r-indigo-500 animate-spin" />

                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_25px_rgba(59,130,246,0.6)]" />
              </div>
            </div>

            {/* TASKS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* TODO */}

              <div className="rounded-[26px] border border-indigo-500/10 bg-indigo-500/[0.05] p-4">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] font-black uppercase tracking-wide text-indigo-300">
                    Todo
                  </p>

                  <div className="h-2.5 w-2.5 rounded-full bg-indigo-400 animate-pulse" />
                </div>

                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="
                          rounded-2xl
                          border border-white/5
                          bg-[#111827]
                          p-4
                          animate-pulse
                        "
                    >
                      <div className="h-4 rounded-full bg-white/[0.06] w-[75%]" />

                      <div className="h-3 rounded-full bg-white/[0.04] w-[45%] mt-3" />
                    </div>
                  ))}
                </div>
              </div>

              {/* PROGRESS */}

              <div className="rounded-[26px] border border-cyan-500/10 bg-cyan-500/[0.05] p-4">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] font-black uppercase tracking-wide text-cyan-300">
                    Syncing
                  </p>

                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="
                          rounded-2xl
                          border border-cyan-500/10
                          bg-[#111827]
                          p-4
                        "
                    >
                      <div className="flex items-center justify-between">
                        <div className="h-4 rounded-full bg-white/[0.06] w-[65%]" />

                        <div className="h-4 w-4 rounded-full bg-cyan-500/20 animate-pulse" />
                      </div>

                      <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DONE */}

              <div className="rounded-[26px] border border-emerald-500/10 bg-emerald-500/[0.05] p-4">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] font-black uppercase tracking-wide text-emerald-300">
                    Verified
                  </p>

                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="
                          rounded-2xl
                          border border-emerald-500/10
                          bg-[#111827]
                          p-4
                        "
                    >
                      <div className="flex items-center justify-between">
                        <div className="h-4 rounded-full bg-white/[0.06] w-[70%]" />

                        <div className="h-4 w-4 rounded-full bg-emerald-500/20 animate-pulse" />
                      </div>

                      <div className="h-3 rounded-full bg-white/[0.04] w-[50%] mt-3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  Workspace Sync
                </p>

                <p className="text-xs font-black text-cyan-400">
                  Authenticating...
                </p>
              </div>

              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
