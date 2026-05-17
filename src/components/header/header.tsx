import { type ReactNode } from 'react';
import './header.scss';

interface Props {
  children?: ReactNode;
}

export function Header({ children }: Props) {
  return <header className="app-header">{children}</header>;
}
