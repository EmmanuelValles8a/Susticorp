import React, { useState } from 'react';
import { db } from '@/app/firebase/config';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const ModalCitas = ({ isOpen, onClose, docId }) => {
  const [telefono, setTelefono] = useState('');
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reagendarCitaId, setReagendarCitaId] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');

  const buscarCitas = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'servicios', docId, 'citas'), where('telefono', '==', telefono));
      const querySnapshot = await getDocs(q);
      setCitas(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error al buscar citas:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelarCita = async (id) => {
    try {
      const citaRef = doc(db, 'servicios', docId, 'citas', id);
      await updateDoc(citaRef, { estado: 'Cancelado' });
      Swal.fire('Éxito', 'Cita cancelada correctamente.', 'success');
      setCitas((prev) => prev.filter((cita) => cita.id !== id));
    } catch (error) {
      console.error('Error cancelando cita:', error);
      Swal.fire('Error', 'No se pudo cancelar la cita.', 'error');
    }
  };

  const reagendarCita = async () => {
    try {
      const citaRef = doc(db, 'servicios', docId, 'citas', reagendarCitaId);
      await updateDoc(citaRef, { fecha: nuevaFecha, hora: nuevaHora });
      Swal.fire('Éxito', 'Cita reagendada correctamente.', 'success');
      setReagendarCitaId(null);
      buscarCitas();
    } catch (error) {
      console.error('Error reagendando cita:', error);
      Swal.fire('Error', 'No se pudo reagendar la cita.', 'error');
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
          <h2 className="text-2xl text-black font-semibold mb-4">Buscar Citas</h2>

          {!reagendarCitaId ? (
            <>
              <div>
                <label htmlFor="telefono" className='text-black'>Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full text-black px-3 py-2 border rounded"
                />
                <button
                  onClick={buscarCitas}
                  className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>

              <ul className="mt-4">
                {citas.map((cita) => (
                  <li key={cita.id} className="border-b py-2">
                    <p className='text-black'>
                      <strong>Fecha:</strong> {cita.fecha} - <strong>Hora:</strong> {cita.hora}
                    </p>
                    <p className='text-black'>{cita.descripcion}</p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => cancelarCita(cita.id)}
                        className="text-red-500 underline"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => setReagendarCitaId(cita.id)}
                        className="text-blue-500 underline"
                      >
                        Reagendar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Reagendar Cita</h3>
              <label htmlFor="nuevaFecha">Nueva Fecha</label>
              <input
                type="date"
                id="nuevaFecha"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <label htmlFor="nuevaHora">Nueva Hora</label>
              <input
                type="time"
                id="nuevaHora"
                value={nuevaHora}
                onChange={(e) => setNuevaHora(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <button
                onClick={reagendarCita}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Confirmar
              </button>
              <button
                onClick={() => setReagendarCitaId(null)}
                className="ml-4 text-gray-500 underline"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ModalCitas;
