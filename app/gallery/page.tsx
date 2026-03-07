'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

type GalleryItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; poster: string; sources: { src: string; type: string }[] };

type GalleryCategory = {
  title: string;
  items: GalleryItem[];
};

const galleryCategories: GalleryCategory[] = [
  {
    title: 'Campus Life',
    items: [
      { type: 'image', src: '/images/gallery/campus-1.jpg', alt: 'Students collaborating on campus grounds' },
      { type: 'image', src: '/images/gallery/campus-2.jpg', alt: 'University library main hall' },
      { type: 'image', src: '/images/gallery/campus-3.jpg', alt: 'A sunny day at the main college building' },
      { type: 'image', src: '/images/gallery/campus-4.jpg', alt: 'Students in a modern computer lab' },
    ],
  },
  {
    title: 'Events & Festivals',
    items: [
      { type: 'image', src: '/images/gallery/event-1.jpg', alt: 'Annual sports day event' },
      { type: 'image', src: '/images/gallery/event-2.jpg', alt: 'Cultural fest performance on stage' },
      {
        type: 'video',
        poster: '/images/gallery/video-poster.jpg',
        sources: [{ src: 'https://www.youtube.com/embed/ScMzIvxBSi4', type: 'video/youtube' }],
      },
    ],
  },
];

const slides = galleryCategories.flatMap((category) =>
  category.items.map((item) => {
    if (item.type === 'image') {
      return { type: 'image' as const, src: item.src, alt: item.alt };
    }
    return { type: 'video' as const, poster: item.poster, sources: item.sources };
  })
);

const GalleryPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Page header — CSS fade-in via globals.css */}
        <div className="page-enter text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Our Gallery</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A glimpse into the vibrant life, events, and culture at Uday Pratap College.
          </p>
        </div>

        <div className="space-y-12">
          {galleryCategories.map((category) => {
            const firstItem = category.items[0];
            const categoryStartIndex = slides.findIndex((slide) => {
              if (firstItem.type === 'image' && 'src' in slide) {
                return slide.src === (firstItem as Extract<GalleryItem, { type: 'image' }>).src;
              }
              if (firstItem.type === 'video' && 'poster' in slide) {
                return slide.poster === (firstItem as Extract<GalleryItem, { type: 'video' }>).poster;
              }
              return false;
            });

            return (
              <section key={category.title}>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-orange-500 pb-2 mb-8">
                  {category.title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.items.map((item, itemIndex) => {
                    const imgSrc = item.type === 'image' ? item.src : item.poster;
                    const altText = item.type === 'image' ? item.alt : 'Video preview';

                    return (
                      <div
                        key={imgSrc}
                        className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md"
                        onClick={() => setLightboxIndex(categoryStartIndex + itemIndex)}
                      >
                        <Image
                          src={imgSrc}
                          alt={altText}
                          fill
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    );
                  })}
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
        plugins={[Thumbnails, Zoom, Video]}
      />
    </>
  );
};

export default GalleryPage;
