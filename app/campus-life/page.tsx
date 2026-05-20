/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import React from 'react';

export default function CampusLifePage() {
  return (
    <main className="bg-background min-h-screen text-on-background font-body pb-12">


      <section className="relative h-[870px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="Students walking through a historic stone campus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAauJNPpHtp7Enbnr1X9W_OxMQm4CWbdZZURoWlScOrmCHWwv9jWGJxxHH7rkt6Kwk_BsGs3o-L6pJbRAewg7I7W6I1uWzJHZuppsLEwoVw7n5aRbah2s4EN9Sv7pDwHP6zB5gYjKvxRXGdqCY9OXDxGC0cwG2JFbfRJ_FNiQ8SDzl0qoHhyXvMpiJpcLZRjyMtBCKi2XJHA-klchWjm0hj_E5ZuW72XNU3pDcmYCcPobnSiCa701lvQJfVYe3w_z9TqWuB8Jdlhw" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-2xl">
            <span className="text-tertiary-fixed-dim sans-nav text-sm font-bold uppercase mb-4 block tracking-[0.2em]">The Luminary Experience</span>
            <h1 className="serif-display text-5xl md:text-7xl text-white font-black leading-tight mb-8 tracking-tighter">
              Vibrant Life. <br />Lasting Heritage.
            </h1>
            <p className="text-on-primary-container text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              Discover a campus where tradition meets modern energy. Beyond the lecture halls lies a world of creativity, competition, and community.
            </p>
            <div className="flex gap-4">
              <button className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform">Explore Activities</button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-all">Watch the Film</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="serif-display text-4xl font-bold text-primary mb-4">A Glimpse of Home</h2>
              <p className="text-on-surface-variant max-w-xl">Experience the sights and sounds of Uday Pratap College through our latest video features.</p>
            </div>
            <button className="text-secondary font-bold flex items-center gap-2 group">
              View All Videos <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video relative overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Aerial view of the university main building" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDNcZ5PfWJ1L4oV8pJotOYDsN7UB2NWjRkvZfAtfi47oCEC2CYMaNn0V0XE0RTisIWgLpSkhZHzASt7LJEBPkPPvob81VB0N4qb0P41Mor1ADkBVVsgm64wPj8-fmxqo2BGpjoAcu-99YK7SCx0Q5ntCWE-Fe0mkyxXeOUdjDXwfPJV-F6IbOMZFh9hld_GneqZP07g0E2uAZKG2n4dfpvFy4cAxjoMGVpJo2ySty9_PkXzzct9heeuiwPc4bwX6pShLbPzZ5k8w" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-4xl" >play_arrow</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">Featured</span>
                <h3 className="serif-display text-2xl font-bold text-primary">Campus Tour 2024</h3>
              </div>
            </div>

            <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video relative overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Group of students laughing in a common room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIkVJ5-MrqOhx-EZ2IL0bFmGuqnRzzY0DrbIa9IIerfylBqriGFMexwfpqU0th-_yzx2ZG_JgLfXlJEc7QY3WmF7e3i7A7wkzzjLyL4QmmX9WqnlHocwPp2qtKyYe-BXGQpgGsT4uHlH_3httc0kpmLdYp23jn3S3jqAXenFRKzDnqtkDivY1bcAuweem7dzj4oHtBQsnrQOy57Vnpyt7_Ihr_XN6gOPitLfZb5gVYZ0MQtZgldZeLao5qAZqv_bNpEhNj7eC6vA" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-4xl" >play_arrow</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">Student Life</span>
                <h3 className="serif-display text-2xl font-bold text-primary">Student Life at UPC</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="serif-display text-4xl md:text-5xl font-bold text-primary mb-6">Clubs &amp; Communities</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Where passions find their place. Join over 50+ student-led organizations that define our rich culture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-primary-fixed flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-5xl">sports_soccer</span>
              </div>
              <h4 className="serif-display text-2xl font-bold text-primary mb-4">Athletics &amp; Sports</h4>
              <p className="text-on-surface-variant leading-relaxed mb-6">From inter-college championships to casual evening games, stay active and compete.</p>
              <a className="text-secondary font-bold underline decoration-2 underline-offset-4" href="#">Learn More</a>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-tertiary-fixed flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                <span className="material-symbols-outlined text-tertiary-fixed-variant text-5xl">palette</span>
              </div>
              <h4 className="serif-display text-2xl font-bold text-primary mb-4">Arts &amp; Culture</h4>
              <p className="text-on-surface-variant leading-relaxed mb-6">Unleash your creativity through theater, fine arts, music, and heritage dance forms.</p>
              <a className="text-secondary font-bold underline decoration-2 underline-offset-4" href="#">Learn More</a>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-outline-variant/30 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                <span className="material-symbols-outlined text-primary text-5xl">biotech</span>
              </div>
              <h4 className="serif-display text-2xl font-bold text-primary mb-4">Innovation &amp; Tech</h4>
              <p className="text-on-surface-variant leading-relaxed mb-6">Build the future in our coding labs, robotics workshops, and innovation hubs.</p>
              <a className="text-secondary font-bold underline decoration-2 underline-offset-4" href="#">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-high overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/3">
              <span className="text-secondary text-sm font-black uppercase tracking-widest mb-4 block">On Social</span>
              <h2 className="serif-display text-4xl font-bold text-primary mb-6">Follow Our Journey</h2>
              <p className="text-on-surface-variant mb-8">Get real-time updates and see daily campus life through the eyes of our students on Instagram.</p>
              <a href="https://www.instagram.com/udaypratap_official" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-3 rounded-lg font-bold inline-flex w-fit items-center gap-3">
                <span className="material-symbols-outlined">link</span>
                @udaypratap_official
              </a>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 gap-4 md:gap-8">
              <div className="aspect-[9/16] relative rounded-3xl overflow-hidden shadow-2xl translate-y-8">
                <img className="w-full h-full object-cover" data-alt="Vertical shot of students during a festival" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Ab0r7OxzkAFqIZLoMWwk33fICairy_DsV74rRMb4lMqxMMrJKDvy-JZG1cFFIbq_DkTlkvJxKLUrzS0gz5QFYlI45AvolvTkv00FNhykN1TuipH0Pn3DZEJyBtgwwRLb2z84k8wHmRN5ILMcIG6toAoVmm-F8XWD72WywwZWaKECMVp9uI-yDD-ZZShbPRifvuMVGHbAOZ11pvBjm9uxfQJE4yHeFh5FvVXrfXSHvPC2VW0_Cp9EEEMRM7XLHZ3_sSEJke5IQA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="material-symbols-outlined text-white mb-2" >movie</span>
                  <p className="text-white text-sm font-medium">Annual Fest Highlights</p>
                </div>
              </div>
              <div className="aspect-[9/16] relative rounded-3xl overflow-hidden shadow-2xl -translate-y-8">
                <img className="w-full h-full object-cover" data-alt="Students studying in a sunlit garden" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEOFW9HRU8WHsUJKb-sk4nUFtLzsB1c3gYOH0w6N2BysWuvVgHbzsnZh8RRNdHO22N9nsk4rchuXUPMfyOsG8mDvwhiVL41rwhOHg4gKunrKjK9AWDM91Ih7QhbaA1NhMLHZAusjhdys0YT5V0k7RTM1eanrZ00QIafwI7ZKNjAZs3YsgDnLCOFYypBFmfzSJpsTqwCTr_f_KeVs9GfXQxoXtJFPqEkGQ4ugnBrT0apxKRtsEslCHD2WuU1eoO8BOIYi8iYftuLA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="material-symbols-outlined text-white mb-2" >movie</span>
                  <p className="text-white text-sm font-medium">Morning Bliss at the Quad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <span className="material-symbols-outlined text-[20rem] absolute -right-20 -top-20 text-white">school</span>
        </div>
        <div className="container mx-auto px-8 relative z-10 text-center">
          <h2 className="serif-display text-4xl md:text-6xl text-white font-bold mb-8">Ready to Start Your Journey?</h2>
          <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join the league of luminaries. Applications for the Academic Year 2024-25 are now open.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-secondary text-on-secondary px-10 py-5 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(115,92,0,0.4)] transition-all">Apply Now</button>
            <button className="bg-transparent text-white border-2 border-white/30 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">Download Brochure</button>
          </div>
        </div>
      </section>

    </main>
  );
}
