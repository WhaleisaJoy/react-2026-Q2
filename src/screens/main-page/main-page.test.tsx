import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AnchorHTMLAttributes, ComponentProps } from 'react';
import { mockCharacters } from '../../test-utils/mocks/characters';
import { MainPage } from './main-page';
import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from '../../store/characters-reducer/characters-reducer';
import { Provider } from 'react-redux';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const pushMock = vi.hoisted(() => vi.fn());
const refreshMock = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock('../../i18n/navigation', () => ({
  Link: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('../../components/character-details/character-details', () => ({
  CharacterDetails: ({ closeHref }: { selectedCharacterId: number; closeHref: string }) => (
    <div data-testid="character-details" data-close-href={closeHref} />
  ),
}));

const renderMainPage = (props: Partial<ComponentProps<typeof MainPage>> = {}) => {
  const store = configureStore({
    reducer: {
      characters: charactersReducer,
    },
  });

  renderWithIntl(
    <Provider store={store}>
      <MainPage
        characters={mockCharacters}
        totalPages={3}
        currentPage={1}
        searchValue=""
        selectedCharacterId={null}
        {...props}
      />
    </Provider>
  );
};

describe('MainPage', () => {
  beforeEach(() => {
    pushMock.mockClear();
    refreshMock.mockClear();
  });

  it('should render characters from server props', () => {
    renderMainPage();

    expect(screen.getByRole('heading', { name: mockCharacters[0].name })).toBeInTheDocument();
  });

  it('should render search initial value from server props', () => {
    renderMainPage({ searchValue: 'rick' });

    expect(screen.getByRole('textbox', { name: /search characters/i })).toHaveValue('rick');
  });

  it('should show no results message when characters array is empty', () => {
    renderMainPage({ characters: [], totalPages: 1 });

    expect(screen.getByText(/No characters found/i)).toBeInTheDocument();
  });

  it('should render pagination when there are multiple pages', () => {
    renderMainPage({ searchValue: 'rick', selectedCharacterId: mockCharacters[0].id });

    expect(screen.getByText(/Page 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '>' })).toHaveAttribute(
      'href',
      `?search=rick&page=2&details=${mockCharacters[0].id}`
    );
  });

  it('should refresh server data when refresh button is clicked', async () => {
    const user = userEvent.setup();

    renderMainPage();

    await user.click(screen.getByRole('button', { name: /refresh/i }));

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
