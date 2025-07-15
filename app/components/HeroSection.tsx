'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Remove all react-three-fiber/drei imports and dynamic imports

const NAME = 'Raynold Yu';

export default function HeroSection() {
	// Scroll-based fade-out effect
	const [opacity, setOpacity] = useState(1);
	const [parallax, setParallax] = useState(0);
	const [typed, setTyped] = useState(NAME);
	const [typing, setTyping] = useState(true);
	const videoRef = useRef(null);
	const typingTimeout = useRef<NodeJS.Timeout | null>(null);

	// Typing animation logic
	useEffect(() => {
		let current = 0;
		let reverse = false;
		const type = () => {
			if (!reverse && current <= NAME.length) {
				setTyped(NAME.slice(0, current));
				current++;
				if (current <= NAME.length) {
					typingTimeout.current = setTimeout(type, 80);
				}
			} else if (reverse && current >= 0) {
				setTyped(NAME.slice(0, current));
				current--;
				if (current >= 0) {
					typingTimeout.current = setTimeout(type, 40);
				}
			}
		};
		if (typing) {
			current = 0;
			reverse = false;
			type();
		} else {
			current = NAME.length;
			reverse = true;
			type();
		}
		return () => {
			if (typingTimeout.current) clearTimeout(typingTimeout.current);
		};
	}, [typing]);

	// Scroll effect: fade out and trigger reverse typing
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const fadeStart = 0;
			const fadeEnd = 300;
			let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
			newOpacity = Math.max(0, Math.min(1, newOpacity));
			setOpacity(newOpacity);
			setParallax(scrollY * 0.3);
			if (newOpacity < 0.7) {
				setTyping(false);
			} else {
				setTyping(true);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<motion.section
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			style={{ opacity, transition: 'opacity 0.3s' }}
			className="h-screen flex items-center justify-center relative overflow-hidden"
		>
			{/* Parallax Video Background */}
			<video
				ref={videoRef}
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className="absolute inset-0 w-full h-full object-cover z-0 [image-rendering:crisp-edges] [object-fit:cover]"
				src="/anyma.mp4"
				style={{ transform: `translateY(${parallax}px)`, transition: 'transform 0.2s linear' }}
			/>
			{/* Dark overlay for readability */}
			<div className="absolute inset-0 bg-black/60 z-10" />
			{/* Profile + Terminal UI */}
			<div className="relative z-20 w-full max-w-2xl mx-auto mt-8">
				<div className="bg-neutral-900/60 backdrop-blur-md rounded-lg shadow-2xl border border-neutral-800 px-8 py-6 text-left flex flex-col gap-2 overflow-hidden" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
					{/* Terminal controls and content */}
					<div className="relative">
						<div className="flex items-center gap-2 mb-4">
							<span className="w-3 h-3 rounded-full bg-red-500 inline-block transition-shadow hover:shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]" />
							<span className="w-3 h-3 rounded-full bg-yellow-400 inline-block transition-shadow hover:shadow-[0_0_8px_2px_rgba(251,191,36,0.7)]" />
							<span className="w-3 h-3 rounded-full bg-green-500 inline-block transition-shadow hover:shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
						</div>
						<div className="text-green-400 font-mono text-sm mb-2">$ About Me</div>
						<div className="text-white font-mono text-3xl md:text-4xl font-bold mb-2 min-h-[2.5rem]">
							{typed}
							<span className="inline-block animate-pulse w-2 h-6 align-middle bg-white ml-1" style={{ opacity: typing ? 1 : 0 }} />
						</div>
						<div className="text-neutral-300 font-mono text-base">Software Engineer</div>
						<div className="text-neutral-300 font-mono text-base">Management Engineering 2026</div>
						<div className="text-neutral-300 font-mono text-base">University of Waterloo</div>
						<div className="text-neutral-300 font-mono text-base">Based in Toronto, ON</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
}
