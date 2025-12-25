'use client';

import { Code2, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import boostrabLogo from '../../../../public/assetes/skill/boostrap.png';
import cssLogo from '../../../../public/assetes/skill/css.png';
import figmaLogo from '../../../../public/assetes/skill/figma.png';
import firebaseLogo from '../../../../public/assetes/skill/firebase.png';
import htmlLogo from '../../../../public/assetes/skill/html.png';
import jsLogo from '../../../../public/assetes/skill/javaScript.png';
import mongodbLogo from '../../../../public/assetes/skill/mongodb.png';
import nodeLogo from '../../../../public/assetes/skill/node.js.png';
import postgresLogo from '../../../../public/assetes/skill/postgress.png';
import pythonLogo from '../../../../public/assetes/skill/python.png';
import reactLogo from '../../../../public/assetes/skill/react.png';
import sqlLogo from '../../../../public/assetes/skill/sql.png';
import tailwindCssLogo from '../../../../public/assetes/skill/tailwind css.png';
import typeScriptLogo from '../../../../public/assetes/skill/typeScript.png';

const skillCategories = {
    frontend: [
        { name: 'HTML', image: htmlLogo, level: 95 },
        { name: 'CSS', image: cssLogo, level: 90 },
        { name: 'Bootstrap', image: boostrabLogo, level: 85 },
        { name: 'Tailwind', image: tailwindCssLogo, level: 92 },
        { name: 'JavaScript', image: jsLogo, level: 88 },
        { name: 'TypeScript', image: typeScriptLogo, level: 85 },
        { name: 'React', image: reactLogo, level: 90 },
    ],
    backend: [
        { name: 'Node.js', image: nodeLogo, level: 87 },
        { name: 'Python', image: pythonLogo, level: 80 },
    ],
    database: [
        { name: 'MongoDB', image: mongodbLogo, level: 85 },
        { name: 'PostgreSQL', image: postgresLogo, level: 82 },
        { name: 'SQL', image: sqlLogo, level: 88 },
        { name: 'Firebase', image: firebaseLogo, level: 83 },
    ],
    design: [{ name: 'Figma', image: figmaLogo, level: 86 }],
};

const Skill = () => {
    const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(
        new Set()
    );
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Stagger animation for each skill
                        Object.keys(skillCategories).forEach((category) => {
                            skillCategories[
                                category as keyof typeof skillCategories
                            ].forEach((skill, index) => {
                                setTimeout(() => {
                                    setAnimatedSkills((prev) =>
                                        new Set(prev).add(
                                            `${category}-${index}`
                                        )
                                    );
                                }, index * 50);
                            });
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const SkillCard = ({
        skill,
        index,
        category,
        colorClass,
    }: {
        skill: (typeof skillCategories.frontend)[0];
        index: number;
        category: string;
        colorClass: string;
    }) => {
        const isAnimated = animatedSkills.has(`${category}-${index}`);

        return (
            <div
                className={`group relative h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200/80 dark:border-slate-700/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-${colorClass} dark:hover:border-${colorClass} hover:shadow-xl dark:hover:shadow-xl/20 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 ${
                    isAnimated
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                } transition-all duration-500`}
            >
                <div className='flex flex-col items-center space-y-3 h-full'>
                    {/* Image Container */}
                    <div className='relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-md'>
                        <Image
                            src={skill.image}
                            alt={skill.name}
                            width={40}
                            height={40}
                            className='object-contain'
                        />
                    </div>

                    {/* Skill Name */}
                    <div className='text-center w-full flex-1 flex flex-col justify-between'>
                        <span className='text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 block'>
                            {skill.name}
                        </span>

                        {/* Progress Bar */}
                        <div className='w-full mt-2'>
                            <div className='relative w-full bg-gray-200/70 dark:bg-slate-700/70 rounded-full h-1 overflow-hidden'>
                                <div
                                    className={`h-full bg-gradient-to-r ${
                                        colorClass.includes('blue') ||
                                        colorClass.includes('indigo')
                                            ? 'from-indigo-500 to-blue-500'
                                            : colorClass.includes('green')
                                            ? 'from-green-500 to-emerald-500'
                                            : colorClass.includes('orange')
                                            ? 'from-orange-500 to-red-500'
                                            : 'from-pink-500 to-purple-500'
                                    } rounded-full shadow-md transition-all duration-1000 ease-out`}
                                    style={{
                                        width: isAnimated
                                            ? `${skill.level}%`
                                            : '0%',
                                    }}
                                />
                            </div>
                            <span className='text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 block'>
                                {isAnimated ? skill.level : 0}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Hover Badge */}
                <div className='absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-${colorClass} to-${colorClass} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg scale-0 group-hover:scale-100'>
                    <Sparkles className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-white' />
                </div>
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            className='font-jetbrains-mono py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900/50 dark:to-indigo-950/30 rounded-2xl shadow-lg relative overflow-hidden'
        >
            {/* Animated Background Elements */}
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-32 -left-40 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl pointer-events-none' />

            <div className='font-jetbrains-mono max-w-7xl mx-auto relative z-10'>
                {/* Header Section */}
                <div className='text-center mb-12 sm:mb-16 md:mb-20'>
                    <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg'>
                        <Code2 className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
                    </div>
                    <h2 className='text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4'>
                        Skills & Expertise
                    </h2>
                    <p className='text-xs sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2'>
                        Crafted with precision. Technologies that power
                        innovation.
                    </p>
                </div>

                {/* Frontend Skills Section */}
                <div className='mb-12 sm:mb-16'>
                    <div className='flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8'>
                        <div className='flex-shrink-0'>
                            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md'>
                                <Zap className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                            </div>
                        </div>
                        <h3 className='text-lg sm:text-2xl font-bold text-gray-900 dark:text-white'>
                            Frontend Development
                        </h3>
                        <div className='flex-grow h-0.5 bg-gradient-to-r from-blue-500 to-transparent ml-2' />
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4'>
                        {skillCategories.frontend.map((skill, index) => (
                            <SkillCard
                                key={index}
                                skill={skill}
                                index={index}
                                category='frontend'
                                colorClass='indigo-500'
                            />
                        ))}
                    </div>
                </div>

                {/* Backend Skills Section */}
                <div className='mb-12 sm:mb-16'>
                    <div className='flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8'>
                        <div className='flex-shrink-0'>
                            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md'>
                                <Code2 className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                            </div>
                        </div>
                        <h3 className='text-lg sm:text-2xl font-bold text-gray-900 dark:text-white'>
                            Backend Development
                        </h3>
                        <div className='flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent ml-2' />
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4'>
                        {skillCategories.backend.map((skill, index) => (
                            <SkillCard
                                key={index}
                                skill={skill}
                                index={index}
                                category='backend'
                                colorClass='green-500'
                            />
                        ))}
                    </div>
                </div>

                {/* Database Skills Section */}
                <div className='mb-12 sm:mb-16'>
                    <div className='flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8'>
                        <div className='flex-shrink-0'>
                            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md'>
                                <svg
                                    className='w-4 h-4 sm:w-5 sm:h-5 text-white'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path d='M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z' />
                                    <path d='M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z' />
                                    <path d='M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z' />
                                </svg>
                            </div>
                        </div>
                        <h3 className='text-lg sm:text-2xl font-bold text-gray-900 dark:text-white'>
                            Database & Services
                        </h3>
                        <div className='flex-grow h-0.5 bg-gradient-to-r from-orange-500 to-transparent ml-2' />
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4'>
                        {skillCategories.database.map((skill, index) => (
                            <SkillCard
                                key={index}
                                skill={skill}
                                index={index}
                                category='database'
                                colorClass='orange-500'
                            />
                        ))}
                    </div>
                </div>

                {/* Design Tools Section */}
                <div>
                    <div className='flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8'>
                        <div className='flex-shrink-0'>
                            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md'>
                                <svg
                                    className='w-4 h-4 sm:w-5 sm:h-5 text-white'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className='text-lg sm:text-2xl font-bold text-gray-900 dark:text-white'>
                            Design Tools
                        </h3>
                        <div className='flex-grow h-0.5 bg-gradient-to-r from-pink-500 to-transparent ml-2' />
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4'>
                        {skillCategories.design.map((skill, index) => (
                            <SkillCard
                                key={index}
                                skill={skill}
                                index={index}
                                category='design'
                                colorClass='pink-500'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skill;
