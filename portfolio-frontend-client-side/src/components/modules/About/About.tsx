'use client';

import { Download } from 'lucide-react';
import Image from 'next/image';
import me from '../../../../public/assetes/me.png';
import TextWrite from '../../shared/TextWrite';

const About = () => {
    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Asraful-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className='w-full py-16 md:py-24'>
            <div className='container mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-10'>
                {/* Text Section */}
                <div className='flex-1 text-center md:text-left space-y-5'>
                    <h1 className='font-schoolbell text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100'>
                        Hi, I am{' '}
                        <span className='font-schoolbell text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300'>
                            Asraful
                        </span>
                        <span className=''>
                            <TextWrite />
                        </span>
                    </h1>
                    <p className='font-inter text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-xl mx-auto md:mx-0'>
                        I’m a dedicated Full-Stack Web Developer passionate
                        about crafting modern, responsive, and high-performance
                        web applications that deliver seamless user experiences.
                    </p>

                    <div className='w-full flex justify-center md:justify-start mt-4'>
                        <button
                            onClick={handleDownloadResume}
                            className='inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors'
                        >
                            <Download size={20} />
                            Download Resume
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div className='flex-1 flex justify-center'>
                    <div className='relative w-96 h-96 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-blue-500/20 shadow-2xl'>
                        <Image
                            src={me.src}
                            alt='Asraful'
                            className='w-full h-full object-cover object-top'
                            width={450}
                            height={450}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
