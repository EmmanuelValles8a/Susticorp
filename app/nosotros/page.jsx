'use client';
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { motion } from "framer-motion";

export default function Nosotros() {
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
          <h2 className="text-xl font-semibold">Susticorp sistemas automáticos</h2>
          <p className="text-lg leading-relaxed">
            “Somos una empresa líder en tecnología con el fin de satisfacer las necesidades de nuestros clientes”
          </p>
        </motion.div>
      </motion.section>

      {/* Imagen intermedia */}
      <section className="px-6 md:px-16 py-8 text-center">
        <img
          src="https://res.cloudinary.com/dqigc5zir/image/upload/v1735773891/edkiy8oq8ubfivk9kj9n.jpg"
          alt="Imagen de la empresa"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Misión, Visión, y Políticas */}
      <motion.section
        className="px-6 md:px-16 py-12 text-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center"
          variants={fadeIn}
        >
          {/* Misión */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            variants={fadeIn}
          >
            <img
              src="https://res.cloudinary.com/dqigc5zir/image/upload/v1735773172/mision.png" 
              alt="Misión Icon"
              className="w-16 h-16"
            />
            <h2 className="text-2xl font-bold">Misión</h2>
            <p className="text-lg leading-relaxed">
              Proveer a nuestros clientes productos y servicios de alta calidad en seguridad y automatización, 
              adaptados a sus necesidades específicas. Nos comprometemos a brindar soluciones funcionales y accesibles, 
              que contribuyen a mejorar la seguridad y comodidad en hogares y negocios.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            variants={fadeIn}
          >
            <img
              src="https://res.cloudinary.com/dqigc5zir/image/upload/v1735773172/vision.png"
              alt="Visión Icon"
              className="w-16 h-16"
            />
            <h2 className="text-2xl font-bold">Visión</h2>
            <p className="text-lg leading-relaxed">
              Ser reconocidos como líderes en soluciones innovadoras de seguridad y automatización, 
              ofreciendo tecnología avanzada y un servicio excepcional que inspira confianza y 
              garantiza la tranquilidad de nuestros clientes.
            </p>
          </motion.div>

          {/* Políticas */}
          <motion.div
            className="flex flex-col items-center space-y-4"
            variants={fadeIn}
          >
            <img
              src="https://res.cloudinary.com/dqigc5zir/image/upload/v1735773172/politicas.png" 
              alt="Valores Icon"
              className="w-16 h-16"
            />
            <h2 className="text-2xl font-bold">Políticas</h2>
            <ul className="list-disc list-inside text-lg space-y-2 text-left">
              <li>Calidad del Servicio: Garantizar que todos los productos y servicios cumplan con estándares altos de calidad, priorizando la satisfacción del cliente.</li>
              <li>Seguridad y Confianza: Asegurar que los sistemas de automatización y seguridad sean confiables, con tecnología actualizada y certificaciones pertinentes.</li>
              <li>Atención al Cliente: Proveer soporte técnico y asesoramiento oportuno antes, durante y después de la contratación del servicio.</li>
              <li>Sostenibilidad: Promover el uso responsable de recursos y prácticas que reduzcan el impacto ambiental.</li>
              <li>Ética Laboral: Mantener un ambiente de trabajo inclusivo y profesional, cumpliendo con las normativas legales aplicables.</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
}
