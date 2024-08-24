import { Card } from '@/components/card';
import Link from 'next/link';
import { getMemories } from '@/lib/data';

export default async function Home() {
    const memories = await getMemories();

    return (
        <>
            <div className="flex-1 w-full max-w-screen-xl mx-auto py-12 px-4 flex flex-col gap-4">
                <div className="flex justify-end">
                    <Link
                        href={'create'}
                        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5"
                    >
                        Add Another
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {memories.map((memory) => (
                        <Card key={memory.id} data={memory} />
                    ))}
                </div>
            </div>
        </>
    );
}
