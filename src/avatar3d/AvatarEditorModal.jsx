import { X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

// Categorías base (sin barba)
const baseCategories = ["glasses", "hair", "legs", "top", "shoes", "item"];

// Traducciones al español
const categoryLabels = {
  hair: "Cabello",
  legs: "Piernas",
  top: "Torso",
  shoes: "Zapatos",
  item: "Ítem",
  glasses: "Gafas",
  beard: "Barba",
};

const hairColorLabels = {
  blonde: "Rubio",
  brown: "Castaño",
  black: "Negro",
  red: "Rojo",
};

const skinToneLabels = {
  white: "Claro",
  brown: "Medio",
  afro: "Oscuro",
};

const hairColorsBySex = {
  M: ["blonde", "brown", "black"],
  W: ["blonde", "brown", "black", "red"],
};

export default function AvatarEditorModal({
  initialSex = "M",
  itemsByCategory = {},
  onSave,
  onClose,
}) {
  const [sex, setSex] = useState(initialSex);
  const [equipped, setEquipped] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("hair");
  const [itemIndex, setItemIndex] = useState(0);
  const [hairColor, setHairColor] = useState("black");
  const [skinTone, setSkinTone] = useState("white");

  const sexPath = sex === "M" ? "man" : "woman";
  const baseImage = `/avatarImages/${sexPath}/body_${skinTone}.png`;

  const availableHairColors = useMemo(() => hairColorsBySex[sex], [sex]);

  const categories = useMemo(() => {
    return sex === "M" ? [...baseCategories, "beard"] : [...baseCategories];
  }, [sex]);

  const items = useMemo(() => {
    const baseItems = itemsByCategory[selectedCategory] || [];

    if (selectedCategory === "hair") {
      return baseItems.map((item) => ({
        ...item,
        url: `/avatarImages/${sexPath}/hair/${item.name}_${hairColor}.png`,
      }));
    } else if (selectedCategory === "beard") {
      return baseItems.map((item) => ({
        ...item,
        url: `/avatarImages/${sexPath}/beard/${item.name}_${hairColor}.png`,
      }));
    } else {
      return baseItems.map((item) => ({
        ...item,
        url: `/avatarImages/${sexPath}/${selectedCategory}/${item.name}.png`,
      }));
    }
  }, [selectedCategory, hairColor, sex, itemsByCategory]);

  const handleEquip = (item) => {
    setEquipped((prev) => ({ ...prev, [selectedCategory]: item }));
  };

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
    onSave({ sex, skinTone, equipped });
    onClose();
  };

  const handleReset = () => {
    setEquipped({});
  };

  useEffect(() => {
    const allowedColors = hairColorsBySex[sex];

    if (!allowedColors.includes(hairColor)) {
      setHairColor(allowedColors[0]);
    }

    setEquipped((prev) => {
      const newEquip = { ...prev };

      // Quitar cabello incompatible
      if (
        newEquip.hair &&
        !newEquip.hair.url.includes(`_${allowedColors.join("|")}`)
      ) {
        delete newEquip.hair;
      }

      // Quitar barba si es mujer
      if (sex === "W" && newEquip.beard) {
        delete newEquip.beard;
      }

      return newEquip;
    });

    // Si la categoría actual es "beard" y cambia a mujer, regresar a "hair"
    if (sex === "W" && selectedCategory === "beard") {
      setSelectedCategory("hair");
    }
  }, [sex]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#fbf2e7] to-[#d0e8ff] rounded-2xl p-8 w-full max-w-5xl max-h-screen overflow-y-auto relative shadow-2xl border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* Título principal */}
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8 tracking-wide">
          ✨ Editor de Avatar
        </h2>

        {/* Selector de sexo */}
        <div className="flex justify-center gap-4 mb-6">
          {["M", "W"].map((s) => (
            <label
              key={s}
              className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer border shadow-sm transition-all duration-200 ${
                sex === s
                  ? "bg-pink-100 text-pink-700 border-pink-300 shadow-md"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <input
                type="radio"
                name="sex"
                value={s}
                checked={sex === s}
                onChange={() => setSex(s)}
                className="hidden"
              />
              {s === "M" ? "Hombre" : "Mujer"}
            </label>
          ))}
        </div>

        {/* Selector de tono de piel */}
        <div className="flex justify-center gap-3 mb-8">
          {["white", "brown", "afro"].map((tone) => (
            <button
              key={tone}
              onClick={() => setSkinTone(tone)}
              className={`px-5 py-2 rounded-full text-sm font-medium border shadow-sm transition-all duration-200 ${
                skinTone === tone
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
            >
              {skinToneLabels[tone]}
            </button>
          ))}
        </div>

        {/* Selector de color de cabello */}

        <div className="mb-6">
          <div className="flex justify-center flex-wrap gap-3">
            {availableHairColors.map((color) => (
              <label
                key={color}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border text-sm font-medium transition-all duration-200 shadow-sm ${
                  hairColor === color
                    ? "bg-blue-600 text-white border-blue-700 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <input
                  type="radio"
                  name="hairColor"
                  value={color}
                  checked={hairColor === color}
                  onChange={() => {
                    setHairColor(color);

                    // Actualizar cabello equipado
                    if (equipped.hair) {
                      const newHair = {
                        ...equipped.hair,
                        url: `/avatarImages/${sexPath}/hair/${equipped.hair.name}_${color}.png`,
                      };
                      setEquipped((prev) => ({ ...prev, hair: newHair }));
                    }

                    // Actualizar barba equipada
                    if (equipped.beard) {
                      const newBeard = {
                        ...equipped.beard,
                        url: `/avatarImages/${sexPath}/beard/${equipped.beard.name}_${color}.png`,
                      };
                      setEquipped((prev) => ({ ...prev, beard: newBeard }));
                    }
                  }}
                  className="hidden"
                />
                <span>{hairColorLabels[color]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Vista previa del avatar y editor */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">

          {/*Columna izquierda: Vista previa del avatar */}
          <div className="flex md:w-1/2 justify-center">
            <div className="relative w-64 h-80 mx-auto rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_0_30px_rgba(0,0,0,0.3)] bg-gradient-to-tr from-gray-50 via-gray-100 to-gray-300">
              {/* Efecto de iluminación */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0" />

              {/* Avatar base y capas */}
              <div className="relative z-10 w-full h-full">
                <img
                  src={baseImage}
                  alt="Base"
                  className="absolute w-full h-full"
                />
                {categories.map(
                  (cat) =>
                    equipped[cat] && (
                      <img
                        key={cat}
                        src={equipped[cat].url}
                        alt={cat}
                        className="absolute w-full h-full transition duration-300"
                      />
                    )
                )}
              </div>
            </div>
          </div>

          {/* Categorías e ítems */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {/* Categorías */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 tracking-wide">
                Categorías
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setItemIndex(0);
                    }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm border transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white border-blue-700 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Ítems disponibles */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 tracking-wide">
                Ítems disponibles
              </h3>
              <div className="grid grid-cols-4 gap-4 bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-200 rounded-xl shadow-inner min-h-[130px]">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <img
                      key={item.id}
                      src={item.url}
                      alt="item"
                      onClick={() => {
                        setItemIndex(index);
                        handleEquip(item);
                      }}
                      className={`w-20 h-20 object-contain rounded-xl cursor-pointer transition-all duration-300 transform ${
                        itemIndex === index
                          ? "border-2 border-blue-500 scale-105 shadow-md"
                          : "border border-transparent hover:border-blue-300 hover:scale-105"
                      }`}
                    />
                  ))
                ) : (
                  <p className="col-span-4 text-sm text-gray-500">
                    No hay ítems disponibles.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
          >
            Reiniciar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
