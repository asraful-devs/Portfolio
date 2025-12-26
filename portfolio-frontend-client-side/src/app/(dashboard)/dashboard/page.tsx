import { authOptions } from '@/helpers/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Dashboard - Portfolio',
    description: 'Access your dashboard to view your portfolio and projects.',
};

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    // console.log(session);

    // Get current hour for greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            {/* Welcome Banner */}
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white'>
                <div className='flex items-center gap-6'>
                    {session?.user?.image ? (
                        <div className='relative'>
                            {/* // eslint-disable-next-line @next/next/no-img-element */}
                            <Image
                                src={session.user.image}
                                alt='Profile'
                                width={120}
                                height={120}
                                className='rounded-full object-cover border-4 border-white shadow-lg'
                            />
                            <div className='absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white'></div>
                        </div>
                    ) : (
                        <div className='w-[120px] h-[120px] rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg'>
                            {session?.user?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className='flex-1'>
                        <h1 className='text-4xl font-bold mb-2'>
                            {getGreeting()},{' '}
                            {session?.user?.name?.split(' ')[0]}! 👋
                        </h1>
                        <p className='text-blue-100 text-lg'>
                            Welcome to your Dashboard
                        </p>
                        <p className='text-blue-200 mt-2 flex items-center gap-2'>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                />
                            </svg>
                            {session?.user?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-blue-100 dark:bg-blue-900 p-3 rounded-lg'>
                            <svg
                                className='w-8 h-8 text-blue-600 dark:text-blue-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                />
                            </svg>
                        </div>
                        <div>
                            <p className='text-gray-500 dark:text-gray-400 text-sm'>
                                Profile
                            </p>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                                Active
                            </p>
                        </div>
                    </div>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-green-100 dark:bg-green-900 p-3 rounded-lg'>
                            <svg
                                className='w-8 h-8 text-green-600 dark:text-green-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                            </svg>
                        </div>
                        <div>
                            <p className='text-gray-500 dark:text-gray-400 text-sm'>
                                Status
                            </p>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                                Verified
                            </p>
                        </div>
                    </div>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-purple-100 dark:bg-purple-900 p-3 rounded-lg'>
                            <svg
                                className='w-8 h-8 text-purple-600 dark:text-purple-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                            </svg>
                        </div>
                        <div>
                            <p className='text-gray-500 dark:text-gray-400 text-sm'>
                                Member Since
                            </p>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                                2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-8'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='bg-blue-600 p-2 rounded-lg'>
                        <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                        About You
                    </h2>
                </div>

                <div className='prose dark:prose-invert max-w-none'>
                    <p className='text-justify leading-relaxed text-gray-700 dark:text-gray-300'>
                        Welcome to your personalized dashboard! Here you can
                        manage your profile, view your activities, and access
                        all the features available to you. We&apos;re excited to
                        have you as part of our community. Feel free to explore
                        and make the most of your account. If you need any
                        assistance, our support team is always here to help you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
