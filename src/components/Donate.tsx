import { useState } from 'react';

export default function Donate() {
  const [showQR, setShowQR] = useState(false);

  return (

    <section id="donate" className="py-16 md:py-24 lg:py-28 bg-gradient-to-br from-brand-600 to-brand-500 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Support Our Cause
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Support Children's Education</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Your contribution helps us provide books, scholarships, and educational resources to children in need.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                80G Tax Exemption Available
              </div>
              <p className="text-white/90 text-sm">Donations exempted under Sec 80G of the IT Act 1961</p>
              <p className="text-white/60 text-xs mt-1">PAN: AACTA4113E</p>
            </div>

            {!showQR ? (
              <button
                onClick={() => setShowQR(true)}
                className="w-full bg-white text-brand-600 hover:bg-gray-100 px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Show UPI QR Code
              </button>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4 text-center">Scan to Donate</h3>
                <div className="bg-white rounded-2xl p-4 mb-4">
                  <img src="/qe_advesa_trust.jpeg" alt="QR Code" className="w-full h-auto rounded-xl" />
                </div>
                <p className="text-white/70 text-xs text-center mb-4">
                  Scan with any UPI app (Google Pay, PhonePe, Paytm)
                </p>
                <button onClick={() => setShowQR(false)} className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition border border-white/10">
                  Hide QR Code
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h4 className="font-bold mb-2">📍 Visit Us</h4>
            <p className="text-white/70 text-sm">Flat 5, Block 2, Third Floor, Pace Prana Apartment, Padikuppam Road, Chennai 600040</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h4 className="font-bold mb-2">📞 Contact Us</h4>
            <div className="text-white/70 text-sm space-y-1">
              <p>advesatrust@hotmail.com</p>
              <p>+91 9962258091 | +91 9176228387</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}