import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterListSection } from './character-list-section';
import { mockCharacters } from '../../test-utils/mocks/characters';
import { Provider } from 'react-redux';
import type { ComponentProps } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from '../../store/characters-reducer/characters-reducer';
import { renderWithIntl } from '../../test-utils/render-with-intl';
import type { AnchorHTMLAttributes } from 'react';

vi.mock('../../i18n/navigation', () => ({
  Link: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const renderCharacterListSection = (props: Partial<ComponentProps<typeof CharacterListSection>> = {}) => {
  const store = configureStore({
    reducer: {
      characters: charactersReducer,
    },
  });

  renderWithIntl(
    <Provider store={store}>
      <CharacterListSection
        characters={mockCharacters}
        selectedCharacterId={null}
        searchValue=""
        currentPage={1}
        {...props}
      />
    </Provider>
  );
};

describe('CharacterListSection', () => {
  it('should render no results message when characters array is empty', () => {
    renderCharacterListSection({ characters: [] });

    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('should render correct number of character cards', () => {
    renderCharacterListSection({ selectedCharacterId: 1 });

    expect(screen.getAllByRole('link')).toHaveLength(mockCharacters.length);
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
