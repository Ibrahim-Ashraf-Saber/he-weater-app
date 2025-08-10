import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, Bounce } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function SearchBar({ setCity, handleUseLocation, isLoading }) {
  const [input, setInput] = useState("");
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      toast.warn("Enter City!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return;
    }

    setCity(input);
    setInput("");
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-transparent p-3 border-b-[1px] border-white"
      >
        <input
          type="text"
          placeholder={t("Search Location...")}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          <FaSearch className="text-xl cursor-pointer" />
        </button>
      </form>
      <button
        onClick={handleUseLocation}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        disabled={isLoading}
      >
        {t("Use My Location")}
      </button>
    </div>
  );
}
