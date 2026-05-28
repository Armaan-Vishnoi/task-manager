"use client";

import { useState } from "react";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function resetPassword() {
    if (!email || !password) {
      setError(
        "Please fill all fields"
      );

      return;
    }

    try {
      setLoading(true);

      setError("");

      setSuccess("");

      const response =
        await fetch(
          "http://localhost:3000/api/forgot-password",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (data.error) {
        setError(data.error);

        return;
      }

      setSuccess(
        "Password updated successfully"
      );

      setTimeout(() => {
        router.push("/login");
      }, 1800);
    } catch (error) {
      console.error(error);

      setError(
        "Server connection failed"
      );
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
      {/* BG */}

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

        <div className="relative px-6 sm:px-8 py-8">
          {/* BACK */}

          <Link
            href="/login"
            className="
              inline-flex
              items-center gap-2
              text-sm
              text-slate-400
              hover:text-white
              transition-colors
            "
          >
            <FaArrowLeft size={12} />
            Back to login
          </Link>

          {/* ICON */}

          <div
            className="
              mt-6
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
            "
          >
            <FaLock />
          </div>

          {/* TITLE */}

          <h1
            className="
              text-4xl
              font-black
              text-white
              mt-6
            "
          >
            Reset Password
          </h1>

          <p className="text-slate-500 mt-3">
            Update your account password securely
          </p>

          {/* SUCCESS */}

          {success && (
            <div
              className="
                mt-6
                rounded-2xl
                border border-emerald-500/20
                bg-emerald-500/10
                px-4 py-3
                text-sm
                font-semibold
                text-emerald-300
                flex items-center gap-3
              "
            >
              <FaCheckCircle />
              {success}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div
              className="
                mt-6
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

          {/* FORM */}

          <div className="space-y-5 mt-6">
            {/* EMAIL */}

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    pl-11 pr-4
                    py-4
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-500/30
                    focus:ring-4 focus:ring-cyan-500/10
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.15em] text-slate-500 mb-2">
                New Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />

                <input
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  type="password"
                  placeholder="Enter new password"
                  className="
                    w-full
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    pl-11 pr-4
                    py-4
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-500/30
                    focus:ring-4 focus:ring-cyan-500/10
                  "
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={resetPassword}
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
                hover:scale-[1.02]
                disabled:opacity-50
              "
            >
              {loading
                ? "Updating Password..."
                : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}