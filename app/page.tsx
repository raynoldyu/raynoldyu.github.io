'use client';

import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import { useEffect, useState } from 'react';

export default function MinimalModernPortfolio() {
	const [showTop, setShowTop] = useState(false);
	useEffect(() => {
		const onScroll = () => setShowTop(window.scrollY > 200);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div className="min-h-screen bg-black text-white light:bg-white light:text-black">
			<HeroSection />
			<ExperienceSection />
			<ProjectsSection />
			<ContactSection />
			{/* Back to Top Button */}
			{showTop && (
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
					aria-label="Back to top"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
					</svg>
				</button>
			)}
		</div>
	);
}
