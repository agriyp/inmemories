'use server';
import { z } from 'zod';
import { put, del } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getMemoriesById } from '@/lib/data';

const UploadSchema = z.object({
    title: z.string().min(1),
    desc: z.string().min(1),
    imageFile: z
        .instanceof(File)
        .refine((file) => file.size > 0, { message: 'Image is required' })
        .refine((file) => file.size <= 5000000, { message: 'Image must be less than 5MB' })
        .refine((file) => file.size === 0 || file.type.startsWith('image/'), { message: 'Only images are allowed' }),
});

const EditSchema = z.object({
    title: z.string().min(1),
    desc: z.string().min(1),
    imageFile: z
        .instanceof(File)
        .refine((file) => file.size <= 5000000, { message: 'Image must be less than 5MB' })
        .refine((file) => file.size === 0 || file.type.startsWith('image/'), { message: 'Only images are allowed' })
        .optional(),
});

export const uploadImage = async (prevState: unknown, formData: FormData) => {
    const validatedFields = UploadSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const { title, desc, imageFile } = validatedFields.data;
    const { url } = await put(imageFile.name, imageFile, {
        access: 'public',
        multipart: true,
    });

    try {
        await prisma.upload.create({
            data: {
                title,
                desc,
                image: url,
            },
        });
    } catch {
        return { message: 'Failed to create data' };
    }

    revalidatePath('/');
    redirect('/');
};

export const updateImage = async (id: string, prevState: unknown, formData: FormData) => {
    const validatedFields = EditSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const data = await getMemoriesById(id);
    if (!data) return { message: 'No data found' };

    const { title, desc, imageFile } = validatedFields.data;
    let imagePath;
    if (!imageFile || imageFile.size <= 0) {
        imagePath = data.image;
    } else {
        await del(data.image);
        const { url } = await put(imageFile.name, imageFile, {
            access: 'public',
            multipart: true,
        });

        imagePath = url;
    }

    try {
        await prisma.upload.update({
            data: {
                title,
                desc,
                image: imagePath,
            },
            where: {
                id,
            },
        });
    } catch {
        return { message: 'Failed to update data' };
    }

    revalidatePath('/');
    redirect('/');
};

export const deleteImage = async (id: string) => {
    const data = await getMemoriesById(id);
    //cek data klo null
    if (!data) return { message: 'No data found' };
    await del(data.image);

    try {
        await prisma.upload.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        return { message: 'Failed to delete data' };
    }

    revalidatePath('/');
};
