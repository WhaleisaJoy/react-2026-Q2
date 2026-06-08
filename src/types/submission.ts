import type { FormData } from '../schemas/form-schema';

export type Submission = Omit<FormData, 'image'> & {
  imageBase64: string;
};
