'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import Navbar from '@/app/components/navbar';
import Link from 'next/link';
import withAuth from '@/app/hoc/withAuth';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counts, setCounts] = useState({ citas: 0, cotizaciones: 0 });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const serviciosRef = collection(db, 'servicios');
        const serviciosSnapshot = await getDocs(serviciosRef);

        let citasCount = 0;
        let cotizacionesCount = 0;
        const activities = [];

        for (const servicioDoc of serviciosSnapshot.docs) {
          const citasRef = collection(servicioDoc.ref, 'citas');
          const cotizacionesRef = collection(servicioDoc.ref, 'cotizaciones');

          const citasQuery = query(citasRef, where('estado', '==', 'Pendiente'));
          const cotizacionesQuery = query(cotizacionesRef, where('estado', '==', 'Pendiente'));

          const citasSnapshot = await getDocs(citasQuery);
          const cotizacionesSnapshot = await getDocs(cotizacionesQuery);

          citasCount += citasSnapshot.size;
          cotizacionesCount += cotizacionesSnapshot.size;

          citasSnapshot.docs.forEach(doc => {
            const data = doc.data();
            activities.push({ type: 'Cita', fecha: data.fecha, estado: data.estado });
          });
          cotizacionesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            activities.push({ type: 'Cotización', fecha: data.fecha, estado: data.estado });
          });
        }

        setCounts({ citas: citasCount, cotizaciones: cotizacionesCount });
        setRecentActivities(activities);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-8 lg:hidden">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button onClick={() => setIsMenuOpen(true)} className="text-gray-800">
            <span className="material-icons">menu</span>
          </button>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {[{ label: 'Citas pendientes', value: counts.citas, link: '/admin/citas' }, { label: 'Cotizaciones pendientes', value: counts.cotizaciones, link: '/admin/cotizaciones' }].map(({ label, value, link }) => (
              <Link key={label} href={link}>
                <div className="p-4 rounded-lg shadow-md bg-teal-100 cursor-pointer">
                  <h2 className="text-lg font-semibold text-teal-800">{label}</h2>
                  <p className="text-3xl font-bold text-teal-800">{value}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Actividades Recientes</h2>
            {recentActivities.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Tipo</th>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Fecha</th>
                    <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b text-gray-800">{activity.type}</td>
                      <td className="py-2 px-4 border-b text-gray-800">{activity.fecha || 'N/A'}</td>
                      <td className="py-2 px-4 border-b text-gray-800">{activity.estado || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No hay actividades recientes para mostrar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
