'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const companySchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export async function saveCompany(formData: unknown) {
  const parse = companySchema.safeParse(formData);

  if (!parse.success) {
    return {
      success: false,
      error:
        parse.error.flatten().fieldErrors.name?.[0] || 'Invalid input',
    };
  }

  try {
    await prisma.core_company.create({
      data: {
        name: parse.data.name,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Database error' };
  }
}
