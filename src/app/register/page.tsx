"use client";

import { useState } from "react";

import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  async function register() {
    if (!name || !email || !password) {
      setError("All fields are required");

      return;
    }

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);

        return;
      }

      setSuccess("Account created successfully");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
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
              Create Account
            </h1>

            <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
              Start managing projects, tasks and workspace productivity in one
              place.
            </p>
          </div>
        </div>

        {/* BODY */}

        <div className="relative px-6 sm:px-8 pb-8">
          {/* SUCCESS */}

          {success && (
            <div
              className="
                mb-5
                rounded-2xl
                border border-emerald-500/20
                bg-emerald-500/10
                px-4 py-3
                text-sm
                font-semibold
                text-emerald-300
              "
            >
              {success}
            </div>
          )}

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
            {/* NAME */}

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
                Username
              </label>

              <div className="relative">
                <FaUser
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter username"
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
                  placeholder="Create password"
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

            {/* PASSWORD STRENGTH */}

            <div
              className="
                rounded-2xl
                border border-white/5
                bg-white/[0.03]
                p-4
              "
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  Password Strength
                </p>

                <p className="text-xs font-bold text-cyan-400">Strong</p>
              </div>

              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="
                    h-full
                    w-[80%]
                    rounded-full
                    bg-gradient-to-r
                    from-indigo-500
                    via-cyan-500
                    to-emerald-500
                  "
                />
              </div>
            </div>

            {/* TERMS */}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="
                  mt-1
                  h-4 w-4
                  rounded
                  border-white/20
                  bg-white/5
                  accent-indigo-500
                "
              />

              <span className="text-sm text-slate-400 leading-relaxed">
                I agree to the platform terms, privacy policy and workspace
                usage guidelines.
              </span>
            </label>

            {/* BUTTON */}

            <button
              onClick={register}
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
                {loading ? "Creating Account..." : "Create Account"}

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

            {/* FOOTER */}

            <div className="pt-2 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="
                    inline-flex
                    items-center gap-2
                    font-bold
                    text-cyan-400
                    cursor-pointer
                    hover:text-cyan-300
                    transition-colors duration-300
                  "
                >
                  Login
                  <FaCheckCircle size={11} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
