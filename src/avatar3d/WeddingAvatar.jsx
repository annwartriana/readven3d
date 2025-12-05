import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

const mock = {
  hair: [
    { id: 1, name: "hair1" },
    { id: 2, name: "hair2" },
    { id: 3, name: "hair3" },
    { id: 4, name: "hair4" },
    { id: 5, name: "hair5" },
    { id: 6, name: "hair6" },
    { id: 7, name: "hair7" },
    { id: 8, name: "hair8" },
    { id: 9, name: "hair9" },
  ],
  beard: [
    { id: 0, name: null },
    { id: 1, name: "beard1" },
    { id: 2, name: "beard2" },
    { id: 3, name: "beard3" },
    { id: 4, name: "beard4" },
    { id: 5, name: "beard5" },
    { id: 6, name: "beard6" },
  ],
  glasses: [
    { id: 0, name: null },
    { id: 1, name: "glasses1" },
  ],
  outfits: {
    M: [
      { id: 1, name: "wedding_m1", label: "Novio Clásico" },
      { id: 1, name: "wedding_m2", label: "Novio Atado" },
      { id: 1, name: "wedding_m3", label: "Novio Gamer" },
      { id: 1, name: "wedding_m4", label: "Novio Apocalipsis" },
    ],
    W: [
      { id: 1, name: "wedding_f1", label: "Novia Clásica" },
      { id: 1, name: "wedding_f2", label: "Novia Enojada" },
      { id: 1, name: "wedding_f3", label: "Novia Apocalipsis" },
    ],
  },
};

const hairColorLabels = {
  blonde: "Rubio",
  brown: "Castaño",
  black: "Negro",
  red: "Rojo",
  white: "Blanco",
};

const hairColorValues = {
  blonde: "#f3d27a",
  brown: "#8b5a2b",
  black: "#1c1c1c",
  red: "#b22222",
  white: "#ffffff",
};

const hairColorsBySex = {
  M: ["blonde", "brown", "black", "white"],
  W: ["blonde", "brown", "black", "white", "red"],
};

// === Customizer individual (Hombre o Mujer) ===
function WeddingAvatar({ sex, itemsByCategory, config, onConfigChange }) {
  const { hairColor, hairIndex, beardIndex, glassesIndex, outfit } = config;

  const sexPath = sex === "M" ? "man" : "woman";
  const baseImage = `/avatarImages/${sexPath}/body.png`;
  const availableHairColors = useMemo(() => hairColorsBySex[sex], [sex]);

  const hairItems = useMemo(() => {
    const src = itemsByCategory.hair || [];
    return src.map((i) => ({
      ...i,
      url: i.name
        ? `/avatarImages/${sexPath}/hair/${i.name}_${hairColor}.png`
        : null,
    }));
  }, [itemsByCategory.hair, sexPath, hairColor]);

  const beardItems = useMemo(() => {
    if (sex !== "M") return [];
    const src = itemsByCategory.beard || [];
    return src.map((i) => ({
      ...i,
      url: i.name
        ? `/avatarImages/${sexPath}/beard/${i.name}_${hairColor}.png`
        : null,
    }));
  }, [itemsByCategory.beard, sex, sexPath, hairColor]);

  const glassesItems = useMemo(() => {
    const src = itemsByCategory.glasses || [];
    return src.map((i) => ({
      ...i,
      url: i.name ? `/avatarImages/${sexPath}/glasses/${i.name}.png` : null,
    }));
  }, [itemsByCategory.glasses, sexPath]);

  const outfitUrl = useMemo(() => {
    if (!outfit) return null;
    return `/avatarImages/${sexPath}/wedding/${outfit.name}.png`;
  }, [outfit, sexPath]);

  const nextIdx = (idx, len) => (len === 0 ? -1 : (idx + 1) % len);
  const prevIdx = (idx, len) => (len === 0 ? -1 : (idx - 1 + len) % len);

  const layers = useMemo(() => {
    const arr = [];
    if (outfitUrl) arr.push({ key: "outfit", url: outfitUrl });
    if (glassesIndex >= 0 && glassesItems[glassesIndex]?.url)
      arr.push({ key: "glasses", url: glassesItems[glassesIndex].url });
    if (hairIndex >= 0 && hairItems[hairIndex]?.url)
      arr.push({ key: "hair", url: hairItems[hairIndex].url });
    if (sex === "M" && beardIndex >= 0 && beardItems[beardIndex]?.url)
      arr.push({ key: "beard", url: beardItems[beardIndex].url });

    return arr;
  }, [
    outfitUrl,
    hairIndex,
    hairItems,
    sex,
    beardIndex,
    beardItems,
    glassesIndex,
    glassesItems,
  ]);

  const handleChange = (field, value) => {
    onConfigChange({ ...config, [field]: value });
  };

  const handleReset = () => {
    handleChange("hairColor", "black");
    handleChange("hairIndex", -1);
    handleChange("beardIndex", -1);
    handleChange("glassesIndex", -1);
    handleChange("outfit", null);
  };

  // Panel de flechas
  const ArrowPanel = () => {
    const btnBase =
      "px-2 py-1 bg-white/80 rounded-full shadow hover:bg-white transition disabled:opacity-30 w-12 h-12 flex items-center justify-center";

    const ControlRow = ({ label, hasItems, onPrev, onNext }) => (
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex gap-2">
          <button
            type="button"
            className={btnBase}
            onClick={onPrev}
            disabled={!hasItems}
          >
            <ArrowBigLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            className={btnBase}
            onClick={onNext}
            disabled={!hasItems}
          >
            <ArrowBigRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );

    return (
      <div className="flex flex-col gap-6">
        <ControlRow
          label="Cabello"
          hasItems={hairItems.length > 0}
          onPrev={() =>
            handleChange("hairIndex", prevIdx(hairIndex, hairItems.length))
          }
          onNext={() =>
            handleChange("hairIndex", nextIdx(hairIndex, hairItems.length))
          }
        />
        {sex === "M" && (
          <ControlRow
            label="Barba"
            hasItems={beardItems.length > 0}
            onPrev={() =>
              handleChange("beardIndex", prevIdx(beardIndex, beardItems.length))
            }
            onNext={() =>
              handleChange("beardIndex", nextIdx(beardIndex, beardItems.length))
            }
          />
        )}
        <ControlRow
          label="Gafas"
          hasItems={glassesItems.length > 0}
          onPrev={() =>
            handleChange(
              "glassesIndex",
              prevIdx(glassesIndex, glassesItems.length)
            )
          }
          onNext={() =>
            handleChange(
              "glassesIndex",
              nextIdx(glassesIndex, glassesItems.length)
            )
          }
        />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 border bg-gradient-to-br from-[#a2e7fc] to-[#75d4f0]">
      <h2 className="text-lg font-bold mb-4">
        {sex === "M" ? "Novio" : "Novia"}
      </h2>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4">
        <ArrowPanel />
        <div className="relative w-full max-w-xs sm:max-w-sm md:w-[16rem] md:h-[22rem] aspect-[3/4] bg-gray-50 border rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
          <img
            src={baseImage}
            alt="Base"
            className="absolute w-full h-full object-contain"
          />
          {layers.map(({ key, url }) => (
            <img
              key={key + url}
              src={url}
              alt=""
              className="absolute w-full h-full object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ))}
        </div>
      </div>

      {/* Select personaje */}
      <section className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Personaje / Atuendo
        </label>
        <select
          value={outfit?.name || ""}
          onChange={(e) => {
            const selectedName = e.target.value;
            const selected =
              itemsByCategory.outfits[sex].find(
                (o) => o.name === selectedName
              ) || null;
            handleChange("outfit", selected);
          }}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sin atuendo</option>
          {itemsByCategory.outfits[sex].map((o) => (
            <option key={o.name} value={o.name}>
              {o.label}
            </option>
          ))}
        </select>
      </section>

      {/* Colores cabello */}
      <section className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Color de cabello
        </label>
        {/* CÓDIGO CORREGIDO: se añadió la clase flex-wrap */}
        <div className="flex flex-wrap gap-4">
          {availableHairColors.map((color) => (
            <label key={color}>
              <input
                type="radio"
                name={`hairColor-${sex}`}
                value={color}
                checked={hairColor === color}
                onChange={() => handleChange("hairColor", color)}
                className="hidden peer"
              />
              <div
                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                  hairColor === color
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: hairColorValues[color] }}
                title={hairColorLabels[color]}
              />
            </label>
          ))}
        </div>
      </section>

      {/* Acciones */}
      <div className="flex gap-4 pt-4 border-t mt-6">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

// === Componente principal para figuras de matrimonio ===
export default function WeddingAvatars() {
  const initialConfig = {
    hairColor: "black",
    hairIndex: -1,
    beardIndex: -1,
    glassesIndex: -1,
    outfit: null,
  };

  const [groomConfig, setGroomConfig] = useState(initialConfig);
  const [brideConfig, setBrideConfig] = useState(initialConfig);

  // Efecto para inicializar el atuendo por defecto al cargar
  useEffect(() => {
    const firstGroomOutfit = mock.outfits.M?.[0] || null;
    const firstBrideOutfit = mock.outfits.W?.[0] || null;
    setGroomConfig((prev) => ({ ...prev, outfit: firstGroomOutfit }));
    setBrideConfig((prev) => ({ ...prev, outfit: firstBrideOutfit }));
  }, []);

  const handleSave = () => {
    const getEquippedItems = (config, itemsByCategory, sex) => {
      const equipped = {};
      const { hairIndex, beardIndex, glassesIndex, outfit } = config;

      const hairItems = itemsByCategory.hair || [];
      const beardItems = sex === "M" ? itemsByCategory.beard || [] : [];
      const glassesItems = itemsByCategory.glasses || [];

      if (hairIndex >= 0 && hairItems[hairIndex])
        equipped.hair = hairItems[hairIndex];
      if (sex === "M" && beardIndex >= 0 && beardItems[beardIndex])
        equipped.beard = beardItems[beardIndex];
      if (glassesIndex >= 0 && glassesItems[glassesIndex])
        equipped.glasses = glassesItems[glassesIndex];
      if (outfit) equipped.outfit = outfit;

      return equipped;
    };

    const groomData = {
      sex: "M",
      hairColor: groomConfig.hairColor,
      equipped: getEquippedItems(groomConfig, mock, "M"),
    };

    const brideData = {
      sex: "W",
      hairColor: brideConfig.hairColor,
      equipped: getEquippedItems(brideConfig, mock, "W"),
    };

    console.log("Datos del novio:", groomData);
    console.log("Datos de la novia:", brideData);
    alert("¡Figuras guardadas con éxito!");
  };

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#46abcb] to-[#127795] rounded-xl shadow-xl border border-gray-200 p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-[#024b61] tracking-tight">
          Figuras de Matrimonio Personalizadas
        </h1>
        <p className="text-white mt-2 text-base">
          Personaliza al novio y la novia con tu estilo favorito.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <WeddingAvatar
          sex="M"
          itemsByCategory={mock}
          config={groomConfig}
          onConfigChange={setGroomConfig}
        />
        <WeddingAvatar
          sex="W"
          itemsByCategory={mock}
          config={brideConfig}
          onConfigChange={setBrideConfig}
        />
      </div>
      <div className="flex justify-center mt-8">
        {/* <button
          onClick={handleSave}
          className="px-8 py-3 rounded-lg bg-green-600 text-white text-lg font-bold hover:bg-green-700 transition"
        >
          Guardar Figuras
        </button> */}
      </div>
    </div>
  );
}
