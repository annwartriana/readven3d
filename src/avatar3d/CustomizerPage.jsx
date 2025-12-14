import { useState } from "react";
import {
  Heart,
  Briefcase,
  PawPrint,
  Sparkles,
  Gem,
  Instagram,
  Music,
  MessageCircle,
} from "lucide-react";

import PetCustomizer from "./PetCustomizer";
import ProfessionAvatarPage from "./ProfessionAvatarPage";
import AnimeOutfitAvatarPage from "./AnimeAvatarPage";
import WeddingAvatars from "./WeddingAvatar";
import ProductShowcase from "./ProductShowCase";
import GraduationCustomizer from "./GraduationCustomizer";
import VideoGameCustomizer from "./VideoGameCustomizer";

const CustomizerPage = () => {
  const [activeTab, setActiveTab] = useState("showcase");

  const tabs = [
    { key: "showcase", label: "Presentación", icon: <Gem size={18} /> },
    { key: "professions", label: "Profesiones", icon: <Briefcase size={18} /> },
    {
      key: "sports",
      label: "Deportes y Graduación",
      icon: <Sparkles size={18} />,
    },
    { key: "anime", label: "Anime y TV", icon: <Sparkles size={18} /> },
    { key: "videogames", label: "Videojuegos", icon: <Sparkles size={18} /> },
    { key: "wedding", label: "Matrimonio", icon: <Heart size={18} /> },
    { key: "pets", label: "Mascotas", icon: <PawPrint size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "showcase":
        return <ProductShowcase />;
      case "anime":
        return <AnimeOutfitAvatarPage />;
      case "sports":
        return <GraduationCustomizer />;
      case "videogames":
        return <VideoGameCustomizer />;
      case "professions":
        return <ProfessionAvatarPage />;
      case "wedding":
        return <WeddingAvatars />;
      case "pets":
        return <PetCustomizer />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-5">
          {/* Logo + Marca */}
          <div className="flex items-center gap-3">
            <img
              src="/logo/LogoReadvenLateral.svg"
              alt="Readven"
              className="h-7 object-contain"
            />
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/573143292411"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-green-500 text-white shadow hover:scale-105 transition transform"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://www.instagram.com/readvenofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 text-white shadow hover:scale-105 transition transform"
            >
              <Instagram size={20} />
            </a>

            <a
              href="https://www.tiktok.com/@readvenofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black text-white shadow hover:scale-105 transition transform"
            >
              <Music size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Fondo */}
      <div className="min-h-screen bg-gradient-to-br from-[#fde7ff] via-[#e8f3ff] to-[#d0e8ff] p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Tabs */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-start border-b bg-white/70 backdrop-blur">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-semibold transition-all rounded-t-lg
                  ${
                    activeTab === tab.key
                      ? "text-[#ff7b00] border-b-4 border-[#ff7b00] bg-orange-50"
                      : "text-gray-500 hover:text-[#1080e7] hover:bg-blue-50"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export default CustomizerPage;
