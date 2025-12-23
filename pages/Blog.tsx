
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">News & Insights</h1>
          <p className="text-slate-500">Latest updates on Japanese culture, exam tips, and FUJI JAPANESE INSTITUTE news.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4 relative">
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-indigo-900 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                <Calendar className="w-3 h-3" />
                {post.date}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">{post.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center text-red-600 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
          
          {/* Mock extra post to fill grid */}
           <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4 relative bg-gray-100 h-64 flex items-center justify-center">
                 <span className="text-gray-400">More Coming Soon</span>
              </div>
              <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
              <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-full mb-4"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
