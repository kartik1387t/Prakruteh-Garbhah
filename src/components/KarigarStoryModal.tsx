import React from 'react';
import { X, Play, BadgeCheck, MapPin } from 'lucide-react';
import { ArtisanProduct } from '../types';

interface KarigarStoryModalProps {
  product: ArtisanProduct;
  onClose: () => void;
}

const KarigarStoryModal: React.FC<KarigarStoryModalProps> = ({ product, onClose }) => {
  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-cosmos border border-[#8B4513]/50 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh]">
        
        {/* Left Side - Video/Image Layer */}
        <div className="w-full md:w-1/2 relative bg-black flex items-center justify-center">
           {product.videoUrl ? (
              <div className="w-full h-full min-h-[300px] relative">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    src={product.videoUrl} 
                    title="Behind the Craft" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover"
                 ></iframe>
              </div>
           ) : (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
           )}
           <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              <span className="text-xs text-white font-bold uppercase tracking-widest flex items-center gap-2">
                 <Play size={12} className="text-saffron fill-saffron" /> Behind the Craft
              </span>
           </div>
        </div>

        {/* Right Side - Story & Maker */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 p-2 bg-black/20 rounded-full">
              <X size={24} />
           </button>

           <div className="mb-6">
              <span className="text-saffron text-xs font-bold uppercase tracking-widest mb-2 block">{product.type} • {product.district}</span>
              <h2 className="font-serif text-3xl text-white mb-2">{product.name}</h2>
              {product.giTag && (
                 <span className="inline-block bg-blue-900/40 border border-blue-500/30 text-blue-200 text-[10px] font-bold px-2 py-1 rounded uppercase">
                    GI Tagged • Authentic
                 </span>
              )}
           </div>

           <div className="prose prose-invert mb-8">
              <h3 className="text-white font-serif text-lg mb-2">The Story</h3>
              <p className="text-gray-300 text-sm leading-relaxed italic border-l-2 border-saffron pl-4">
                 "{product.story}"
              </p>
           </div>

           {/* Meet the Maker Card */}
           <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-saffron/30 transition-colors">
              <div className="relative">
                 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-saffron">
                    <img src={product.makerImage || 'https://via.placeholder.com/150'} alt={product.makerName} className="w-full h-full object-cover" />
                 </div>
                 {product.makerVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border-2 border-black" title="Verified Artisan">
                       <BadgeCheck size={14} />
                    </div>
                 )}
              </div>
              <div>
                 <p className="text-[10px] text-gray-500 uppercase font-bold">Handcrafted By</p>
                 <h4 className="text-white text-lg font-serif">{product.makerName}</h4>
                 <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <MapPin size={12} /> {product.district}, Bharat
                 </div>
              </div>
           </div>

           <button className="w-full mt-8 py-3 bg-saffron hover:bg-orange-600 text-black font-bold uppercase tracking-widest text-xs rounded transition-colors shadow-lg shadow-saffron/20">
              Support {product.makerName?.split(' ')[0]} (Buy Direct)
           </button>
           
           <div className="mt-4 text-center">
              <p className="text-[10px] text-gray-500">100% of proceeds go directly to the artisan family.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default KarigarStoryModal;