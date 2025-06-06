// app/gallery/page.tsx
'use client'; // This page uses hooks for the interactive lightbox

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import the Lightbox component and its required CSS
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Optional plugins for the lightbox (e.g., for thumbnails, zoom)
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";


// --- Data for your Gallery ---
// IMPORTANT: Replace this placeholder data with your actual images and video links.
// Place your images in the `public/images/gallery/` folder.
const galleryCategories = [
  {
    title: "Campus Life",
    items: [
      { type: 'image', src: '/images/gallery/campus-1.jpg', alt: 'Students collaborating on campus grounds' },
      { type: 'image', src: '/images/gallery/campus-2.jpg', alt: 'University library main hall' },
      { type: 'image', src: '/images/gallery/campus-3.jpg', alt: 'A sunny day at the main college building' },
      { type: 'image', src: '/images/gallery/campus-4.jpg', alt: 'Students in a modern computer lab' },
    ]
  },
  {
    title: "Events & Festivals",
    items: [
      { type: 'image', src: '/images/gallery/event-1.jpg', alt: 'Annual sports day event' },
      { type: 'image', src: '/images/gallery/event-2.jpg', alt: 'Cultural fest performance on stage' },
      { type: 'image', src: '/images/gallery/event-3.jpg', alt: 'Convocation ceremony' },
      // Example of a video slide. 'src' is the thumbnail, 'poster' is the image shown before play.
      // {
      //   type: "video",
      //   poster: "/images/gallery/video-poster.jpg",
      //   sources: [
      //     { src: "https://www.youtube.com/embed/your_video_id", type: "video/youtube" },
      //   ]
      // },
    ]
  },
  // Add more categories like "Infrastructure", "Sports", etc.
];

// Prepare slides for the lightbox by flattening the categories
const slides = galleryCategories.flatMap(category => category.items.map(item => ({
    src: item.src,
    alt: item.alt,
    type: item.type,
    // Add video specific properties if needed
    // poster: item.poster,
    // sources: item.sources,
})));


const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <main className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Our Gallery
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A glimpse into the vibrant life, events, and culture at Uday Pratap College.
          </p>
        </motion.div>

        <div className="space-y-12">
          {galleryCategories.map((category, categoryIndex) => {
            const categoryStartIndex = slides.findIndex(slide => slide.src === category.items[0].src);

            return (
              <section key={category.title}>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-orange-500 pb-2 mb-8">
                  {category.title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.src}
                      className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md"
                      onClick={() => setLightboxIndex(categoryStartIndex + itemIndex)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        // Enable plugins
        plugins={[Thumbnails, Zoom]}
      />
    </>
  );
};

export default GalleryPage;