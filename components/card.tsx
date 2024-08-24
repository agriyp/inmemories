import Image from 'next/image';
import Link from 'next/link';
import { DeleteButton, EditButton } from './button';
import type { Upload } from '@prisma/client';

export const Card = ({ data }: { data: Upload }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
            <div>
                <div className="relative aspect-video">
                    <Image
                        className="rounded-t-lg object-cover"
                        src={data.image}
                        alt={data.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="p-5">
                    <div>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {data.title}
                        </h5>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.desc}</p>
                </div>
            </div>
            <div className="flex gap-2 px-5 pb-5">
                <EditButton id={data.id} />
                <DeleteButton id={data.id} />
            </div>
        </div>
    );
};
