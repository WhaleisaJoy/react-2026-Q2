import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

export function Button({ className = '', type = 'button', children, ...restProps }: Props) {
  return (
    <button className={`button ${className}`} type={type} {...restProps}>
      {children}
    </button>
  );
}
