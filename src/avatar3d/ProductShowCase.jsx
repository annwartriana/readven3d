import { useState } from "react";
import { Star, Zap, Heart, Sparkles, Trophy } from "lucide-react";

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    {
      id: 1,
      name: "Avatar Anime Pro",
      image: "/img/Anime.png",
      category: "Anime",
      badge: "Nuevo",
    },
    {
      id: 2,
      name: "Profesión Épica",
      image: "/img/profesion.png",
      category: "Profesional",
      badge: "Popular",
    },
    {
      id: 3,
      name: "Amor Eterno",
      image: "/img/Matrimonio.png",
      category: "Romance",
      badge: "Edición Limitada",
    },
    {
      id: 4,
      name: "Compañero Fiel",
      image: "/img/boxer.png",
      category: "Mascotas",
      badge: "Fan Favorite",
    },
    {
      id: 5,
      name: "Héroe Gaming",
      image: "/img/marcus.png",
      category: "Videojuegos",
      badge: "Trending",
    },
    {
      id: 6,
      name: "Super Fan",
      image: "/img/superfan.png",
      category: "Películas",
      badge: "Exclusivo",
    },
    {
      id: 7,
      name: "Warcraft",
      image: "/img/warcraft.webp",
      category: "Fantasia",
      badge: "Nuevo",
    },
    {
      id: 8,
      name: "Soporte Celular",
      image: "/img/soporte.jpg",
      category: "Utilidad",
      badge: "Utilidad",
    },
  ];

  // Características generales para todos los productos
  const generalFeatures = [
    "Figura coleccionable de alta calidad (8-10cm)",
    "Incluye marco especial o domo para exhibición",
    "Accesorios decorativos personalizados",
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 via-pink-700 to-blue-800 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Encabezado mejorado */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
            <Zap size={16} />
            COLECCIÓN 2025
            <Zap size={16} />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            GALERÍA <span className="text-yellow-400">POP</span>CULTURE
          </h2>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl lg:text-2xl text-gray-200 mx-auto font-medium">
            Transforma tus{" "}
            <span className="text-cyan-300 font-bold">pasiones</span> en
            <span className="text-yellow-300 font-bold">
              {" "}
              figuras épicas
            </span>{" "}
            para exhibir
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de productos mejorada */}
          <div className="space-y-6">
            {/* Imagen principal con efectos */}
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
                <img
                  src={products[activeProduct].image}
                  alt={products[activeProduct].name}
                  className="w-full h-80 sm:h-96 object-contain object-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Badge en imagen principal */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <Sparkles size={12} />
                    {products[activeProduct].badge}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-cyan-300 text-sm font-semibold mb-1 flex items-center gap-2">
                    <Trophy size={16} />
                    {products[activeProduct].category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {products[activeProduct].name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Miniaturas mejoradas */}
            <div className="grid grid-cols-4 gap-3">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={`relative group min-w-0 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-110 ${
                    activeProduct === index
                      ? "ring-3 ring-yellow-400 ring-offset-2 ring-offset-purple-900 scale-105"
                      : "opacity-90 hover:opacity-100 hover:ring-2 hover:ring-white/50"
                  }`}
                >
                  <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Badge pequeño en miniatura */}
                  <div className="absolute top-1 right-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.badge === "Nuevo"
                          ? "bg-green-400"
                          : product.badge === "Popular"
                          ? "bg-red-400"
                          : product.badge === "Trending"
                          ? "bg-orange-400"
                          : "bg-purple-400"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detalles del producto mejorados */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Características generales */}
              <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 backdrop-blur-sm">
                <h3 className="text-lg font-black text-yellow-400 mb-4 flex items-center gap-2">
                  <Star className="fill-yellow-400" size={20} />
                  ¡TODAS LAS FIGURAS INCLUYEN!
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {generalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descripción mejorada */}
              <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 backdrop-blur-sm">
                <h3 className="text-lg font-black text-cyan-400 mb-3 flex items-center gap-2">
                  <Sparkles size={20} />
                  EXPERIENCIA COLECCIONABLE
                </h3>
                <p className="text-gray-200 text-base leading-relaxed">
                  Cada figura es una pieza única de arte pop. Diseñadas para
                  verdaderos fans, nuestras colecciones transforman tus
                  personajes favoritos y momentos especiales en{" "}
                  <span className="text-yellow-300 font-semibold">
                    tesoros exhibibles
                  </span>
                  . Desde anime hasta tus mascotas, creamos magia en cada
                  detalle.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["100% Personalizable", "Material Duradero"].map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold"
                      >
                        <Heart size={12} />
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Llamada a la acción */}
            <div className="text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <h4 className="text-xl font-black text-purple-900 mb-2">
                ¡CREA TU FIGURA ÉPICA!
              </h4>
              <p className="text-purple-800 font-semibold text-sm">
                Personaliza ahora • Garantía de calidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
