'use client';
import { motion } from 'framer-motion';
import Header from '@/app/components/header'; // Import the Header component
import Footer from '@/app/components/footer';

export default function Home() {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Sección Landing */}
      <motion.section
        id="inicio"
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dqigc5zir/image/upload/v1733327607/porton.jpg')",
          height: '70vh',
        }}
        initial="hidden"
        animate="visible"
        variants={fadeInScale}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight"
            variants={fadeIn}
          >
            SUSTICORP <br /> Expertos en Sistemas Automáticos
          </motion.h1>
        </div>
      </motion.section>

      {/* Contenido */}
      <motion.section
        className="px-8 py-16 bg-white text-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
        >
          {/* Left Column */}
          <motion.div
            className="bg-slate-200 px-8 py-8 rounded-lg shadow-md"
            variants={fadeIn}
          >
            <h2 className="text-5xl font-bold text-black mb-6">
              Ofrecemos soluciones en{' '}
              <span className="font-extrabold text-black">
                Instalación de portones, cámaras y alarmas de seguridad
              </span>
            </h2>
          </motion.div>
          {/* Right Column */}
          <motion.div variants={fadeIn}>
            <p className="text-lg leading-relaxed">
              En SustiCorp somos un equipo de profesionales con más de 30 años de experiencia en instalación y reparación de portones eléctricos y puertas automáticas.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Realizamos magistralmente instalación de portones, cámaras de seguridad, alarmas de seguridad y mucho más. Nuestra atención es personalizada, brindándole asesoría para encontrar las soluciones que usted desea.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Además de instalación y mantenimiento de portones eléctricos, también realizamos cancelería de aluminio y vidrio en general. Cuente con mayor seguridad y facilidad de acceso a su casa, oficina o edificio al instalar portones eléctricos o puertas automáticas para una mayor comodidad y estética de su fachada.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
}
