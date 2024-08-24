'use client';

import { useFormStatus } from 'react-dom';
import { clsx } from 'clsx';
import Link from 'next/link';
import { deleteImage } from '@/lib/actions';

export const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className={clsx(
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center',
                {
                    'opacity-50 cursor-progress': pending,
                }
            )}
            disabled={pending}
        >
            {label === 'upload' ? (
                <>{pending ? 'Uploading...' : 'Upload'}</>
            ) : (
                <>{pending ? 'Updating...' : 'Update'}</>
            )}
        </button>
    );
};

export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link
            href={`edit/${id}`}
            className="min-w-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
        >
            Edit
        </Link>
    );
};

export const DeleteButton = ({ id }: { id: string }) => {
    const deleteImageWithId = deleteImage.bind(null, id);
    return (
        <form action={deleteImageWithId}>
            <DeleteBtn />
        </form>
    );
};

const DeleteBtn = () => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="min-w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
            disabled={pending}
        >
            {pending ? 'Deleting...' : 'Delete'}
        </button>
    );
};
