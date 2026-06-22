import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterListSection } from './character-list-section';
import { mockCharacters } from '../../test-utils/mocks/characters';
import { Provider } from 'react-redux';
import type { ComponentProps } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from '../../store/characters-reducer/characters-reducer';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const renderCharacterListSection = (props: Partial<ComponentProps<typeof CharacterListSection>> = {}) => {
  const store = configureStore({
    reducer: {
      characters: charactersReducer,
    },
  });

  renderWithIntl(
    <Provider store={store}>
      <CharacterListSection
        isLoading={false}
        error={null}
        characters={mockCharacters}
        selectedCharacterId={null}
        onSelectCharacter={() => {}}
        {...props}
      />
    </Provider>
  );
};

describe('CharacterListSection', () => {
  it('should render loader when loading', () => {
    renderCharacterListSection({ isLoading: true, characters: [] });

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('should render error message', () => {
    renderCharacterListSection({ error: 'Something went wrong' });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should render no results message when characters array is empty', () => {
    renderCharacterListSection({ characters: [] });

    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('should render correct number of character cards', () => {
    renderCharacterListSection({ selectedCharacterId: 1 });

    expect(screen.getAllByRole('button')).toHaveLength(mockCharacters.length);
  });

  it('should call onSelectCharacter when character card is clicked', async () => {
    const user = userEvent.setup();
    const onSelectCharacter = vi.fn();

    renderCharacterListSection({ onSelectCharacter });

    await user.click(screen.getAllByRole('button')[0]);

    expect(onSelectCharacter).toHaveBeenCalledWith(mockCharacters[0].id);
  });

  it('should toggle character selection when checkbox is clicked', async () => {
    const user = userEvent.setup();

    renderCharacterListSection();

    const checkbox = screen.getByRole('checkbox', { name: /select rick sanchez/i });

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
