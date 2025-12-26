/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export const createProject = async (data: {
    name: string;
    description: string;
    liveLink: string;
    repoLink: string;
    techStack: string[];
    image?: string | null;
}) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/project/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        const result = await res.json();

        if (result?.data?.id) {
            revalidateTag('PROJECTS');
            revalidatePath('/dashboard');
            return { success: true, data: result.data };
        }
        return {
            success: false,
            error: result.message || 'Failed to create project',
        };
    } catch (error) {
        return {
            success: false,
            error: 'An error occurred while creating the project',
        };
    }
};

export const updateProject = async (
    id: number,
    data: {
        name?: string;
        description?: string;
        liveLink?: string;
        repoLink?: string;
        techStack?: string[];
        image?: string | null;
    }
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/project/update/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

        const result = await res.json();

        if (result?.data?.id) {
            revalidateTag('PROJECTS');
            revalidatePath('/dashboard');
            revalidatePath(`/dashboard/edit-project/${id}`);
            return { success: true, data: result.data };
        }
        return {
            success: false,
            error: result.message || 'Failed to update project',
        };
    } catch (error) {
        return {
            success: false,
            error: 'An error occurred while updating the project',
        };
    }
};

export const deleteProject = async (id: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/project/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const result = await res.json();

        if (result?.data?.id || result?.success) {
            revalidateTag('PROJECTS');
            revalidatePath('/dashboard');
            return { success: true };
        }
        return {
            success: false,
            error: result.message || 'Failed to delete project',
        };
    } catch (error) {
        return {
            success: false,
            error: 'An error occurred while deleting the project',
        };
    }
};

export const getProjects = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/project/all`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: { tags: ['PROJECTS'], revalidate: 3600 },
            }
        );

        const result = await res.json();

        if (result?.data) {
            return { success: true, data: result.data };
        }
        return {
            success: false,
            data: [],
            error: result.message || 'Failed to fetch projects',
        };
    } catch (error) {
        return {
            success: false,
            data: [],
            error: 'An error occurred while fetching projects',
        };
    }
};

export const getProjectById = async (id: number) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: { revalidate: 3600 },
            }
        );

        const result = await res.json();

        if (result?.data) {
            return { success: true, data: result.data };
        }
        return {
            success: false,
            data: null,
            error: result.message || 'Failed to fetch project',
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: 'An error occurred while fetching the project',
        };
    }
};
