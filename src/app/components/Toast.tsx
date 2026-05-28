"use client"

interface Props {

  message: string

  type: "success" | "error"

  onClose: () => void
}

export default function Toast({

  message,

  type,

  onClose,
}: Props) {

  return (

    <div
      className={`fixed top-6 right-6 z-[9999] px-6 py-4 rounded-2xl shadow-2xl text-white font-bold ${
        type === "success"
          ? "bg-emerald-600"
          : "bg-red-600"
      }`}
    >

      <div className="flex items-center gap-4">

        <p>

          {message}

        </p>

        <button
          onClick={onClose}
        >

          ✕

        </button>

      </div>

    </div>
  )
}