import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

const mock = {
  hair: [
    { id: 0, name: null },
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
  profession: {
    M: [
      { id: 1, name: "lawyer", label: "Abogado" },
      { id: 2, name: "barber", label: "Barbero" },
      { id: 3, name: "chef", label: "Chef" },
      { id: 4, name: "scientist", label: "Científico" },
      { id: 5, name: "builder", label: "Constructor" },
      { id: 6, name: "doctor", label: "Doctor" },
      { id: 7, name: "nurse", label: "Enfermero" },
      { id: 9, name: "sst", label: "Coordinador SST" },
      { id: 10, name: "business", label: "Negocios" },
      { id: 11, name: "teacher", label: "Profesor" },
      { id: 12, name: "worker", label: "Trabajador" },
      { id: 13, name: "veterinarian", label: "Veterinario" },
    ],
    W: [
      { id: 1, name: "lawyer", label: "Abogada" },
      { id: 2, name: "chef", label: "Chef" },
      { id: 4, name: "doctor", label: "Doctora" },
      { id: 5, name: "nurse", label: "Enfermera" },
      { id: 6, name: "sst", label: "Coordinadora SST" },
      { id: 7, name: "business", label: "Negocios" },
      { id: 8, name: "psychologist", label: "Psicóloga" },
      { id: 9, name: "psychologistv2", label: "Psicóloga V2" },
      { id: 10, name: "teacher", label: "Profesora" },
      { id: 11, name: "veterinarian", label: "Veterinaria" },
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
  blonde: "#f3d27a", // Rubio realista
  brown: "#8b5a2b", // Marrón natural
  black: "#1c1c1c", // Negro profundo
  red: "#b22222", // Rojo
  white: "#ffffff", // Blanco
};

const skinToneLabels = {
  white: "Claro",
  brown: "Medio",
  afro: "Oscuro",
};

const hairColorsBySex = {
  M: ["blonde", "brown", "black", "white"],
  W: ["blonde", "brown", "black", "white", "red"],
};

export default function ProfessionAvatarPage({
  initialSex = "M",
  itemsByCategory = mock,
  onSave = () => {},
}) {
  const [sex, setSex] = useState(initialSex);
  const [skinTone, setSkinTone] = useState("white");
  const [hairColor, setHairColor] = useState("black");

  // Índices por categoría
  const [hairIndex, setHairIndex] = useState(0);
  const [beardIndex, setBeardIndex] = useState(0);
  const [glassesIndex, setGlassesIndex] = useState(0);

  // Profesión seleccionada (objeto o null)
  const [profession, setProfession] = useState(null);

  const sexPath = sex === "M" ? "man" : "woman";
  const baseImage = `/avatarImages/${sexPath}/body_${skinTone}.png`;
  const availableHairColors = useMemo(() => hairColorsBySex[sex], [sex]);

  // Ítems con URLs calculadas (no se guardan URLs en estado)
  const hairItems = useMemo(() => {
    const src = itemsByCategory.hair || [];
    return src.map((i) => ({
      ...i,
      url: `/avatarImages/${sexPath}/hair/${i.name}_${hairColor}.png`,
    }));
  }, [itemsByCategory.hair, sexPath, hairColor]);

  const beardItems = useMemo(() => {
    if (sex !== "M") return [];
    const src = itemsByCategory.beard || [];
    return src.map((i) => ({
      ...i,
      url: `/avatarImages/${sexPath}/beard/${i.name}_${hairColor}.png`,
    }));
  }, [itemsByCategory.beard, sex, sexPath, hairColor]);

  const glassesItems = useMemo(() => {
    const src = itemsByCategory.glasses || [];
    return src.map((i) => ({
      ...i,
      url: `/avatarImages/${sexPath}/glasses/${i.name}.png`,
    }));
  }, [itemsByCategory.glasses, sexPath]);

  // Profesiones disponibles según sexo
  const professionItems = useMemo(() => {
    return itemsByCategory.profession?.[sex] || [];
  }, [itemsByCategory.profession, sex]);

  const professionUrl = useMemo(() => {
    if (!profession) return null;
    return `/avatarImages/${sexPath}/profession/${profession.name}.png`;
  }, [profession, sexPath]);

  // Ciclos de índice con envoltura
  const nextIdx = (idx, len) => (len === 0 ? -1 : (idx + 1) % len);
  const prevIdx = (idx, len) =>
    len === 0 ? -1 : idx === -1 ? len - 1 : (idx - 1 + len) % len;

  // Reset total al cambiar sexo (pide el usuario: solo cuerpo base)
  useEffect(() => {
    const allowed = hairColorsBySex[sex];
    if (!allowed.includes(hairColor)) setHairColor(allowed[0]);

    setHairIndex(-1);
    setBeardIndex(-1);
    setGlassesIndex(-1);
    setProfession(null);
  }, [sex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Capas a renderizar (evita imágenes rotas mostrando fallback invisible)
  const layers = useMemo(() => {
    const arr = [];
    if (professionUrl) arr.push({ key: "profession", url: professionUrl });
    if (glassesIndex >= 0 && glassesItems[glassesIndex])
      arr.push({ key: "glasses", url: glassesItems[glassesIndex].url });
    if (hairIndex >= 0 && hairItems[hairIndex])
      arr.push({ key: "hair", url: hairItems[hairIndex].url });
    if (sex === "M" && beardIndex >= 0 && beardItems[beardIndex])
      arr.push({ key: "beard", url: beardItems[beardIndex].url });

    return arr;
  }, [
    professionUrl,
    hairIndex,
    hairItems,
    sex,
    beardIndex,
    beardItems,
    glassesIndex,
    glassesItems,
  ]);

  const handleSave = () => {
    const equipped = {};
    if (hairIndex >= 0 && hairItems[hairIndex])
      equipped.hair = hairItems[hairIndex];
    if (sex === "M" && beardIndex >= 0 && beardItems[beardIndex])
      equipped.beard = beardItems[beardIndex];
    if (glassesIndex >= 0 && glassesItems[glassesIndex])
      equipped.glasses = glassesItems[glassesIndex];
    if (profession) equipped.profession = { ...profession, url: professionUrl };
    onSave({ sex, skinTone, hairColor, equipped });
  };

  const handleReset = () => {
    setSex(initialSex);
    setSkinTone("white");
    setHairColor("black");
    setHairIndex(-1);
    setBeardIndex(-1);
    setGlassesIndex(-1);
    setProfession(null);
  };

  // Flechas
  const ArrowPanel = () => {
    const btnBase =
      "px-2 py-1 bg-white/80 rounded-full shadow hover:bg-white transition disabled:opacity-30 w-12 h-12 flex items-center justify-center";

    const ControlRow = ({ label, hasItems, onPrev, onNext }) => (
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">{label}</span>
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
          onPrev={() => setHairIndex((idx) => prevIdx(idx, hairItems.length))}
          onNext={() => setHairIndex((idx) => nextIdx(idx, hairItems.length))}
        />
        {sex === "M" && (
          <ControlRow
            label="Barba"
            hasItems={beardItems.length > 0}
            onPrev={() =>
              setBeardIndex((idx) => prevIdx(idx, beardItems.length))
            }
            onNext={() =>
              setBeardIndex((idx) => nextIdx(idx, beardItems.length))
            }
          />
        )}
        <ControlRow
          label="Gafas"
          hasItems={glassesItems.length > 0}
          onPrev={() =>
            setGlassesIndex((idx) => prevIdx(idx, glassesItems.length))
          }
          onNext={() =>
            setGlassesIndex((idx) => nextIdx(idx, glassesItems.length))
          }
        />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#a2e7fc] to-[#75d4f0] rounded-xl shadow-xl border border-gray-200 p-4 sm:p-8">
      {/* Cabecera */}
      <div className="mb-6 sm:mb-8 rounded-xl p-4 sm:p-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Texto izquierdo */}
        <div>
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-2">
            ⭐ Nuevo y exclusivo
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight break-words">
            Figura Personalizada Profesión
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Diseña tu personaje único con estilo profesional.
          </p>
        </div>

        {/* Precio derecho */}
        <div className="text-right mt-4 md:mt-0">
          <div className="flex flex-col items-end">
            <span className="text-2xl sm:text-3xl font-bold text-green-600">
              $64.900
            </span>
            <span className="text-sm text-gray-400 line-through">$79.900</span>
            <span className="mt-1 inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
              18% OFF
            </span>
          </div>
        </div>
      </div>

      {/* Selección de sexo → aparece aquí en móviles */}
      <section className="block md:hidden mb-6 order-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Selección de sexo
        </label>
        <div className="flex gap-4">
          {["M", "W"].map((s) => (
            <label
              key={s}
              className={`flex-1 text-center px-4 py-2 border rounded-lg cursor-pointer ${
                sex === s
                  ? "bg-[#46abcb] border-blue-500 bg-[#75d4f0] text-white"
                  : "bg-[#127795] border-gray-300 hover:bg-gray-50 text-white"
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
      </section>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna imagen + flechas */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4">
          <div className="flex flex-col gap-6">
            <ArrowPanel />
          </div>

          <div className="relative w-full max-w-xs sm:max-w-sm md:w-[22rem] md:h-[30rem] aspect-[3/4] bg-gray-50 border rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
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

        {/* Columna personalización */}
        <div className="space-y-6">
          {/* Sexo → visible solo en desktop */}
          <section className="hidden md:block">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selección de sexo
            </label>
            <div className="flex gap-4">
              {["M", "W"].map((s) => (
                <label
                  key={s}
                  className={`flex-1 text-center px-4 py-2 border rounded-lg cursor-pointer ${
                    sex === s
                      ? "bg-[#46abcb] border-blue-500 bg-[#75d4f0] text-white"
                      : "bg-[#127795] border-gray-300 hover:bg-[#a2e7fc] text-white"
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
          </section>

          {/* Profesión */}
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profesión
            </label>
            <select
              value={profession?.name || ""}
              onChange={(e) => {
                const selectedName = e.target.value;
                const selected =
                  professionItems.find((p) => p.name === selectedName) || null;
                setProfession(selected);
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sin profesión</option>
              {professionItems.map((prof) => (
                <option key={prof.id} value={prof.name}>
                  {prof.label}
                </option>
              ))}
            </select>
          </section>

          {/* Tono de piel */}
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tono de piel
            </label>
            <div className="flex gap-4">
              {[
                { tone: "white", color: "#f9dcc4" },
                { tone: "brown", color: "#c58c5c" },
                { tone: "afro", color: "#5c3b28" },
              ].map(({ tone, color }) => (
                <button
                  key={tone}
                  onClick={() => setSkinTone(tone)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    skinTone === tone
                      ? "border-blue-500 scale-110"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </section>

          {/* Color de cabello */}
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Color de cabello
            </label>
            <div className="flex gap-4">
              {availableHairColors.map((color) => (
                <label key={color}>
                  <input
                    type="radio"
                    name="hairColor"
                    value={color}
                    checked={hairColor === color}
                    onChange={() => setHairColor(color)}
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
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Reiniciar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
