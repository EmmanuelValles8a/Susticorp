'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-8">
        {/* Payment Methods */}
        <div className="mt-8 text-center">
          <p className="mb-4">Aceptamos las siguientes formas de pago:</p>
          <div className="flex justify-center space-x-4">
            {["amex", "efectivo", "mastercard", "transferencia", "visa"].map(
              (payment, index) => (
                <div
                  key={index}
                  className="w-16 h-10 flex items-center justify-center bg-white rounded-md"
                >
                  <img
                    src={`https://res.cloudinary.com/dqigc5zir/image/upload/v1733714891/${payment}.png`}
                    alt={payment}
                    className="max-w-full max-h-full"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {' '}
            <Link href="/admin/dashboard" className="text-white hover:underline">
              SUSTICORP. Todos los derechos reservados.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;