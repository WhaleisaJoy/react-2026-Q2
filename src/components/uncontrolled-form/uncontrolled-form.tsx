import './uncontrolled-form.scss';
import { useRef, useState } from 'react';
import { countries } from '../../const/countries.const';
import { formSchema, type UserFormValues } from '../../schemas/form-schema';
import { fileToBase64 } from '../../utils/file-to-base64.utils';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store/submissions-reducer/submissions-reducer';
import { PasswordStrengthIndicator } from '../password-strength-indicator/password-strength-indicator';

interface Props {
  onSubmit: () => void;
}

export function UncontrolledForm({ onSubmit }: Props) {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormValues, string>>>({});

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const imageEntry = formData.get('image');

    const result = formSchema.safeParse({
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      gender: formData.get('gender'),
      country: formData.get('country'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      terms: formData.get('terms') === 'on',
      image: imageEntry,
    });

    if (!result.success) {
      const formattedErrors = Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));

      setErrors(formattedErrors);
      return;
    }

    const { image, ...formDataWithoutImage } = result.data;
    const imageBase64 = await fileToBase64(image);

    dispatch(
      addSubmission({
        ...formDataWithoutImage,
        id: crypto.randomUUID(),
        imageBase64,
      })
    );

    formRef.current.reset();
    onSubmit();
  };

  return (
    <form className="form" ref={formRef} onSubmit={handleSubmit}>
      <div className="form__field">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input className="form__input" type="text" id="name" name="name" autoComplete="on" required />
        <span className="form__error" role="alert">
          {errors.name ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="age">
          Age
        </label>
        <input className="form__input" type="number" id="age" name="age" min="0" required />
        <span className="form__error" role="alert">
          {errors.age ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input className="form__input" type="email" id="email" name="email" required />
        <span className="form__error" role="alert">
          {errors.email ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="gender">
          Gender
        </label>
        <select className="form__input" defaultValue="male" id="gender" name="gender" required>
          <option value="male">Male</option>

          <option value="female">Female</option>
        </select>
        <span className="form__error" role="alert">
          {errors.gender ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="form__error" role="alert">
          {errors.password ?? ''}
        </span>
        <PasswordStrengthIndicator password={password} />
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input className="form__input" type="password" id="confirmPassword" name="confirmPassword" required />
        <span className="form__error" role="alert">
          {errors.confirmPassword ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="image">
          Image
        </label>
        <input className="form__input" type="file" id="image" name="image" accept=".png,.jpg,.jpeg" />
        <span className="form__error" role="alert">
          {errors.image ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="country">
          Country
        </label>
        <input className="form__input" list="countries" id="country" name="country" required />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <span className="form__error" role="alert">
          {errors.country ?? ''}
        </span>
      </div>

      <div className="form__field">
        <div className="form__group">
          <input className="" type="checkbox" id="terms" name="terms" required />
          <label className="form__label" htmlFor="terms">
            I accept Terms & Conditions
          </label>
        </div>
        <span className="form__error" role="alert">
          {errors.terms ?? ''}
        </span>
      </div>

      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}
