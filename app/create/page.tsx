import { CreateForm } from '@/components/createForm';

export default function CreatePage() {
    return (
        <div className="flex-1 flex justify-center py-12 px-4">
            <div className="bg-white rounded-md shadow p-8 h-fit">
                <h1 className="text-center text-xl mb-4">Add Your Memory</h1>
                <CreateForm />
            </div>
        </div>
    );
}
