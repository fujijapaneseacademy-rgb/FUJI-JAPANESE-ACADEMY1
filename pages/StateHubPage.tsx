import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, CheckCircle2, Building2, HelpCircle, ChevronRight,
  BookOpen, GraduationCap, ArrowRight, Briefcase, Award, ShieldCheck,
  Sparkles, Phone, Laptop, Users, ExternalLink, ZoomIn, X
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { STATE_LOCATION_GROUPS, StateLocationGroup } from '../data/indiaLocations';
import PanIndiaLocationDirectory from '../components/PanIndiaLocationDirectory';

interface StateHubPageProps {
  onOpenEnrollment?: (courseName?: string) => void;
}

export const StateHubPage: React.FC<StateHubPageProps> = ({ onOpenEnrollment }) => {
  const { stateSlug } = useParams<{ stateSlug?: string }>();
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const normalizedSlug = (stateSlug || 'karnataka').toLowerCase();

  // Find matching state group or fallback to Karnataka
  const currentGroup: StateLocationGroup = STATE_LOCATION_GROUPS.find(
    g => g.slug.toLowerCase() === normalizedSlug
  ) || STATE_LOCATION_GROUPS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [normalizedSlug]);

  const pageTitle = `${currentGroup.stateName} Japanese Language Hub & Learning Centers | Fuji Japanese Academy`;
  const metaDescription = `Explore Fuji Japanese Academy state hub for ${currentGroup.stateName}. Native Japanese senseis, offline campus & live online interactive batches across ${currentGroup.cities.map(c => c.cityName).join(', ')}.`;
  const canonicalUrl = `https://fujijapaneseacademy.com/locations/state/${currentGroup.slug}`;

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`Japanese classes in ${currentGroup.stateName}, JLPT coaching ${currentGroup.cities.map(c => c.cityName).join(', ')}, Japanese language courses, Tokyo jobs`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`https://fujijapaneseacademy.com${currentGroup.posterImage}`} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <Breadcrumbs
          items={[
            { label: 'Locations & Network', path: '/locations' },
            { label: currentGroup.stateName }
          ]}
        />
      </div>

      {/* Hero Section with State Poster Showcase */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-fuji-indigo text-white py-12 md:py-16 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Details & Centers */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/25 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>State &amp; Regional Hub</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                  {currentGroup.stateName}
                </h1>
                <p className="text-lg md:text-xl font-medium text-red-400 mt-2">
                  {currentGroup.tagline}
                </p>
              </div>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {currentGroup.description}
              </p>

              {/* Cultural & Landmark Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 font-semibold mr-1">Key Landmarks &amp; Hubs:</span>
                {currentGroup.landmarks.map((l, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-medium shadow-xs"
                  >
                    {l}
                  </span>
                ))}
              </div>

              {/* Core Value Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <div className="text-xl md:text-2xl font-black text-white">{currentGroup.cities.length}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Regional Centers</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <div className="text-xl md:text-2xl font-black text-red-400">98.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium">JLPT Pass Rate</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <div className="text-xl md:text-2xl font-black text-white">10-12</div>
                  <div className="text-[11px] text-slate-400 font-medium">Small Batch Size</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <div className="text-xl md:text-2xl font-black text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Tokyo Visa Prep</div>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/enquire"
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free Demo in {currentGroup.stateName.split(' ')[0]}</span>
                </Link>
                <a
                  href="#regional-centers"
                  className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all"
                >
                  View All {currentGroup.cities.length} Centers &darr;
                </a>
              </div>
            </div>

            {/* Right Column: High-Res State Poster Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div 
                onClick={() => setIsZoomOpen(true)}
                className="relative group cursor-zoom-in rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-2xl bg-slate-900 max-w-sm sm:max-w-md w-full"
              >
                <img
                  src={currentGroup.posterImage}
                  alt={`${currentGroup.stateName} Hub Poster`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to view full poster</span>
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 italic">
                Official Fuji Japanese Academy {currentGroup.stateName} Hub Art
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Regional Centers Grid Section */}
      <section id="regional-centers" className="py-16 container mx-auto px-4 md:px-6 scroll-mt-20">
        <div className="max-w-3xl mb-10">
          <span className="text-red-600 font-bold tracking-widest uppercase text-xs">
            City &amp; District Centers
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-1">
            Learning Centers Across {currentGroup.stateName}
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Choose your nearest physical campus or live interactive online batch with mother-tongue language bridging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentGroup.cities.map((city) => (
            <div
              key={city.slug}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {city.cityName}
                    </h3>
                    <span className="text-xs text-slate-500">{city.state}, {city.country}</span>
                  </div>
                  {city.isPhysicalCampus ? (
                    <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-extrabold uppercase rounded-full shadow-xs">
                      Campus Hub
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold uppercase rounded-full">
                      Live Online
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {city.localContext}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">Native Support:</span>
                    <span>{city.nativeLanguageSupport}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">Mode:</span>
                    <span>{city.deliveryMode}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {city.popularPrograms.slice(0, 3).map((prog, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/locations/${city.slug}`}
                  className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Explore {city.cityName} Center</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/enquire"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                >
                  Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Switch to Other State Hubs Navigation */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-slate-900">Explore Other State &amp; Regional Hubs</h3>
            <p className="text-xs text-slate-600 mt-1">Discover Fuji Japanese Academy centers across India and Japan.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {STATE_LOCATION_GROUPS.map((g) => (
              <Link
                key={g.slug}
                to={`/locations/state/${g.slug}`}
                className={`p-3 rounded-xl border text-center transition-all ${
                  g.slug === currentGroup.slug
                    ? 'bg-red-600 text-white border-red-600 shadow-md font-bold'
                    : 'bg-white text-slate-700 hover:text-red-600 hover:border-red-400 border-slate-200 shadow-xs'
                }`}
              >
                <span className="text-xs font-semibold block truncate">{g.stateName.split(' ')[0]}</span>
                <span className={`text-[10px] block mt-0.5 ${g.slug === currentGroup.slug ? 'text-red-100' : 'text-slate-400'}`}>
                  {g.cities.length} Centers
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Poster Zoom */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-900 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-bold text-white text-sm sm:text-base">
                {currentGroup.stateName} Hub Art
              </h3>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 overflow-auto flex items-center justify-center">
              <img
                src={currentGroup.posterImage}
                alt={currentGroup.stateName}
                className="max-h-[82vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateHubPage;
