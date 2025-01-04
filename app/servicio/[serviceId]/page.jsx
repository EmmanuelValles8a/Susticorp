'use client';
import React, { useState, useEffect } from 'react';
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ModalCitaCotizacion from "@/app/components/modalcitaocotizacion"; // Importa el modal
import { db } from "@/app/firebase/config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServicePage = ({ params }) => {
  const { serviceId } = React.use(params);

  const [serviceData, setServiceData] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const fetchData = async () => {
      const serviceRef = doc(db, "servicios", serviceId);
      const serviceSnap = await getDoc(serviceRef);

      let imagesArray = [];

      if (serviceSnap.exists()) {
        const serviceData = serviceSnap.data();
        const imagesCollectionRef = collection(db, "servicios", serviceId, "imagenes");
        const imagesSnap = await getDocs(imagesCollectionRef);
        imagesArray = imagesSnap.docs.map((doc) => doc.data().url || "");

        setServiceData(serviceData);
        setImages(imagesArray);
      }
      setLoading(false);
    };

    fetchData();
  }, [serviceId]);

  if (loading) return <p>Loading...</p>;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Title Section */}
      <motion.div className="text-center py-6 bg-gray-100 text-black mb-12 space-y-4" initial="hidden" animate="visible" variants={fadeIn}>
        <h1 className="text-3xl font-extrabold">{serviceData.nombre}</h1>
      </motion.div>

      {/* Carousel Section */}
      {images.length > 0 && (
        <div className="bg-gray-100 justify-center items-center relative">
          <Slider {...carouselSettings} className="relative">
            {images.map((url, index) => (
              <div key={index} className="bg-gray-100 relative w-full h-96 flex justify-center items-center">
                <Image
                  src={url}
                  alt={`Carousel Image ${index + 1}`}
                  width={1920}
                  height={1000}
                  className="object-cover max-w-full justify-center items-center max-h-full rounded-lg shadow-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Description Section */}
      <motion.div className="text-center py-6 text-black bg-gray-100 mt-12" initial="hidden" animate="visible" variants={fadeIn}>
        <p className="text-lg leading-relaxed">{serviceData.descripcion}</p>
      </motion.div>

      {/* Rango de precios */}
      <motion.div className="text-center text-black bg-gray-100 mt-12" initial="hidden" animate="visible" variants={fadeIn}>
        <h2 className="text-2xl font-bold">Rango de precios</h2>
        <p className="text-lg font-medium">{serviceData.rangoPrecios}</p>
      </motion.div>
      {/* Botón para abrir el modal */}
      <motion.div className="text-center mt-8 mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-600 transition"
        >
          Solicitar Cita o Cotización
        </button>
      </motion.div>

      {/* Modal */}
      <ModalCitaCotizacion
        isOpen={isModalOpen}
        docId={serviceId}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(formData) => {
          console.log("Datos enviados:", formData);
          setIsModalOpen(false);
        }}
      />
      {/* Galería de trabajos */}
      <motion.main
        className="flex-grow bg-gray-50 px-6 md:px-16 py-12 text-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {images.length > 0 && (
          <motion.div
            className="space-y-8"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-center">Galería de trabajos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((url, index) => (
                url && (
                  <motion.div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-lg"
                    variants={fadeIn}
                  >
                    <Image
                      src={url}
                      alt={`Image ${index + 1}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </motion.main>

      <Footer />
    </div>
  );
};

export default ServicePage;
