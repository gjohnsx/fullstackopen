import { SunIcon, MoonIcon } from '@heroicons/react/solid';

export default function Nav(props) {
    return (
        <header className="bg-white dark:bg-indigo-600 transition-colors">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between lg:border-none">
                    <div className="flex items-center">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img
                            className="h-10 w-auto"
                            src={`https://tailwindui.com/img/logos/workflow-mark.svg${props.darkMode ? '?color=white' : ''}`}
                            alt=""
                            />
                        </a>
                    </div>

                    <div className="ml-10 space-x-4">              
                        <button
                            className={`${props.clickEffect && 'animate-wiggle'} inline-block bg-indigo-500 dark:bg-white text-white dark:text-indigo-700 py-2 px-4 border border-transparent rounded-full text-base font-medium dark:hover:drop-shadow-2xl transition-all`}
                            onClick={() => {
                                props.toggleDarkMode();
                            }}
                            >
                            {props.darkMode ? <SunIcon className='h-5 w-5 text-indigo-500' /> : <MoonIcon className='h-5 w-5 text-indigo-700'/>}
                        </button>
                    </div>

                </div>
            </nav>
        </header>
    );
};