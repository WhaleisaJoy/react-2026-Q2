import z from 'zod';
import { countries } from '../const/countries.const';
import { isValidEmail } from '../utils/validation.util';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'];

export type UserFormValues = z.infer<typeof formSchema>;

export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .refine((value) => value[0] === value[0]?.toUpperCase(), 'First letter must be uppercase'),

    age: z
      .string()
      .trim()
      .min(1, 'Age is required')
      .refine((value) => !Number.isNaN(Number(value)), 'Age must be a number')
      .refine((value) => Number(value) >= 0, 'Age cannot be negative'),

    email: z.string().min(1, 'Email is required').refine(isValidEmail, 'Invalid email'),

    gender: z.enum(['male', 'female'], {
      error: 'Gender is required',
    }),

    country: z.enum(countries, {
      message: 'Please select a valid country',
    }),

    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),

    terms: z.literal(true, {
      message: 'You must accept Terms & Conditions',
    }),

    image: z
      .instanceof(File, {
        message: 'Image is required',
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, 'Maximum image size is 5 MB')
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Only PNG and JPEG images are allowed'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
