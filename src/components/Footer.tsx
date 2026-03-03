import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cosmos border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-2xl text-white mb-4">Prakruteh Garbhah</h2>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              "The World in a Single Soul." <br/>
              A digital sanctuary connecting global travelers to the spiritual and physical landscapes of India.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-saffron cursor-pointer transition-colors"></div>
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-saffron cursor-pointer transition-colors"></div>
               <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-saffron cursor-pointer transition-colors"></div>
            </div>
          </div>
          
          <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Digital Pilgrimage</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li className="hover:text-saffron cursor-pointer">Mirror Search</li>
               <li className="hover:text-saffron cursor-pointer">Living Map</li>
               <li className="hover:text-saffron cursor-pointer">Ancient Gyaan</li>
               <li className="hover:text-saffron cursor-pointer">Yatra Dashboard</li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Legal & Trust</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li className="hover:text-saffron cursor-pointer">Privacy Policy (DPDP 2025)</li>
               <li className="hover:text-saffron cursor-pointer">Terms of Service</li>
               <li className="hover:text-saffron cursor-pointer">Affiliate Disclosure</li>
               <li className="hover:text-saffron cursor-pointer">13+ Age Policy</li>
             </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Box */}
        <div className="bg-cosmos-light border border-gray-700 p-4 rounded-lg mb-8">
           <h5 className="text-saffron text-xs font-bold uppercase mb-1">Swadeshi Support (Affiliate Disclosure)</h5>
           <p className="text-gray-500 text-xs italic">
             "To keep the Cosmic Journey of Bharat running, some links on this site are affiliate links. 
             This costs you nothing extra but helps us support local artisans and maintain the platform."
           </p>
        </div>

        {/* Heartfelt Hospitality Message */}
        <div className="text-center mt-10 mb-8 border-t border-gray-800 pt-8">
            <p className="font-serif text-saffron/90 italic text-lg leading-relaxed">
              "Thank you for visiting Prakruteh Garbha.<br/>
              If we missed anything in our hospitality, we are sorry from the heart — on behalf of all Indians."
            </p>
        </div>

        <div className="text-center text-gray-600 text-xs pt-4">
           &copy; {new Date().getFullYear()} Womb of Mother Nature. All rights reserved. Made with Love & Tech in Bharat.
        </div>
      </div>
    </footer>
  );
};

export default Footer;