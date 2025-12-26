'use client';

import { deleteProject } from '@/actions/project';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Project {
    id: number;
    name: string;
    description: string;
    liveLink: string;
    repoLink: string;
    techStack: string[];
    image?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

interface ProjectsListProps {
    projects: Project[];
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = async (id: number, name: string) => {
        if (
            !confirm(
                `Are you sure you want to delete "${name}"? This action cannot be undone.`
            )
        ) {
            return;
        }

        setDeletingId(id);
        try {
            const result = await deleteProject(id);
            if (result.success) {
                toast.success('Project deleted successfully!');
                router.refresh();
            } else {
                toast.error(result.error || 'Failed to delete project');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('An error occurred while deleting the project');
        } finally {
            setDeletingId(null);
        }
    };

    if (projects.length === 0) {
        return (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center'>
                <svg
                    className='w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                </svg>
                <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    No Projects Yet
                </h3>
                <p className='text-gray-500 dark:text-gray-400 mb-6'>
                    Start by creating your first project to showcase your work!
                </p>
                <Link
                    href='/dashboard/create-project'
                    className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors'
                >
                    Create First Project
                </Link>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                    Your Projects ({projects.length})
                </h2>
                <Link
                    href='/dashboard/create-project'
                    className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2'
                >
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
                            d='M12 4v16m8-8H4'
                        />
                    </svg>
                    New Project
                </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className='bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full'
                    >
                        {/* Project Image */}
                        {project.image?.trim() && (
                            <div className='w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden'>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.image.trim()}
                                    alt={project.name}
                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                                />
                            </div>
                        )}

                        {/* Project Content */}
                        <div className='p-6 flex-1 flex flex-col'>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                                {project.name}
                            </h3>

                            <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1'>
                                {project.description.substring(0, 100)}
                                {project.description.length > 100 ? '...' : ''}
                            </p>

                            {/* Tech Stack */}
                            <div className='mb-4'>
                                <div className='flex flex-wrap gap-2'>
                                    {project.techStack
                                        .slice(0, 3)
                                        .map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className='inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    {project.techStack.length > 3 && (
                                        <span className='inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full'>
                                            +{project.techStack.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Links */}
                            <div className='flex gap-2 mb-4'>
                                <a
                                    href={project.liveLink}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm'
                                >
                                    <svg
                                        className='w-4 h-4'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                                        />
                                    </svg>
                                    Live
                                </a>
                                <a
                                    href={project.repoLink}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex-1 inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm'
                                >
                                    <svg
                                        className='w-4 h-4'
                                        fill='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                                    </svg>
                                    Code
                                </a>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-2'>
                                <Link
                                    href={`/dashboard/edit-project/${project.id}`}
                                    className='flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm'
                                >
                                    <svg
                                        className='w-4 h-4'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                                        />
                                    </svg>
                                    Edit
                                </Link>
                                <button
                                    onClick={() =>
                                        handleDelete(project.id, project.name)
                                    }
                                    disabled={deletingId === project.id}
                                    className='flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm disabled:cursor-not-allowed'
                                >
                                    <svg
                                        className='w-4 h-4'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H4v2h16V7h-3z'
                                        />
                                    </svg>
                                    {deletingId === project.id
                                        ? 'Deleting...'
                                        : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsList;
