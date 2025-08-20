// AvatarEditorModal.jsx
import { X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

const categories = ["eyes", "hair", "legs", "top", "hands", "shoes", "item", "hat"];

const hairColorsBySex = {
  M: ["blonde", "brown", "black"],
  W: ["blonde", "brown", "black", "red"],
};

export default function AvatarEditorModal({ initialSex = "M", itemsByCategory = {}, onSave, onClose }) {
  const [sex, setSex] = useState(initialSex);
  const [equipped, setEquipped] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("hair");
  const [itemIndex, setItemIndex] = useState(0);
  const [hairColor, setHairColor] = useState("black");

  const sexPath = sex === "M" ? "man" : "woman";
  const baseImage = `/avatarImages/${sexPath}/body.png`;

  const availableHairColors = useMemo(() => hairColorsBySex[sex], [sex]);

  const items = useMemo(() => {
    const baseItems = itemsByCategory[selectedCategory] || [];

    return baseItems.map((item) => {
      const url =
        selectedCategory === "hair"
          ? `/avatarImages/${sexPath}/hair/${item.name}_${hairColor}.png`
          : `/avatarImages/${sexPath}/${selectedCategory}/${item.name}.png`;
      return { ...item, url };
    });
  }, [selectedCategory, hairColor, sex, itemsByCategory]);

  const handleEquip = (item) => setEquipped((prev) => ({ ...prev, [selectedCategory]: item }));

  const handlePrev = () => {
    if (items.length === 0) return;
    const newIndex = (itemIndex - 1 + items.length) % items.length;
    setItemIndex(newIndex);
    handleEquip(items[newIndex]);
  };

  const handleNext = () => {
    if (items.length === 0) return;
    const newIndex = (itemIndex + 1) % items.length;
    setItemIndex(newIndex);
    handleEquip(items[newIndex]);
  };

  const handleSave = () => {
    onSave({ sex, equipped });
    onClose();
  };

  const handleReset = () => setEquipped({});

  useEffect(() => {
    const allowedColors = hairColorsBySex[sex];
    if (!allowedColors.includes(hairColor)) setHairColor(allowedColors[0]);
  }, [sex]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-5xl p-6 relative border border-white/30">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-400">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Editor de Avatar</h2>

        {/* Gender selection */}
        <div className="flex justify-center gap-6 mb-4 text-white">
          {["M", "W"].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sex"
                value={g}
                checked={sex === g}
                onChange={() => setSex(g)}
                className="accent-pink-500"
              />
              {g === "M" ? "Hombre" : "Mujer"}
            </label>
          ))}
        </div>

        {/* Hair color selection */}
        {selectedCategory === "hair" && (
          <div className="flex justify-center gap-3 mb-6">
            {availableHairColors.map((color) => (
              <label key={color} className="flex items-center gap-1 text-white capitalize cursor-pointer">
                <input
                  type="radio"
                  name="hairColor"
                  value={color}
                  checked={hairColor === color}
                  onChange={() => setHairColor(color)}
                  className="accent-yellow-400"
                />
                {color}
              </label>
            ))}
          </div>
        )}

        {/* Avatar Preview */}
        <div className="relative w-56 h-80 mx-auto mb-6 rounded-xl bg-gradient-to-b from-white/20 to-white/10 shadow-inner overflow-hidden border border-white/20">
          <img src={baseImage} alt="Base" className="absolute w-full h-full object-contain" />
          {categories.map((cat) =>
            equipped[cat] ? (
              <img key={cat} src={equipped[cat].url} alt={cat} className="absolute w-full h-full object-contain" />
            ) : null
          )}
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setItemIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition duration-200 ${
                selectedCategory === cat
                  ? "bg-pink-600 text-white shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Item selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mb-6">
          {items.length > 0 ? (
            items.map((item, index) => (
              <img
                key={item.id}
                src={item.url}
                onClick={() => {
                  setItemIndex(index);
                  handleEquip(item);
                }}
                className={`w-24 h-24 object-contain rounded-xl transition-all border-2 cursor-pointer ${
                  itemIndex === index ? "scale-105 border-pink-500" : "border-transparent hover:scale-105"
                }`}
              />
            ))
          ) : (
            <p className="col-span-full text-white text-center">No hay ítems disponibles</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
          >
            Reiniciar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Guardar Avatar
          </button>
        </div>
      </div>
    </div>
  );
}
