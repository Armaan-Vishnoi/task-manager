"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSave,
  FaUser,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import Loader from "../components/Loader";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [image, setImage] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");

      return;
    }

    const parsedUser = JSON.parse(storedUser);

    setUser(parsedUser);

    setName(parsedUser.name);

    setEmail(parsedUser.email);

    setImage(parsedUser.image || "");
  }, [router]);

  function handleImageUpload(e: any) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  async function updateProfile() {
    try {
      setLoading(true);

      setError("");

      setSuccess("");

      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            image,
          }),
        },
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);

        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);

      setName(data.name);

      setEmail(data.email);

      setImage(data.image || "");

      setPassword("");

      setSuccess("Profile updated successfully");
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");
  }

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* SIDEBAR */}

      <Sidebar
        activeProjectId=""
        setActiveProjectId={() => {}}
        openProjectModal={() => {}}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* CONTENT */}

      <div className="flex-1 overflow-x-hidden">
        <Navbar user={user} setSidebarOpen={setSidebarOpen} onLogout={logout} />

        {/* PAGE */}

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* HEADER */}

            <div className="mb-8">
              <h1
                className="
                  text-4xl sm:text-5xl
                  font-black
                  tracking-tight
                  bg-gradient-to-r
                  from-indigo-400
                  via-cyan-400
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                Profile Settings
              </h1>

              <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">
                Manage your account preferences and profile information
              </p>
            </div>

            {/* GRID */}

            <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
              {/* LEFT PANEL */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border border-white/10
                  bg-[#0f172a]/90
                  backdrop-blur-2xl
                  shadow-[0_10px_50px_rgba(0,0,0,0.45)]
                  p-6
                "
              >
                {/* GLOW */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

                {/* PROFILE */}

                <div className="relative flex flex-col items-center text-center">
                  {/* AVATAR */}

                  <div
                    className="
                      relative
                      w-32 h-32
                      rounded-full
                      overflow-hidden
                      border-4 border-cyan-500/20
                      shadow-[0_10px_40px_rgba(59,130,246,0.35)]
                    "
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Profile"
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-full
                          h-full
                          bg-gradient-to-r
                          from-indigo-500
                          to-cyan-500
                          flex items-center justify-center
                          text-white
                          text-5xl
                          font-black
                        "
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* IMAGE BUTTON */}

                  

                  {/* USER */}

                  <h2 className="text-3xl font-black text-white mt-6">
                    {name}
                  </h2>

                  <p className="text-slate-500 mt-2 break-all">{email}</p>

                  {/* STATUS */}

                  <div
                    className="
                      mt-5
                      inline-flex
                      items-center gap-2
                      rounded-2xl
                      border border-emerald-500/20
                      bg-emerald-500/10
                      px-4 py-3
                    "
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />

                    <span className="text-xs font-black uppercase tracking-wide text-emerald-300">
                      Active Account
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border border-white/10
                  bg-[#0f172a]/90
                  backdrop-blur-2xl
                  shadow-[0_10px_50px_rgba(0,0,0,0.45)]
                "
              >
                {/* GLOW */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#4338ca20,transparent_35%)] pointer-events-none" />

                {/* HEADER */}

                <div
                  className="
                    relative
                    px-5 sm:px-7
                    py-5
                    border-b border-white/5
                  "
                >
                  <h2 className="text-2xl font-black text-white">
                    Account Information
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    Update your profile and security settings
                  </p>
                </div>

                {/* BODY */}

                <div className="relative p-5 sm:p-7 space-y-5">
                  {/* SUCCESS */}

                  {success && (
                    <div
                      className="
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

                  {/* NAME */}

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
                        <FaUser size={13} />
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-white">
                          Full Name
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          Update your display name
                        </p>
                      </div>
                    </div>

                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
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

                  {/* EMAIL */}

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
                        <FaEnvelope size={13} />
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-white">
                          Email Address
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          Update your account email
                        </p>
                      </div>
                    </div>

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
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
                        focus:border-cyan-500/30
                        focus:ring-4 focus:ring-cyan-500/10
                      "
                    />
                  </div>

                  {/* PASSWORD */}

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
                        <FaLock size={13} />
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-white">
                          Password
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          Update your password securely
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Leave empty to keep current password"
                        className="
                          w-full
                          rounded-2xl
                          border border-white/10
                          bg-white/[0.04]
                          pl-4 pr-14
                          py-4
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

                  {/* ACTIONS */}

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    {/* SAVE */}

                    <button
                      onClick={updateProfile}
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
                        {loading ? (
                          <>
                            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave size={13} />
                            Save Changes
                          </>
                        )}
                      </span>
                    </button>

                    {/* LOGOUT */}

                    <button
                      onClick={logout}
                      className="
                        h-14
                        px-6
                        rounded-2xl
                        border border-red-500/20
                        bg-red-500/10
                        text-red-300
                        text-sm
                        font-black
                        transition-all duration-300
                        hover:bg-red-500/20
                        hover:scale-[1.01]
                      "
                    >
                      <span className="inline-flex items-center gap-3">
                        Logout
                        <FaArrowRight size={11} />
                      </span>
                    </button>
                  </div>

                  {/* FOOTER */}

                  <div className="pt-2">
                    <div
                      className="
                        rounded-2xl
                        border border-white/5
                        bg-white/[0.03]
                        px-5 py-4
                        flex items-center gap-3
                      "
                    >
                      <div
                        className="
                          h-10 w-10
                          rounded-xl
                          bg-emerald-500/10
                          border border-emerald-500/20
                          flex items-center justify-center
                          text-emerald-400
                        "
                      >
                        <FaCheckCircle size={12} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-white">
                          Account Security
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          Your session is securely encrypted
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
