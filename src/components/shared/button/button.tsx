import { Component, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

export class Button extends Component<Props> {
  render() {
    const { className = '', type = 'button', children, ...restProps } = this.props;

    return (
      <button className={`button ${className}`} type={type} {...restProps}>
        {children}
      </button>
    );
  }
}
