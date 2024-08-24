import { EditForm } from '@/components/editForm';
import { getMemoriesById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditPage({ params }: { params: { id: string } }) {
    const data = await getMemoriesById(params.id);
    if (!data) return notFound();

    return (
        <div className="flex-1 flex justify-center py-12 px-4">
            <div className="bg-white rounded-md shadow p-8 h-fit">
                <h1 className="text-center text-xl mb-4">Edit Your Memory</h1>
                <EditForm data={data} />
            </div>
        </div>
    );
}
