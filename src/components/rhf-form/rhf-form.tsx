import './rhf-form.scss';
import { countries } from '../../const/countries.const';
import { formSchema, type UserFormValues } from '../../schemas/form-schema';
import { fileToBase64 } from '../../utils/file-to-base64.utils';
import { useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store/submissions-reducer/submissions-reducer';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { PasswordStrengthIndicator } from '../password-strength-indicator/password-strength-indicator';

interface Props {
  onSubmit: () => void;
}

export function RHFForm({ onSubmit }: Props) {
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    trigger,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const password = useWatch({ control, name: 'password' });

  useEffect(() => {
    if (touchedFields.confirmPassword) {
      void trigger('confirmPassword');
    }
  }, [password, trigger, touchedFields.confirmPassword]);

  const onFormSubmit = async (data: UserFormValues) => {
    const { image, ...formDataWithoutImage } = data;
    const imageBase64 = await fileToBase64(image);

    dispatch(
      addSubmission({
        ...formDataWithoutImage,
        id: crypto.randomUUID(),
        imageBase64,
      })
    );

    reset();
    onSubmit();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form__field">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input className="form__input" type="text" id="name" autoComplete="on" {...register('name')} />
        <span className="form__error" role="alert">
          {errors.name?.message ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="age">
          Age
        </label>
        <input className="form__input" type="number" id="age" min="0" {...register('age')} />
        <span className="form__error" role="alert">
          {errors.age?.message ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input className="form__input" type="email" id="email" {...register('email')} />
        <span className="form__error" role="alert">
          {errors.email?.message ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="gender">
          Gender
        </label>
        <select className="form__input" defaultValue="male" id="gender" {...register('gender')}>
          <option value="male">Male</option>

          <option value="female">Female</option>
        </select>
        <span className="form__error" role="alert">
          {errors.gender?.message ?? ''}
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
          autoComplete="new-password"
          {...register('password')}
        />
        <span className="form__error" role="alert">
          {errors.password?.message ?? ''}
        </span>
        <PasswordStrengthIndicator password={password || ''} />
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="form__input"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
        <span className="form__error" role="alert">
          {errors.confirmPassword?.message ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="image">
          Image
        </label>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <input
              className="form__input"
              type="file"
              id="image"
              accept=".png,.jpg,.jpeg"
              onChange={(event) => {
                onChange(event.target.files?.[0]);
              }}
            />
          )}
        />
        <span className="form__error" role="alert">
          {errors.image?.message ?? ''}
        </span>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="country">
          Country
        </label>
        <input className="form__input" list="countries" id="country" {...register('country')} />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <span className="form__error" role="alert">
          {errors.country?.message ?? ''}
        </span>
      </div>

      <div className="form__field">
        <div className="form__group">
          <input className="" type="checkbox" id="terms" {...register('terms')} />
          <label className="form__label" htmlFor="terms">
            I accept Terms & Conditions
          </label>
        </div>
        <span className="form__error" role="alert">
          {errors.terms?.message ?? ''}
        </span>
      </div>

      <button className="button" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
