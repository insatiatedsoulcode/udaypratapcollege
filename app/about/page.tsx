/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities */
import React from 'react';

export default function AboutPage() {
    return (
        <main className="bg-background min-h-screen text-on-background font-body pb-12">


            <section className="relative h-[600px] md:h-[716px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img alt="Uday Pratap College Campus" className="w-full h-full object-cover" src="/about-us-hero.jpg" />
                </div>
                {/* Advanced Gradient Overlay for guaranteed text readability */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent"></div>
                <div className="absolute inset-0 z-0 bg-black/20"></div>

                <div className="relative z-10 container mx-auto px-8">
                    <div className="max-w-3xl">
                        <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-6 drop-shadow-xl">
                            Our Story of Excellence and Vision
                        </h1>
                        <p className="text-blue-50 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-md">
                            Nurturing intellectual curiosity and character since inception, Uday Pratap College stands as a beacon of academic rigor and cultural heritage in Eastern Uttar Pradesh.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-surface px-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-surface-container-lowest p-12 rounded-xl shadow-sm border-b-4 border-secondary transition-all hover:shadow-md">
                            <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-on-secondary-container" data-icon="visibility">visibility</span>
                            </div>
                            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Our Vision</h2>
                            <p className="text-on-surface-variant leading-relaxed text-lg">
                                To be a globally recognized institution that fosters innovative research, academic excellence, and ethical leadership, creating a transformative impact on society and empowering future generations.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest p-12 rounded-xl shadow-sm border-b-4 border-primary transition-all hover:shadow-md">
                            <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary" data-icon="track_changes">track_changes</span>
                            </div>
                            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Our Mission</h2>
                            <p className="text-on-surface-variant leading-relaxed text-lg">
                                To provide high-quality education through modern curricula, state-of-the-art facilities, and a dedicated faculty, ensuring students are equipped with the skills and values necessary for professional success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-surface-container-low px-8 overflow-hidden">
                <div className="container mx-auto space-y-32">

                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 relative">
                            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary/20 rounded-xl"></div>
                            <img alt="Our Visionary Founder" className="relative z-10 w-full rounded-xl grayscale hover:grayscale-0 transition-all duration-500 shadow-xl" data-alt="College founder addressing an audience from a podium" src="/founder.png" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-4">Legacy of Wisdom</span>
                            <h2 className="font-headline text-4xl font-bold text-primary mb-6">Vision of Our Founder</h2>
                            <blockquote className="italic text-2xl text-on-surface mb-8 font-light leading-snug">
                                "True education is that which liberates the mind and builds a character resilient enough to face the storms of change while remaining anchored in values."
                            </blockquote>
                            <div className="h-1 w-20 bg-secondary mb-4"></div>
                            <p className="text-on-surface-variant leading-relaxed">
                                Established with the conviction that education should be accessible and empowering, our founder's vision continues to guide every academic pursuit and social initiative within these hallowed halls.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <div className="w-full md:w-1/2 relative">
                            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-xl"></div>
                            <img alt="Principal" className="relative z-10 w-full rounded-xl shadow-xl" data-alt="Professional portrait of the college principal in an office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqf1WQNxiSs0ynvxKVvk3FaOtAUiiH3PJUAKw_rvL5GKxMLhZVmmGJ0u62qYB1ExonLlxZgXKEX5P_PSw-OtIBq8ZKNe6FpnUYqfChYv3mYll-qj8fw0WgoHVWbeK1E5MP_cHLoqipd7p9jV82uSn6xHpyTMzhSxmIep6b93K4Rf9eIgN_0SOqXbxLE5MdCcsmEltFsM_7tYZFnGOC4eWf4uvgQ-yVpci1H-Oc9ba3aTCvAiFJR97F5S4in_yovBdqL163-L5eWA" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-4">Current Leadership</span>
                            <h2 className="font-headline text-4xl font-bold text-primary mb-6">Message From The Principal</h2>
                            <blockquote className="italic text-2xl text-on-surface mb-8 font-light leading-snug">
                                "We are not just teaching subjects; we are architecting the future leaders of our nation through innovation and discipline."
                            </blockquote>
                            <div className="h-1 w-20 bg-primary mb-4"></div>
                            <p className="text-on-surface-variant leading-relaxed">
                                At Uday Pratap College, we embrace the challenges of the 21st century by integrating technology with tradition, ensuring our students are not just graduates, but pioneers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-surface px-8">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-headline text-4xl font-bold text-primary">Our Journey</h2>
                        <p className="text-on-surface-variant mt-4">Milestones that define our growth and commitment.</p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">

                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-outline-variant hidden md:block"></div>
                        <div className="space-y-12">

                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-12 md:text-right">
                                    <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
                                        <span className="text-secondary font-black text-2xl block mb-2">2020</span>
                                        <h3 className="font-bold text-primary text-xl mb-2">BCA Introduced</h3>
                                        <p className="text-on-surface-variant text-sm">Launched the Bachelor of Computer Applications to meet the rising demand for tech professionals.</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-surface-container-lowest"></div>
                                <div className="md:w-1/2"></div>
                            </div>

                            <div className="flex flex-col md:flex-row-reverse items-center">
                                <div className="md:w-1/2 md:pl-12">
                                    <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
                                        <span className="text-primary font-black text-2xl block mb-2">2022</span>
                                        <h3 className="font-bold text-primary text-xl mb-2">Placement Record</h3>
                                        <p className="text-on-surface-variant text-sm">Achieved a milestone of 85% campus placements with leading multi-national corporations.</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-lowest"></div>
                                <div className="md:w-1/2"></div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-12 md:text-right">
                                    <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm">
                                        <span className="text-secondary font-black text-2xl block mb-2">2024</span>
                                        <h3 className="font-bold text-primary text-xl mb-2">New R&amp;D Lab</h3>
                                        <p className="text-on-surface-variant text-sm">Inaugurated a world-class Research &amp; Development center for Interdisciplinary Sciences.</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-surface-container-lowest"></div>
                                <div className="md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-primary-container text-white px-8">
                <div className="container mx-auto">
                    <div className="mb-16">
                        <h2 className="font-headline text-4xl font-bold mb-4">Why Choose Us?</h2>
                        <p className="text-on-primary-container max-w-xl">We provide an environment where heritage meets high-tech innovation, ensuring your educational journey is both grounded and global.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
                            <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6 block group-hover:scale-110 transition-transform" data-icon="menu_book">menu_book</span>
                            <h4 className="font-headline text-xl font-bold mb-3">Modern Curriculum</h4>
                            <p className="text-on-primary-container text-sm leading-relaxed">Dynamic courses designed in collaboration with academic experts and industry veterans.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
                            <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6 block group-hover:scale-110 transition-transform" data-icon="school">school</span>
                            <h4 className="font-headline text-xl font-bold mb-3">Expert Faculty</h4>
                            <p className="text-on-primary-container text-sm leading-relaxed">Mentors with decades of experience and PhDs from premier national institutions.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
                            <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6 block group-hover:scale-110 transition-transform" data-icon="lightbulb">lightbulb</span>
                            <h4 className="font-headline text-xl font-bold mb-3">Innovation Focus</h4>
                            <p className="text-on-primary-container text-sm leading-relaxed">Incubation centers and research hubs that encourage students to think beyond textbooks.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
                            <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6 block group-hover:scale-110 transition-transform" data-icon="hub">hub</span>
                            <h4 className="font-headline text-xl font-bold mb-3">Industry Links</h4>
                            <p className="text-on-primary-container text-sm leading-relaxed">Strategic partnerships with global leaders for internships and vocational training.</p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
