import type { UserFormValues } from '../schemas/form-schema';

export type Submission = Omit<UserFormValues, 'image'> & {
  id: string;
  imageBase64: string;
};
