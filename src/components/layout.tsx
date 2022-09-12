import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

function NavItem({ href, text }: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={
          isActive
            ? 'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-semibold text-gray-800 dark:text-gray-200'
            : 'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-normal text-gray-600 dark:text-gray-400'
        }
      >
        <span className='capsize'>{text}</span>
      </a>
    </Link>
  );
}

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  return (
    <header className='flex flex-row justify-between items-center py-6 sm:pb-16 z-10 mx-auto px-8 md:px-0 w-full'>
      <nav className='flex items-center justify-between w-full relative'>
        <Link href='/'>
          <h1 className='pl-2 text-xl font-bold cursor-pointer'>Pokedex</h1>
        </Link>
        <div className='flex -ml-[0.6rem]'>
          {/* <NavItem href='/' text='Home' /> */}
          <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='ml-2 w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all'
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                className='w-5 h-5 text-gray-800 dark:text-gray-200'
              >
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                )}
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className='px-8 md:px-0 py-5 flex flex-wrap items-center justify-between w-full mx-auto'>
      <div className='flex justify-center items-center w-full'>
        <h3 className='text-2xl pr-1'>Pokedex</h3>
      </div>
    </footer>
  );
};

export default function layout({ title, children }: LayoutProps) {
  return (
    <div className='flex flex-col h-screen max-w-5xl mx-auto'>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='flex flex-col flex-grow px-0 md:px-0'>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
