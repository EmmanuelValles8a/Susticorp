import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Swal from "sweetalert2";

export default function ModalCitas({ isOpen, onClose, docId }) {
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && docId) {
      fetchCitas();
    }
  }, [isOpen, docId]);

  const fetchCitas = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "servicios", docId, "citas"));
      const querySnapshot = await getDocs(q);
      setCitas(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error al cargar citas:", error);
      Swal.fire("Error", "No se pudieron cargar las citas.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelarCita = async (id) => {
    try {
      await deleteDoc(doc(db, "servicios", docId, "citas", id));
      Swal.fire("Éxito", "Cita cancelada correctamente.", "success");
      setCitas((prev) => prev.filter((cita) => cita.id !== id));
    } catch (error) {
      console.error("Error cancelando cita:", error);
      Swal.fire("Error", "No se pudo cancelar la cita.", "error");
    }
  };

  const reagendarCita = async (id, nuevaFecha, nuevaHora) => {
    try {
      const citaRef = doc(db, "servicios", docId, "citas", id);
      await updateDoc(citaRef, { fecha: nuevaFecha, hora: nuevaHora });
      Swal.fire("Éxito", "Cita reagendada correctamente.", "success");
      fetchCitas();
    } catch (error) {
      console.error("Error reagendando cita:", error);
      Swal.fire("Error", "No se pudo reagendar la cita.", "error");
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
          <h2 className="text-2xl font-semibold mb-4">Citas</h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <ul>
              {citas.map((cita) => (
                <li key={cita.id} className="border-b py-2">
                  <p>
                    <strong>Fecha:</strong> {cita.fecha} - <strong>Hora:</strong> {cita.hora}
                  </p>
                  <p>{cita.descripcion}</p>
                  <button
                    onClick={() => cancelarCita(cita.id)}
                    className="text-red-500 underline"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() =>
                      reagendarCita(cita.id, "2025-01-10", "14:00") // Cambiar valores según la lógica de tu app
                    }
                    className="text-blue-500 underline ml-4"
                  >
                    Reagendar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  );
}
