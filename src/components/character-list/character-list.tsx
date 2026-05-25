import type { PropsWithChildren } from 'react';
import './character-list.scss';

export function CharacterList({ children }: PropsWithChildren) {
  return <div className="character-list">{children}</div>;
}
