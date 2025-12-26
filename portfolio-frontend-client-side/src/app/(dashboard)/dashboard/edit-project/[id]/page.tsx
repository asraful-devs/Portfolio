import { getProjectById } from '@/actions/project';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EditProjectForm from '../../../../../components/modules/Dashboard/EditProjectForm';

export const metadata: Metadata = {
    title: 'Edit Project - Dashboard - Portfolio',
    description: 'Edit your project details and information.',
};

interface Props {
    params: Promise<{ id: string }>;
}

const EditProjectPage = async ({ params }: Props) => {
    const { id } = await params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
        notFound();
    }

    const result = await getProjectById(projectId);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <EditProjectForm project={result.data} />
        </div>
    );
};

export default EditProjectPage;
