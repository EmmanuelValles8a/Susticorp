import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Swal from "sweetalert2";
import ModalCitas from "@/app/components/modalcitas";
import ModalCotizaciones from "@/app/components/modalcotizaciones";

export default function ModalCitaCotizacion({ isOpen, onClose, docId }) {
  const [formData, setFormData] = useState({
    clienteNombre: "",
    correo: "",
    telefono: "",
    descripcion: "",
    direccion: "",
    fecha: "",
    hora: "",
    servicio: "cita",
  });
  const [availableHours, setAvailableHours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isCotizacionesModalOpen, setIsCotizacionesModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.fecha && formData.servicio === "cita") {
      fetchAvailableHours(formData.fecha);
    }
  }, [formData.fecha]);

  const resetForm = () => {
    setFormData({
      clienteNombre: "",
      correo: "",
      telefono: "",
      descripcion: "",
      direccion: "",
      fecha: "",
      hora: "",
      servicio: "cita",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchAvailableHours = async (selectedDate) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "servicios", docId, "citas"),
        where("fecha", "==", selectedDate)
      );
      const querySnapshot = await getDocs(q);
      const occupiedHours = querySnapshot.docs.map((doc) => doc.data().hora);

      const hours = [];
      const startOfDay = new Date(`${selectedDate}T08:00:00`);
      const endOfDay = new Date(`${selectedDate}T18:00:00`);
      for (
        let time = startOfDay;
        time <= endOfDay;
        time.setMinutes(time.getMinutes() + 30)
      ) {
        const formattedTime = new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        if (!occupiedHours.includes(formattedTime)) {
          hours.push(formattedTime);
        }
      }

      setAvailableHours(hours);
    } catch (error) {
      console.error("Error al obtener las horas disponibles:", error);
      Swal.fire("Error", "Hubo un problema al cargar las horas disponibles.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!docId) {
      Swal.fire("Error", "ID del documento no está definido.", "error");
      return;
    }

    try {
      const subcollection = formData.servicio === "cita" ? "citas" : "cotizaciones";
      const dataToSave = {
        clienteNombre: formData.clienteNombre,
        correo: formData.correo,
        telefono: formData.telefono,
        descripcion: formData.descripcion,
        ...(formData.servicio === "cita" && {
          direccion: formData.direccion,
          fecha: formData.fecha,
          hora: formData.hora,
        }),
        estado: "Pendiente",
        fechaSolicitud: serverTimestamp(),
      };

      await addDoc(collection(db, "servicios", docId, subcollection), dataToSave);
      Swal.fire("Éxito", "Solicitud enviada correctamente.", "success");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire("Error", "No se pudo completar la solicitud.", "error");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ×
          </button>

          <h2 className="text-2xl text-black font-semibold mb-4">Agendar Cita o Cotización</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del cliente
              </label>
              <input
                type="text"
                name="clienteNombre"
                value={formData.clienteNombre}
                onChange={handleFormChange}
                className="w-full mt-1 p-2 text-black border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleFormChange}
                className="w-full mt-1 p-2 border text-black border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleFormChange}
                className="w-full mt-1 p-2 border text-black border-gray-300 rounded"
                required
              />
            </div>

            {formData.servicio === "cita" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border text-black border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border text-black border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Hora</label>
                  <select
                    name="hora"
                    value={formData.hora}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border text-black border-gray-300 rounded"
                    required
                  >
                    <option value="">Selecciona una hora</option>
                    {isLoading ? (
                      <option>Cargando...</option>
                    ) : (
                      availableHours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleFormChange}
                className="w-full mt-1 p-2 border text-black border-gray-300 rounded"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Servicio</label>
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleFormChange}
                className="w-full mt-1 p-2 border text-black border-gray-300 rounded"
                required
              >
                <option value="cita">Cita</option>
                <option value="cotizacion">Cotización</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsCitasModalOpen(true)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            >
              Buscar Citas
            </button>

            <button
              type="button"
              onClick={() => setIsCotizacionesModalOpen(true)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            >
              Buscar Cotizaciones
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Enviar solicitud
            </button>
          </form>
        </div>

        {/* Modales */}
        <ModalCitas
          isOpen={isCitasModalOpen}
          onClose={() => setIsCitasModalOpen(false)}
          docId={docId}
        />
        <ModalCotizaciones
          isOpen={isCotizacionesModalOpen}
          onClose={() => setIsCotizacionesModalOpen(false)}
          telefono={formData.telefono}
          docId={docId}
        />
      </div>
    )
  );
}
