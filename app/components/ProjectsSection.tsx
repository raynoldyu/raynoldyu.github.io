'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
	{
		id: 1,
		title: 'DormSwipe Student Housing App',
		description: 'A new way to sublet and find housing for students and landlords.',
		image: '/dormswipe.png',
		tech: ['React', 'Firebase', 'Node.js', 'MySQL'],
		link: 'https://github.com/raynoldyu/Student-Housing-Web-App',
	},
	{
		id: 2,
		title: 'Stock Gains Predictor',
		description: 'A tool to predict stock gains using data science and machine learning.',
		image: '/stockpredictor.png',
		tech: ['Python', 'yfinance', 'xgboost', 'scikit-learn', 'streamlit'],
		link: 'https://github.com/AdrielDeVera/mse436',
	},
];

export default function ProjectsSection() {
	return (
		<section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center relative"
			>
				<span className="relative z-10">Featured Projects</span>
				<span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full blur-sm opacity-70 animate-pulse" />
			</motion.h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{projects.map((project) => (
					<motion.a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						key={project.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: project.id * 0.1 }}
						whileHover={{ scale: 1.025, boxShadow: '0 0 24px 4px rgba(124,58,237,0.15)' }}
						className="group relative aspect-video bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] hover:bg-white/20 dark:hover:bg-violet-900/20 mb-8"
					>
						{/* Project image */}
						<div className="absolute inset-0 w-full h-full">
							<Image src={project.image} alt={project.title} fill className="object-cover object-center opacity-60 group-hover:opacity-80 transition duration-300" />
						</div>
						{/* Overlay content */}
						<div className="relative z-10 flex flex-col h-full justify-end p-6">
							<h3 className="text-xl font-bold mb-2 drop-shadow-lg">{project.title}</h3>
							<p className="mb-4 text-sm font-medium drop-shadow-lg">{project.description}</p>
							<div className="flex flex-wrap gap-2 mb-2">
								{project.tech.map((tech) => (
									<span key={tech} className="px-2 py-1 rounded bg-violet-600/80 text-xs font-semibold text-white shadow-sm dark:bg-violet-400/80 dark:text-violet-900">{tech}</span>
								))}
							</div>
						</div>
					</motion.a>
				))}
			</div>
		</section>
	);
}
