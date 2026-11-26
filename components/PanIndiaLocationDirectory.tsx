import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, ChevronRight, Sparkles, ExternalLink, Image as ImageIcon, X } from 'lucide-react';
import { STATE_LOCATION_GROUPS } from '../data/indiaLocations';

interface PanIndiaLocationDirectoryProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const PanIndiaLocationDirectory: React.FC<PanIndiaLocationDirectoryProps> = ({
  className = '',
  title = 'Pan-India & Global Learning Centers — Offline & Live Online',
  subtitle = 'Find Japanese language coaching, native sensei batches, and JLPT exam preparation tailored for your city or district.'
}) => {
  const [selectedPoster, setSelectedPoster] = useState<{ title: string; image: string } | null>(null);

  return (
    <section 
      className={`py-16 text-white rounded-3xl my-12 border border-slate-800 relative overflow-hidden shadow-2xl ${className}`} 
      id="all-locations-directory"
    >
      {/* Background with mix poster imagery & subtle overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px] scale-105 transition-transform duration-700 pointer-events-none"
        style={{ backgroundImage: `url('/images/locations/all-states-hubs.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/98 backdrop-blur-xs pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-3 border border-red-500/30 shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>Pan-India &bull; Japan Academic Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
            {subtitle}
          </p>

          {/* Quick Hub Poster Showcase Action */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedPoster({
                title: 'Fuji Japanese Academy — State & Regional Hubs Across India & Japan',
                image: '/images/locations/all-states-hubs.png'
              })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-red-600/30 border border-slate-700 hover:border-red-500/50 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-md group"
            >
              <ImageIcon className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <span>View Pan-India &amp; Japan Master Network Poster</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {STATE_LOCATION_GROUPS.map((group, groupIdx) => (
            <details
              key={groupIdx}
              open={groupIdx === 0}
              className="group bg-slate-950/85 rounded-2xl border border-slate-800/90 hover:border-red-500/40 overflow-hidden transition-all duration-300 shadow-lg open:border-red-500/50"
            >
              <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none hover:bg-slate-900/60 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Thumbnail Poster Preview */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoster({ title: group.stateName, image: group.posterImage });
                    }}
                    title="Click to zoom state hub poster"
                    className="w-12 h-14 rounded-lg overflow-hidden border border-slate-700/80 hover:border-red-500 flex-shrink-0 cursor-zoom-in relative group/thumb shadow-sm bg-slate-900"
                  >
                    <img 
                      src={group.posterImage} 
                      alt={`${group.stateName} Hub`} 
                      className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-transparent transition-colors" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-white block truncate">
                        {group.stateName}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-light block">
                      {group.cities.length} Centers &bull; Live Online &amp; Offline
                    </span>
                    <span className="text-[10px] text-red-400 font-medium block truncate mt-0.5">
                      {group.tagline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <Link
                    to={`/locations/state/${group.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-[11px] font-semibold border border-red-500/30 transition-all"
                    title={`View dedicated ${group.stateName} Hub page`}
                  >
                    <span>Hub Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-90 text-red-400" />
                </div>
              </summary>

              <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/60 bg-slate-950/40">
                <div className="flex items-center justify-between mt-3 mb-2">
                  <span className="text-[11px] text-slate-400 font-medium">Select a regional center or explore hub:</span>
                  <Link
                    to={`/locations/state/${group.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 font-bold hover:underline"
                  >
                    <span>Full {group.stateName} Hub &rarr;</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {group.cities.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/locations/${city.slug}`}
                      className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/50 text-slate-200 hover:text-white transition-all text-xs flex flex-col justify-between group/link shadow-xs"
                    >
                      <div className="font-semibold text-slate-100 group-hover/link:text-red-300 flex items-center gap-1.5">
                        <span className="truncate">{city.cityName}</span>
                        {city.isPhysicalCampus && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-red-600 text-white rounded font-bold uppercase tracking-wider flex-shrink-0">
                            Campus
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        Support: {city.nativeLanguageSupport}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
          <span>Looking for custom on-premise training in your city or corporate park? </span>
          <Link to="/corporate" className="text-red-400 font-bold hover:underline inline-flex items-center gap-1">
            <span>Request an Enterprise Proposal</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal for Full State / Master Posters */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-white text-sm sm:text-base truncate">
                  {selectedPoster.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 overflow-auto max-h-[calc(90vh-70px)] flex items-center justify-center bg-slate-950">
              <img 
                src={selectedPoster.image} 
                alt={selectedPoster.title} 
                className="max-h-[80vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PanIndiaLocationDirectory;
