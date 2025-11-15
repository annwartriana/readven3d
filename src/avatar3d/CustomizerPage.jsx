import { useState } from "react";
import { Heart, Briefcase, PawPrint, Sparkles, Gem } from "lucide-react";
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
    { key: "graduation", label: "Graduación", icon: <Sparkles size={18} /> },
    { key: "anime", label: "Anime", icon: <Sparkles size={18} /> },
    { key: "videogames", label: "Video Juegos", icon: <Sparkles size={18} /> },
    { key: "wedding", label: "Matrimonio", icon: <Heart size={18} /> },
    { key: "pets", label: "Mascotas", icon: <PawPrint size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "showcase":
        return <ProductShowcase />;
      case "anime":
        return <AnimeOutfitAvatarPage />;
      case "graduation":
        return <GraduationCustomizer/>;
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
      <div className="min-h-screen bg-gradient-to-br from-[#fbf2e7] to-[#d0e8ff] p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 sm:flex sm:justify-start border-b">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium transition-all 
              ${
                activeTab === tab.key
                  ? "text-[#1080e7] border-b-2 border-[#ff8f20]"
                  : "text-gray-500 hover:text-[#1080e7]"
              }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export default CustomizerPage;
