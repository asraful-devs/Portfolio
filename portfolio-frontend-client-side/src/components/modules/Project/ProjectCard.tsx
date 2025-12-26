import { Calendar, Code2, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
    project: {
        id: number;
        name: string;
        description: string;
        liveLink: string;
        repoLink: string;
        techStack: string[];
        image: string | null;
        createdAt: string;
    };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className='group bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col'>
            {/* Project Image */}
            <div className='relative h-44 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-850 overflow-hidden'>
                {project.image?.trim() ? (
                    <Image
                        src={project.image.trim()}
                        alt={project.name}
                        width={400}
                        height={176}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <Code2 className='w-16 h-16 text-gray-300 dark:text-slate-700' />
                    </div>
                )}
            </div>

            {/* Project Content */}
            <div className='p-5 flex flex-col flex-grow'>
                {/* Project Name */}
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                    {project.name}
                </h3>

                {/* Description */}
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-grow'>
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className='flex flex-wrap gap-1.5 mb-4 min-h-[2rem]'>
                    {project.techStack.slice(0, 3).map((tech, index) => (
                        <span
                            key={index}
                            className='px-2.5 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-md'
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className='px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-md'>
                            +{project.techStack.length - 3}
                        </span>
                    )}
                </div>

                {/* Date */}
                <div className='flex items-center text-xs text-gray-500 dark:text-gray-500 mb-4 pb-4 border-b border-gray-100 dark:border-slate-800'>
                    <Calendar className='w-3.5 h-3.5 mr-1.5' />
                    <span>
                        {new Date(project.createdAt).toLocaleDateString(
                            'en-US',
                            {
                                month: 'short',
                                year: 'numeric',
                            }
                        )}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2 mt-auto'>
                    <a
                        href={project.liveLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-medium py-2 rounded-lg transition-colors duration-200'
                    >
                        <ExternalLink className='w-3.5 h-3.5' />
                        <span>View Live</span>
                    </a>
                    <a
                        href={project.repoLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200'
                        aria-label='GitHub Repository'
                    >
                        <Github className='w-4 h-4' />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
