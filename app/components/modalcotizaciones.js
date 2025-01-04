import React, { useState } from 'react';
import { db } from '@/app/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ModalCotizaciones = ({ isOpen, onClose }) => {
  const [telefono, setTelefono] = useState('');
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarCotizaciones = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'cotizaciones'), where('telefono', '==', telefono));
      const querySnapshot = await getDocs(q);
      const cotizacionesEncontradas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCotizaciones(cotizacionesEncontradas);
    } catch (error) {
      console.error('Error al buscar cotizaciones:', error);
    } finally {
      setLoading(false);
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

          <h2 className="text-2xl font-semibold mb-4">Buscar Cotizaciones</h2>

          <div className="mb-4">
            <label htmlFor="telefono" className="block font-medium">
              Número de teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <button
              onClick={buscarCotizaciones}
              className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          <ul>
            {cotizaciones.map((cotizacion) => (
              <li key={cotizacion.id} className="border-b py-2">
                <p>
                  <strong>Estado:</strong> {cotizacion.estado}
                </p>
                <p>{cotizacion.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default ModalCotizaciones;