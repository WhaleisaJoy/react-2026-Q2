import './password-strength-indicator.scss';
import { getPasswordChecks } from '../../utils/password-strength.util';

type Props = {
  password: string;
};

export function PasswordStrengthIndicator({ password }: Props) {
  const checks = getPasswordChecks(password);

  return (
    <div className="password-strength-indicator">
      <p className="password-strength-indicator__title">Password strength:</p>

      <ul className="password-strength-indicator__list">
        <li
          className={`password-strength-indicator__list-item ${checks.hasNumber ? 'password-strength-indicator__list-item--correct' : 'password-strength-indicator__list-item--incorrect'}`}
        >
          1 number
        </li>
        <li
          className={`password-strength-indicator__list-item ${checks.hasUppercase ? 'password-strength-indicator__list-item--correct' : 'password-strength-indicator__list-item--incorrect'}`}
        >
          1 uppercase
        </li>
        <li
          className={`password-strength-indicator__list-item ${checks.hasLowercase ? 'password-strength-indicator__list-item--correct' : 'password-strength-indicator__list-item--incorrect'}`}
        >
          1 lowercase
        </li>
        <li
          className={`password-strength-indicator__list-item ${checks.hasSpecialChar ? 'password-strength-indicator__list-item--correct' : 'password-strength-indicator__list-item--incorrect'}`}
        >
          1 special character
        </li>
      </ul>
    </div>
  );
}
