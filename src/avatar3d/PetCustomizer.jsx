import { useState } from "react";
import { ChevronLeft, ChevronRight, Package, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dogBreeds = [
  {
    name: "Akita",
    image: "/3d/pets/dogs/akita.png",
    funFact:
      "En Japón, el Akita es símbolo de buena salud y larga vida; tradicionalmente se regalan figuras de Akita como amuletos de recuperación.",
    personalityMeaning:
      "Tienes un carácter fuerte y reservado, pero detrás hay una lealtad inquebrantable. Prefieres pocos vínculos, pero verdaderos, y te entregas por completo a quienes ganan tu confianza.",
  },
  {
    name: "Beagle",
    image: "/3d/pets/dogs/beagle.png",
    funFact:
      "El Beagle posee uno de los mejores sentidos del olfato en el mundo canino, solo superado por el Bloodhound.",
    personalityMeaning:
      "Eres alegre, curioso y adaptable. Disfrutas explorando y compartiendo experiencias, y tienes una facilidad natural para hacer amigos. Tu entusiasmo por la vida es contagioso.",
  },
  {
    name: "Boxer",
    image: "/3d/pets/dogs/boxer.png",
    funFact:
      "El Boxer debe su nombre a su tendencia a “boxear” con las patas delanteras durante el juego.",
    personalityMeaning:
      "Tu energía y carisma son inconfundibles. Sabes cuándo divertirte y cuándo ponerte serio, y combinas fuerza con un gran sentido del humor. Eres apasionado y protector con quienes amas.",
  },
  {
    name: "Bulldog",
    image: "/3d/pets/dogs/bulldog.png",
    funFact:
      "Originalmente criado para el “bull-baiting”, hoy es famoso por su carácter afectuoso y tranquilo.",
    personalityMeaning:
      "Eres paciente, constante y confiable. Prefieres la calma a la prisa y transmites seguridad a quienes te rodean. Aunque tranquilo, no retrocedes ante un desafío.",
  },

  {
    name: "Chihuahua",
    image: "/3d/pets/dogs/chihuahua.png",
    funFact:
      "El Chihuahua es la raza de perro más pequeña del mundo, pero su actitud es tan grande como la de perros mucho mayores.",
    personalityMeaning:
      "Tienes seguridad en ti mismo y un carácter más grande que tu tamaño. Eres audaz, protector y selectivo con las personas, pero profundamente leal con tu círculo cercano.",
  },

  {
    name: "Perro Criollo",
    image: "/3d/pets/dogs/criollo.png",
    funFact:
      "El término 'perro criollo' se usa en muchos países latinoamericanos para referirse a perros mestizos. Son el resultado de generaciones de mezcla genética, lo que suele darles gran resistencia, salud y personalidad única.",
    personalityMeaning:
      "Eres empático, solidario y valoras lo auténtico. No buscas perfección de catálogo, sino vínculos reales y profundos. Crees en las segundas oportunidades y en que el amor no se mide por la raza ni el pedigrí. Tu perro refleja tu capacidad de ver belleza donde otros solo ven lo común.",
  },

  {
    name: "Golden Retriever",
    image: "/3d/pets/dogs/golden.png",
    funFact:
      "Criado en Escocia en el siglo XIX para recuperar presas de caza acuáticas, el Golden Retriever es una de las razas más recomendadas como perro de terapia por su paciencia y sensibilidad.",
    personalityMeaning:
      "Tu corazón es generoso, tu optimismo contagioso y tu capacidad de dar amor es inagotable. Buscas relaciones sinceras, disfrutas de la compañía y siempre encuentras razones para sonreír. Eres de los que transmiten confianza y calidez desde el primer momento.",
  },
  {
    name: "Husky Siberiano",
    image: "/3d/pets/dogs/husky.png",
    funFact:
      "Originarios de Siberia, los Huskies podían recorrer más de 150 km en un solo día tirando trineos bajo condiciones extremas.",
    personalityMeaning:
      "Tienes un espíritu libre, intenso y aventurero. No te conformas con lo rutinario y siempre buscas nuevos caminos. Eres magnético y leal, aunque a veces impredecible, y tu energía te impulsa a estar siempre en movimiento.",
  },
  {
    name: "Pastor Alemán",
    image: "/3d/pets/dogs/pastor_aleman.png",
    funFact:
      "Utilizado en Alemania a finales del siglo XIX, el Pastor Alemán es una de las razas más utilizadas en rescates, detección y asistencia por su inteligencia y versatilidad.",
    personalityMeaning:
      "Eres firme, leal y protector. Tienes una gran capacidad para mantener la calma bajo presión y tomas el liderazgo con naturalidad. Inspiras confianza y nunca abandonas a quienes dependen de ti.",
  },

  {
    name: "Pug",
    image: "/3d/pets/dogs/pug.png",
    funFact:
      "En los Países Bajos, un Pug salvó la vida de un príncipe de la Casa de Orange, y desde entonces la raza es símbolo de la familia real.",
    personalityMeaning:
      "Eres alegre, encantador y amistoso. Encuentras felicidad en las pequeñas cosas y tienes la capacidad de iluminar el día de quienes te rodean.",
  },

  {
    name: "Rottweiler",
    image: "/3d/pets/dogs/rottweiler.png",
    funFact:
      "El Rottweiler desciende de los antiguos perros de ganado romanos y fue utilizado durante siglos para arrear reses y proteger propiedades.",
    personalityMeaning:
      "Eres fuerte, decidido y confiable. Inspiras respeto y seguridad a tu alrededor, y tu lealtad hacia quienes amas es inquebrantable. No temes asumir responsabilidades y siempre estás dispuesto a proteger lo que consideras tuyo.",
  },
  {
    name: "Schnauzer",
    image: "/3d/pets/dogs/schnauzer.png",
    funFact:
      "Originario de Alemania, el Schnauzer fue criado como perro guardián y cazador de roedores, famoso por su distintiva barba y cejas pobladas.",
    personalityMeaning:
      "Eres inteligente, enérgico y observador. Te gusta mantener las cosas bajo control y eres muy fiel a tus valores. Tu curiosidad te impulsa a explorar, pero siempre con un sentido claro de propósito.",
  },
  {
    name: "Shih Tzu",
    image: "/3d/pets/dogs/shih_tzu.png",
    funFact:
      "El Shih Tzu fue un perro de compañía favorito de la nobleza china, considerado un símbolo de estatus y buena fortuna.",
    personalityMeaning:
      "Eres cariñoso, amable y amante de la comodidad. Disfrutas de los momentos tranquilos y del afecto sincero. Tienes un encanto natural que hace que la gente se sienta bien contigo.",
  },
  {
    name: "Yorkshire Terrier",
    image: "/3d/pets/dogs/yorkshire_terrier.png",
    funFact:
      "El Yorkshire Terrier fue criado en Inglaterra en el siglo XIX para cazar ratas en fábricas y minas, pero rápidamente ganó popularidad como perro de compañía.",
    personalityMeaning:
      "Eres valiente, elegante y decidido. Aunque tu tamaño pueda engañar, tienes una gran personalidad y un espíritu indomable. No temes destacar y siempre defiendes lo que crees.",
  },
];

const catBreeds = [
  {
    name: "Angora",
    image: "/3d/pets/cats/angora.png",
    funFact:
      "El gato Angora Turco es una de las razas más antiguas del mundo y fue muy apreciado en la realeza otomana por su elegancia.",
    personalityMeaning:
      "Eres refinado, curioso y amante de la belleza. Te atrae lo estético y disfrutas de lo delicado, pero también tienes un espíritu independiente que no se conforma con lo común.",
  },
  {
    name: "Himalayo",
    image: "/3d/pets/cats/himalayo.png",
    funFact:
      "El Himalayo es un cruce entre el gato Persa y el Siamés, con el pelaje largo del Persa y el patrón de color característico del Siamés.",
    personalityMeaning:
      "Eres tranquilo, cariñoso y aprecias los espacios de paz. Tienes un corazón dulce y disfrutas de la compañía cercana, aunque siempre conservas tu propio espacio personal.",
  },
  {
    name: "Maine Coon",
    image: "/3d/pets/cats/maine_coon.png",
    funFact:
      "El Maine Coon es una de las razas de gatos más grandes del mundo; algunos machos pueden superar los 10 kg de peso.",
    personalityMeaning:
      "Eres protector, fuerte y con gran presencia. Inspiras confianza y sabes equilibrar tu lado imponente con una ternura que sorprende a quienes te conocen de verdad.",
  },
  {
    name: "Mestizo",
    image: "/3d/pets/cats/mestizo.png",
    funFact:
      "Los gatos mestizos o criollos representan la mayoría de los gatos domésticos en el mundo. Su mezcla genética les da gran diversidad de colores y personalidades únicas.",
    personalityMeaning:
      "Eres auténtico, solidario y aprecias lo diverso. No buscas etiquetas ni apariencias, valoras lo verdadero y crees en dar oportunidades. Ves belleza y carácter en lo único e irrepetible.",
  },
  {
    name: "Persa",
    image: "/3d/pets/cats/persa.png",
    funFact:
      "El gato Persa es famoso por su abundante pelaje y rostro achatado. Fue introducido en Europa desde Persia en el siglo XVII y rápidamente se convirtió en símbolo de lujo.",
    personalityMeaning:
      "Eres elegante, sereno y disfrutas de la comodidad. Te gusta rodearte de cosas bellas y transmitir calma, pero detrás de tu aire sofisticado hay un gran afecto por los tuyos.",
  },
  {
    name: "Siamés",
    image: "/3d/pets/cats/siames.png",
    funFact:
      "El gato Siamés proviene de Tailandia (antiguo Siam) y era considerado un guardián espiritual en los templos.",
    personalityMeaning:
      "Eres comunicativo, expresivo y apasionado. Tienes un carácter fuerte, pero también una gran capacidad para crear lazos intensos y profundos con quienes confías.",
  },
];

const PetCustomizer = () => {
  const [section, setSection] = useState("dogs");
  const [selectedBreed, setSelectedBreed] = useState(dogBreeds[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breeds = section === "dogs" ? dogBreeds : catBreeds;
  const selectedIndex = breeds.findIndex((b) => b.name === selectedBreed?.name);

  const handleNextBreed = () => {
    const nextIndex = (selectedIndex + 1) % breeds.length;
    setSelectedBreed(breeds[nextIndex]);
  };

  const handlePrevBreed = () => {
    const prevIndex = (selectedIndex - 1 + breeds.length) % breeds.length;
    setSelectedBreed(breeds[prevIndex]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      {/* Encabezado principal */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#127795] mb-2">
          Convierte a tu mascota en una figura 3D única
        </h1>
        <p className="text-gray-600 text-xl">
          Elige su raza, mándanos una foto y la pintamos a tu gusto 🎨🐾
        </p>
      </div>

      {/* Botones de selección de tipo */}
      <div className="flex justify-center gap-4">
        {["dogs", "cats"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setSection(type);
              setSelectedBreed(type === "dogs" ? dogBreeds[0] : catBreeds[0]);
            }}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              section === type
                ? "bg-[#006685] text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {type === "dogs" ? "🐶 Perros" : "🐱 Gatos"}
          </button>
        ))}
      </div>

      {/* Selector de raza */}
      <div className="flex flex-wrap justify-center gap-3">
        {breeds.map((breed) => (
          <label
            key={breed.name}
            className={`cursor-pointer border rounded-xl px-4 py-2 transition text-sm font-medium ${
              selectedBreed?.name === breed.name
                ? "bg-[#006685] text-white border-[#024b61]"
                : "bg-white text-gray-700 hover:border-[#1080e7]"
            }`}
          >
            <input
              type="radio"
              name="breed"
              className="hidden"
              onChange={() => setSelectedBreed(breed)}
              checked={selectedBreed?.name === breed.name}
            />
            {breed.name}
          </label>
        ))}
      </div>

      {/* Tarjeta principal */}
      <AnimatePresence mode="wait">
        {selectedBreed && (
          <motion.div
            key={selectedBreed.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-8 bg-[#a2e7fc] rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Columna izquierda - Imagen y mensaje figura */}
              <div className="w-full lg:w-2/5 bg-gradient-to-br from-[#a2e7fc] to-[#024b61] p-8 flex flex-col items-center">
                <div className="relative w-64 h-64 bg-white rounded-2xl shadow-xl overflow-hidden">
                  <motion.img
                    key={selectedBreed.image}
                    src={selectedBreed.image}
                    alt={selectedBreed.name}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <h2 className="text-3xl font-bold text-white mt-6 text-center">
                  {selectedBreed.name}
                </h2>

                {/* Navegador */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={handlePrevBreed}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="bg-white/20 px-4 py-2 rounded-full text-white font-medium">
                    {selectedIndex + 1} / {breeds.length}
                  </div>
                  <button
                    onClick={handleNextBreed}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Mensaje figura */}
                <div className="mt-6 bg-white/20 p-4 rounded-xl w-full">
                  <p className="text-white text-sm font-bold mb-2">
                    🎁 Así será tu figura
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    Impresa en 3D con pintura artesanal para capturar cada
                    detalle de tu mascota. Incluye caja coleccionable y tarjeta
                    exclusiva.
                  </p>
                </div>
              </div>

              {/* Columna derecha - Dato curioso y personalidad */}
              <div className="w-full lg:w-3/5 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Dato curioso */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#36738e] mb-2">
                      🐾 Dato curioso
                    </h3>
                    <p className="text-gray-700 text-xl leading-relaxed">
                      {selectedBreed.funFact}
                    </p>
                  </div>

                  {/* Qué dice esta raza */}
                  <div>
                    <h3 className="text-2xl font-bold  text-[#36738e] mb-2">
                      🌟 Qué dice esta raza de ti
                    </h3>
                    <p className="text-gray-700 text-xl leading-relaxed">
                      {selectedBreed.personalityMeaning}
                    </p>
                  </div>
                </div>

                {/* Botón compra */}
                <div className="mt-6 flex flex-col items-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-[#46abcb] text-white text-xl rounded-full font-bold hover:bg-[#024b61] transition flex items-center gap-2 text-lg shadow-lg"
                  >
                    <Package size={22} />
                    ¡Quiero mi figura!
                  </button>
                  <p className="text-md text-gray-500 mt-2">
                    Llévate a tu compañero siempre contigo 💛
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetCustomizer;
