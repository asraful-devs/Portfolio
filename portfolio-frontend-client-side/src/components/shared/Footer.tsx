'use client';

import {
    ArrowUp,
    Briefcase,
    Code,
    Facebook,
    Github,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    User,
    Youtube,
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '/', icon: User },
        { name: 'Blog', href: '/blog', icon: MessageSquare },
        { name: 'Project', href: '/project', icon: Briefcase },
        { name: 'About', href: '/about', icon: User },
        { name: 'Dashboard', href: '/dashboard', icon: Code },
    ];

    const socialLinks = [
        {
            icon: Linkedin,
            href: 'https://www.linkedin.com/in/asraful-devs/',
            name: 'LinkedIn',
        },
        {
            icon: Github,
            href: 'https://github.com/asraful-devs',
            name: 'GitHub',
        },
        {
            icon: Facebook,
            href: 'https://www.facebook.com/asraful.devs',
            name: 'Facebook',
        },
        {
            icon: Instagram,
            href: 'https://www.instagram.com/asraful.devs/',
            name: 'Instagram',
        },
        {
            icon: Youtube,
            href: 'https://www.youtube.com/@asraful_devs',
            name: 'YouTube',
        },
    ];

    return (
        <footer className='font-inter relative mt-10 bg-white dark:bg-slate-900 text-gray-800 dark:text-white transition-colors duration-300'>
            {/* Decorative Wave */}
            <div className='font-inter absolute top-0 left-0 w-full overflow-hidden leading-none'>
                <svg
                    className='relative block w-full h-12'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 1200 120'
                    preserveAspectRatio='none'
                >
                    <path
                        d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
                        className='fill-gray-50 dark:fill-slate-950'
                    ></path>
                </svg>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8'>
                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12'>
                    {/* Brand Section */}
                    <div className='lg:col-span-1'>
                        <div className='flex items-center space-x-2 mb-4'>
                            <div className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md'>
                                <Code className='w-6 h-6 text-white' />
                            </div>
                            <h3 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                                Md Asraful
                            </h3>
                        </div>
                        <p className='text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
                            Crafting digital experiences with passion and
                            precision. Transforming ideas into elegant
                            solutions.
                        </p>
                        <div className='space-y-3'>
                            <div className='flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'>
                                <Mail className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                                <span className='text-sm'>
                                    work.mdasraful56@gmail.com
                                </span>
                            </div>
                            <div className='flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'>
                                <Phone className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                                <span className='text-sm'>+880 1889245756</span>
                            </div>
                            <div className='flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'>
                                <MapPin className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                                <span className='text-sm'>
                                    Dhaka, Bangladesh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-lg font-bold mb-6 text-gray-900 dark:text-white'>
                            Quick Links
                        </h4>
                        <ul className='space-y-3'>
                            {quickLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className='flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 group'
                                        >
                                            <Icon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className='text-lg font-bold mb-6 text-gray-900 dark:text-white'>
                            Stay Updated
                        </h4>
                        <p className='text-gray-600 dark:text-gray-400 mb-4 text-sm'>
                            Subscribe to get the latest updates and news.
                        </p>
                        <div className='flex flex-col space-y-3'>
                            <input
                                type='email'
                                placeholder='Enter your email'
                                className='px-4 py-2.5 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors'
                            />
                            <button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]'>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className='border-t border-gray-200 dark:border-slate-700 pt-8 mb-8'>
                    <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0'>
                        <div className='flex flex-wrap justify-center gap-3'>
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='group w-11 h-11 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg'
                                        aria-label={social.name}
                                    >
                                        <Icon className='w-5 h-5 text-gray-700 dark:text-gray-400 group-hover:text-white transition-colors' />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Scroll to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className='group w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl'
                            aria-label='Scroll to top'
                        >
                            <ArrowUp className='w-5 h-5 text-white group-hover:animate-bounce' />
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-gray-200 dark:border-slate-700 pt-8'>
                    <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-sm text-gray-600 dark:text-gray-400'>
                        <p className='flex items-center space-x-1'>
                            <span>
                                © {currentYear} YourName. All rights reserved.
                            </span>
                        </p>
                        <p className='flex items-center space-x-1'>
                            <span>Made with</span>
                            <Heart className='w-4 h-4 text-red-500 fill-red-500 animate-pulse' />
                            <span>in Bangladesh</span>
                        </p>
                        <div className='flex space-x-6'>
                            <a
                                href='#'
                                className='hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
                            >
                                Privacy Policy
                            </a>
                            <a
                                href='#'
                                className='hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
