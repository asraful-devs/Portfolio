// 'use client';
import { Code, Menu } from 'lucide-react';
import Link from 'next/link';
// import logo from '../../../public/assetes/development.png';

import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '../../helpers/authOptions';
import { ModeToggle } from '../ModeToggle';

const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/blog' },
    { title: 'Project', href: '/project' },
    { title: 'About', href: '/about' },
    { title: 'Dashboard', href: '/dashboard' },
];

export async function Navbar() {
    // const session = useSession();
    const session = await getServerSession(authOptions);

    return (
        <header className='font-inter sticky top-0 z-50 border-b border-gray-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl'>
            <div className='font-inter container flex h-16 items-center justify-between px-4 sm:px-6'>
                {/* Left: Logo / Name */}
                <Link
                    href='/'
                    className='group flex items-center gap-2.5 font-semibold transition-all duration-300'
                >
                    <div className='relative flex items-center justify-center'>
                        {/* Animated background circle */}
                        <div className='absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300' />
                        {/* Logo box */}
                        <div className='relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300'>
                            <Code className='w-5 h-5 text-white' />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-sm font-bold dark:text-white text-gray-900 leading-none'>
                            Md Asraful
                        </h3>
                        <span className='text-xs bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold'>
                            Developer
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className='hidden items-center gap-2 md:flex'>
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink
                                        asChild
                                        className={`${navigationMenuTriggerStyle()} relative group hover:bg-transparent`}
                                    >
                                        <Link
                                            href={item.href}
                                            className='text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 relative'
                                        >
                                            {item.title}
                                            <span className='absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Divider */}
                    <div className='w-px h-6 bg-gray-200 dark:bg-slate-700 mx-2' />

                    {/* Mode Toggle & Login */}
                    <ModeToggle />

                    {session ? (
                        <div className='ml-2'>
                            {session.user?.image ? (
                                <Image
                                    src={session.user?.image as string}
                                    alt={session.user?.name ?? 'User avatar'}
                                    width={36}
                                    height={36}
                                    className='rounded-full ring-2 ring-indigo-600/30 dark:ring-indigo-500/30 transition-all duration-300 hover:ring-indigo-600 dark:hover:ring-indigo-500'
                                />
                            ) : (
                                <div className='h-9 w-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600' />
                            )}
                        </div>
                    ) : (
                        <Button
                            asChild
                            className='ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg'
                        >
                            <Link href='/login'>Login</Link>
                        </Button>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className='flex items-center gap-2 md:hidden'>
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                className='rounded-lg border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-800'
                            >
                                <Menu className='h-5 w-5' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side='right'
                            className='w-64 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-slate-800/50'
                        >
                            <SheetHeader>
                                <SheetTitle className='flex items-center gap-2'>
                                    <div className='w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center'>
                                        <Code className='w-4 h-4 text-white' />
                                    </div>
                                    <span>Md Asraful</span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className='mt-8 px-4 flex flex-col gap-2'>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className='text-base font-medium text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-lg transition-all duration-300 hover:bg-indigo-600/10 dark:hover:bg-indigo-600/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                                    >
                                        {item.title}
                                    </Link>
                                ))}

                                {session ? (
                                    <div className='mt-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-100/50 dark:bg-slate-800/50'>
                                        {session.user?.image && (
                                            <Image
                                                src={
                                                    session.user
                                                        ?.image as string
                                                }
                                                alt={
                                                    session.user?.name ??
                                                    'User avatar'
                                                }
                                                width={36}
                                                height={36}
                                                className='rounded-full'
                                            />
                                        )}
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                                                {session.user?.name || 'User'}
                                            </p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                                Logged in
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        asChild
                                        className='mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg'
                                    >
                                        <Link href='/login'>Login</Link>
                                    </Button>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
