'use client';

import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Header = () => {
  const [services, setServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "servicios"));
        const fetchedServices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceId) => {
    router.push(`/servicio/${serviceId}`);
    setIsMenuOpen(false); // Close menu when navigating
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-8 flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="flex items-center space-x-2">
        <img
          src="https://res.cloudinary.com/dqigc5zir/image/upload/v1733178017/nplcp7t5yc0czt7pctwc.png"
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="text-lg font-bold">SUSTICORP</span>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1 items-center justify-center space-x-12">
        <a href="/" className="hover:underline">Inicio</a>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="hover:underline cursor-pointer focus:outline-none"
          >
            Servicios
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 bg-blue-600 text-white shadow-lg py-2 mt-2 rounded-md z-50">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="block px-4 py-2 hover:bg-blue-700 w-full text-left"
                >
                  {service.nombre}
                </button>
              ))}
            </div>
          )}
        </div>
        <a href="/nosotros" className="hover:underline">Nosotros</a>
        <a href="/contacto" className="hover:underline">Contacto</a>
      </nav>


      {/* WhatsApp Link */}
      <a
        href="https://wa.me/+5216182059365"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex text-white hover:text-gray-200 items-center ml-4"
      >
        <img
          src="https://res.cloudinary.com/dqigc5zir/image/upload/v1735683267/whatsapp-icon.png"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </a>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden flex items-center justify-center focus:outline-none"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Full-Screen Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-0 left-0 w-full h-screen bg-blue-600 text-white py-8 px-8 flex flex-col space-y-6 z-50">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
          >
            ✕
          </button>
          <a
            href="/"
            className="block w-full text-xl hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </a>
          <div className="relative w-full">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="block w-full text-left text-xl hover:underline focus:outline-none"
            >
              Servicios
            </button>
            {isDropdownOpen && (
              <div className="bg-blue-700 text-white shadow-lg py-4 px-4 mt-4 rounded-md">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className="block px-4 py-2 hover:bg-blue-800 w-full text-left text-lg"
                  >
                    {service.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            href="/nosotros"
            className="block w-full text-xl hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Nosotros
          </a>
          <a
            href="/contacto"
            className="block w-full text-xl hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </a>
          <a
            href="https://wa.me/+5216182059365"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-xl hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
