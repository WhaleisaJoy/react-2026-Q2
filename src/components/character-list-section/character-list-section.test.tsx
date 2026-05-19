import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterListSection } from './character-list-section';
import { mockCharacters } from '../../test-utils/mocks/characters';

describe('CharacterListSection', () => {
  it('should render loader when loading', () => {
    render(
      <CharacterListSection
        isLoading
        error={null}
        characters={[]}
        selectedCharacterId={null}
        onSelectCharacter={() => {}}
      />
    );

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(
      <CharacterListSection
        isLoading={false}
        error="Something went wrong"
        characters={[]}
        selectedCharacterId={null}
        onSelectCharacter={() => {}}
      />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should render no results message when characters array is empty', () => {
    render(
      <CharacterListSection
        isLoading={false}
        error={null}
        characters={[]}
        selectedCharacterId={null}
        onSelectCharacter={() => {}}
      />
    );

    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('should render correct number of character cards', () => {
    render(
      <CharacterListSection
        isLoading={false}
        error={null}
        characters={mockCharacters}
        selectedCharacterId={1}
        onSelectCharacter={() => {}}
      />
    );

    expect(screen.getAllByRole('article')).toHaveLength(mockCharacters.length);
  });

  it('should call onSelectCharacter when character card is clicked', async () => {
    const user = userEvent.setup();
    const onSelectCharacter = vi.fn();

    render(
      <CharacterListSection
        isLoading={false}
        error={null}
        characters={mockCharacters}
        selectedCharacterId={null}
        onSelectCharacter={onSelectCharacter}
      />
    );

    await user.click(screen.getByRole('button', { name: /rick sanchez/i }));

    expect(onSelectCharacter).toHaveBeenCalledWith(mockCharacters[0].id);
  });
});
