import { render, screen } from '@testing-library/react';
import { CharacterList } from './character-list';
import { mockCharacters } from '../../test-utils/mocks/characters';

describe('CharacterList', () => {
  it('should render correct number of character cards', () => {
    render(<CharacterList characters={mockCharacters} selectedCharacterId={1} onSelectCharacter={() => {}} />);

    expect(screen.getAllByRole('article')).toHaveLength(mockCharacters.length);
  });

  it('should render no character cards when character array is empty', () => {
    render(<CharacterList characters={[]} selectedCharacterId={1} onSelectCharacter={() => {}} />);

    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
