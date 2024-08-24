'use client';

import { updateImage } from '@/lib/actions';
import React from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/button';
import type { Upload } from '@prisma/client';

export const EditForm = ({ data }: { data: Upload }) => {
    const [state, formAction] = useFormState(updateImage.bind(null, data.id), null);

    return (
        <form className="max-w-sm mx-auto" action={formAction}>
            <div className="mb-5 flex flex-col gap-4 min-w-96">
                <div className="relative">
                    <label htmlFor="imageFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Upload Image
                    </label>
                    <input
                        className="file:bg-blue-700 file:text-white file:border-0 file:py-2.5 file:px-3 file:rounded-lg file:shadow-xl text-sm text-gray-600 bg-gray-50 rounded-lg w-full border-gray-300 border"
                        name="imageFile"
                        id="imageFile"
                        type="file"
                    />
                    <div aria-live="polite" aria-atomic>
                        <p className="text-sm text-red-500 mt-2">{state?.error?.imageFile}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={data.title}
                    />
                    <div aria-live="polite" aria-atomic>
                        <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Describe your feel
                    </label>
                    <textarea
                        id="desc"
                        name="desc"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        rows={4}
                        defaultValue={data.desc}
                    />
                    <div aria-live="polite" aria-atomic>
                        <p className="text-sm text-red-500 mt-2">{state?.error?.desc}</p>
                    </div>
                </div>
            </div>
            <SubmitButton label="update" />
        </form>
    );
};
