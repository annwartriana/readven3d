import { useState } from "react";

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    {
      id: 1,
      name: "Avatar Anime ",
      image: "/img/avatar_pro.png",
      features: [
        "Figura coleccionable de 10 cm con estilo anime",
        "Incluye caja especial para exhibición",
        "Mini maqueta de escenario personalizada",
      ],
    },
    {
      id: 2,
      name: "Avatar de Profesión",
      image: "/images/product2.jpg",
      features: [
        "Figura coleccionable de 10 cm con tu profesión favorita",
        "Caja de exhibición",
        "Maqueta temática de oficina para acompañar la figura",
      ],
    },
    {
      id: 3,
      name: "Figuras de Matrimonio",
      image: "/images/product3.jpg",
      features: [
        "Set de 2 figuras personalizadas para pastel de matrimonio",
        "Portarretrato con ilustración 2D conmemorativa",
        "Cajas coleccionables individuales para cada figura",
      ],
    },
    {
      id: 4,
      name: "Avatar Mascota",
      image: "/images/product4.jpg",
      features: [
        "Figura coleccionable de tu mascota en 8 cm",
        "Incluye caja especial para exhibición",
        "Mini maqueta inspirada en la naturaleza",
        "Portarretrato con ilustración 2D de tu mascota",
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#024b61] to-[#006685] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            COLECCIONES EXCLUSIVAS
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Cada figura viene con su{" "}
            <span className="text-yellow-400 font-semibold">
              caja coleccionable
            </span>{" "}
            y un{" "}
            <span className="text-yellow-400 font-semibold">
              escenario diorama
            </span>{" "}
            para exhibición.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={products[activeProduct].image}
                alt={products[activeProduct].name}
                className="w-full h-full object-cover object-center transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">
                  {products[activeProduct].name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={`relative h-24 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                    activeProduct === index
                      ? "ring-4 ring-yellow-400 transform scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-medium text-yellow-400 mb-3">
                  INCLUYE EN TU COMPRA:
                </h3>
                <ul className="space-y-2">
                  {products[activeProduct].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-medium text-yellow-400 mb-3">
                  COLECCIÓN PREMIUM
                </h3>
                <p className="text-gray-300">
                  Nuestras figuras no son solo juguetes, son piezas de
                  exhibición. Cada una viene con su caja coleccionable de alta
                  calidad y un diorama detallado que transforma tu estante en
                  una galería. El paquete completo está diseñado para
                  coleccionistas exigentes.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-yellow-500 to-[#ff8f20] hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                COMPRAR COLECCIÓN {products[activeProduct].name.split(" ")[0]}
              </button>
              {/* <p className="mt-3 text-center text-gray-400 text-sm">
                Envíos garantizados en 48h. Pago seguro.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
