import { render, screen } from '@testing-library/react';
import { CharacterList } from './character-list';

describe('CharacterList', () => {
  it('should render children', () => {
    render(
      <CharacterList>
        <article>Character card</article>
        <article>Another character card</article>
      </CharacterList>
    );

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('should render empty list when there are no children', () => {
    render(<CharacterList />);

    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
