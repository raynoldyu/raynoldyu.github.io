import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, MouseEvent } from 'react';

const experiences = [
  {
    company: 'Globalfaces Direct',
    logo: '/globalfaces_direct_logo.png',
    title: 'Application Developer',
    location: 'Toronto, ON',
    date: 'May 2022 – Aug 2022',
    description: [
      'Maintained a mobile fundraising app used by donor acquisition teams',
      'Streamlined app performance and integrated automated deployment pipelines'
    ],
    link: 'https://globalfacesdirect.com/',
  },
  {
    company: 'Ford Motor',
    logo: '/ford_motor_company_logo.png',
    title: 'Software Automation Developer Intern',
    location: 'Oakville, ON',
    date: 'Jan 2023 – Apr 2023',
    description: [
      'Built and improved software for connected vehicles.',
      'Automated deployments to speed up releases.'
    ],
    link: 'https://www.ford.com/support/category/fordpass/fordpass-connect-wifi-hotspot/',
  },
  {
    company: 'Safuture Inc',
    logo: '/safuture_inc_logo.png',
    title: 'Software Developer Intern',
    location: 'Oakville, ON',
    date: 'Sept 2023 – Dec 2023',
    description: [
      'Created tools to process and update large amounts of data quickly.',
      'Made it easier for users to access and use information for GIS applications.'
    ],
    link: 'https://safuture.net/',
  },
  {
    company: 'Bosda Inc',
    logo: '/bosda_internationnal_inc_logo.png',
    title: 'Software Engineer Intern',
    location: 'Aurora, ON',
    date: 'May 2024 – Aug 2024',
    description: [
      'Helped build and support CRM and order management systems used by supply chain teams.',
      'Improved system speed and made troubleshooting easier.'
    ],
    link: 'https://bosda.com/',
  },
  {
    company: 'AutoTrader.ca',
    logo: '/autotraderca_logo.png',
    title: 'Software Engineer Intern',
    location: 'Toronto, ON',
    date: 'Jan 2025 – Apr 2025',
    description: [
      'Made car search faster and more reliable for millions of users.',
      'Worked on the DealerTracker team to improve e-contracts and loan applications.'
    ],
    link: 'https://go.trader.ca/trader-corporation-acquires-dealertrack-canada/',
  },
  {
    company: 'Magnet Forensics',
    logo: '/magnet_logo.png',
    title: 'Incoming Software Engineer Intern',
    location: 'Atlanta, GA',
    date: 'Sept 2025 – Dec 2025',
    description: [
      'Helping build tools for digital investigations.'
    ],
    link: 'https://www.magnetforensics.com/resources/acquiring-and-analyzing-cloud-data-in-magnet-axiom/',
  }
];

function InteractiveCard({ children, ...props }: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  // 3D tilt effect using framer-motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;
    x.set(cardX - rect.width / 2);
    y.set(cardY - rect.height / 2);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Type-safe filter for drag-related props
  const safeProps = Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => key !== 'onDrag' && key !== 'onDragStart' && key !== 'onDragEnd'
    )
  );

  return (
    <motion.div
      style={{ rotateX, rotateY, x: 0, y: 0 }}
      whileHover={{ scale: 1.045, boxShadow: '0 0 32px 8px rgba(124,58,237,0.18)', borderColor: '#a78bfa' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-card backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-card transition-all duration-300 hover:shadow-[0_12px_48px_0_rgba(124,58,237,0.25)] hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-blue-600/20 focus:outline-none focus:ring-2 focus:ring-purple-400/60 flex flex-col gap-2 max-w-lg"
      tabIndex={0}
      {...safeProps}
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section className="py-12 md:py-20 px-4 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12 text-center tracking-tight relative"
      >
        <span className="relative z-10">Experience</span>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full blur-sm opacity-70 animate-pulse" />
      </motion.h2>
      <div className="relative">
        {/* Timeline vertical line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-purple-400 rounded-full opacity-60 z-0" style={{ transform: 'translateX(-50%)' }} />
        <div className="flex flex-col gap-16">
          {experiences.slice().reverse().map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                key={exp.company + exp.date}
                className="block group"
                tabIndex={0}
                aria-label={`Open details for ${exp.company}`}
              >
                <InteractiveCard
                  className={`w-full md:w-[48%] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'} cursor-pointer`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex-shrink-0 w-14 h-14 relative rounded-full overflow-hidden border border-card bg-card/50">
                      <Image src={exp.logo} alt={exp.company + ' logo'} fill className="object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold mb-1">{exp.title}</h3>
                      <div className="mb-1 font-bold">{exp.company} &mdash; {exp.location}</div>
                      <div className="mb-2 text-sm font-medium">{exp.date}</div>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-base pl-4">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </InteractiveCard>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
} 