'use client';
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { motion } from "framer-motion";
import { useState } from 'react';
import ModalCitaCotizacion from "@/app/components/modalcitaocotizacion"; 

export default function Contacto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (formData) => {
    // Lógica para manejar el envío del formulario
    console.log('Formulario enviado:', formData);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Apartado superior */}
      <motion.section
        className="px-6 md:px-16 py-8 text-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="text-center space-y-4" variants={fadeIn}>
          <h2 className="text-xl font-semibold">Contáctanos</h2>
          <p className="text-lg leading-relaxed">
            "Estamos aquí para ayudarte. Puedes encontrarnos en las siguientes plataformas o visitarnos en nuestra ubicación física."
          </p>
        </motion.div>
      </motion.section>

      {/* Facebook Page Embed */}
      <section className="px-6 md:px-16 py-8">
        <div className="text-center mb-6">
          <h3 className="text-xl text-black font-semibold">Encuéntranos en Facebook</h3>
        </div>
        <div className="flex justify-center">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com/susticorpdgo/&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            width="500"
            height="800"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </section>

      {/* Location Map Embed */}
      <section className="px-6 md:px-16 py-8">
        <div className="text-center mb-6">
          <h3 className="text-xl text-black font-semibold">Nuestra Ubicación</h3>
        </div>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.70568185521395!2d-104.62974030056543!3d24.056058073090487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb64bf65ed233%3A0xb1c6fe3a0c0c959b!2sIsla%20Cerralvo%20311%2C%20Privada%20San%20Ignacio%2C%2034204%20Durango%2C%20Dgo.!5e0!3m2!1ses-419!2smx!4v1735790814949!5m2!1ses-419!2smx"
            width="900"
            height="750"
            style={{ border: "0" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Email Section */}
      <section className="px-6 md:px-16 py-8">
        <div className="text-center mb-6">
          <h3 className="text-xl text-black font-semibold">Envíanos un Correo</h3>
          <p className="text-lg text-black">Haz clic en el correo para abrir tu cliente de correo.</p>
        </div>
        <div className="flex justify-center">
          <a
            href="mailto:&#115;&#117;&#115;&#116;&#105;&#99;&#111;&#114;&#112;&#100;&#103;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
            className="text-blue-500 hover:underline text-lg"
          >
            &#115;&#117;&#115;&#116;&#105;&#99;&#111;&#114;&#112;&#100;&#103;&#112;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;
          </a>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="px-6 md:px-16 py-8 bg-grey-50">
        <div className="text-center space-y-4">
          <h3 className="text-xl text-black font-semibold">
            ¿Quieres agendar una cita o una cotización?
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-2 bg-blue-600 text-white text-lg rounded-md shadow hover:bg-blue-700 transition inline-block"
          >
            Haz clic aquí
          </button>
        </div>
      </section>

      {/* Modal con formulario */}
      <ModalCitaCotizacion
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      <Footer />
    </div>
  );
}
