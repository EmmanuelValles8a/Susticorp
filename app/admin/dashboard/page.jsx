'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import Navbar from '@/app/components/navbar';
import Link from 'next/link';
import withAuth from '@/app/hoc/withAuth';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counts, setCounts] = useState({ citas: 0, cotizaciones: 0 });
  const [pendingDates, setPendingDates] = useState([]); // Array to hold pending dates

  useEffect(() => {
    const fetchCountsAndDates = async () => {
      try {
        const serviciosRef = collection(db, 'servicios');
        const serviciosSnapshot = await getDocs(serviciosRef);

        let citasCount = 0;
        let cotizacionesCount = 0;
        const dates = [];

        for (const servicioDoc of serviciosSnapshot.docs) {
          const citasRef = collection(servicioDoc.ref, 'citas');
          const cotizacionesRef = collection(servicioDoc.ref, 'cotizaciones');

          const citasQuery = query(citasRef, where('estado', '==', 'Pendiente'));
          const cotizacionesQuery = query(cotizacionesRef, where('estado', '==', 'Pendiente'));

          const citasSnapshot = await getDocs(citasQuery);
          const cotizacionesSnapshot = await getDocs(cotizacionesQuery);

          citasCount += citasSnapshot.size;
          cotizacionesCount += cotizacionesSnapshot.size;

          // Collect pending dates from both citas and cotizaciones
          citasSnapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.fecha) dates.push(new Date(data.fecha));
          });
          cotizacionesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.fecha) dates.push(new Date(data.fecha));
          });
        }

        setCounts({ citas: citasCount, cotizaciones: cotizacionesCount });
        setPendingDates(dates);
      } catch (error) {
        console.error('Error fetching counts and dates:', error);
      }
    };

    fetchCountsAndDates();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isPending = pendingDates.some(pendingDate => 
        date.toDateString() === pendingDate.toDateString()
      );
      return isPending ? 'bg-teal-300 text-teal-900' : null;
    }
    return null;
  };

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
            <h2 className="text-xl font-bold text-gray-800 mb-4">Calendario de pendientes</h2>
            <Calendar
              tileClassName={tileClassName} // Highlight pending dates
              className="gap-6 p-6 react-calendar text-black p-2 rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
