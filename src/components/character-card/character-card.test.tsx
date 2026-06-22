import { screen } from '@testing-library/react';
import { CharacterCard } from './character-card';
import { mockCharacters } from '../../test-utils/mocks/characters';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '../../test-utils/render-with-intl';
import type { AnchorHTMLAttributes } from 'react';

vi.mock('../../i18n/navigation', () => ({
  Link: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('CharacterCard', () => {
  const mockCharacter = mockCharacters[0];
  const onCheckboxToggle = vi.fn();

  const renderCharacterCard = (isSelected = false) => {
    renderWithIntl(
      <CharacterCard
        character={mockCharacter}
        isCardSelected={isSelected}
        isCheckboxSelected={false}
        searchValue=""
        currentPage={1}
        onCheckboxToggle={onCheckboxToggle}
      />
    );
  };

  beforeEach(() => {
    onCheckboxToggle.mockClear();
  });

  it('should render character name as a heading', () => {
    renderCharacterCard();
    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
  });

  it('should render character image with correct alt text and src', () => {
    renderCharacterCard();

    const image = screen.getByRole('img', { name: mockCharacter.name });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', mockCharacter.name);
    expect(decodeURIComponent(image.getAttribute('src') ?? '')).toContain(mockCharacter.image);
  });

  it('should use lazy loading for character image', () => {
    renderCharacterCard();

    const image = screen.getByRole('img', { name: mockCharacter.name });
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('should render character details', () => {
    renderCharacterCard();

    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
  });

  it('should render link to character details', () => {
    renderCharacterCard();

    expect(screen.getByRole('link')).toHaveAttribute('href', `?details=${mockCharacter.id}`);
  });

  it('should preserve search and page params in details link', () => {
    renderWithIntl(
      <CharacterCard
        character={mockCharacter}
        isCheckboxSelected={false}
        searchValue="rick"
        currentPage={2}
        onCheckboxToggle={onCheckboxToggle}
      />
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', `?search=rick&page=2&details=${mockCharacter.id}`);
  });

  it('should toggle checkbox without opening character details', async () => {
    const user = userEvent.setup();
    renderCharacterCard();

    await user.click(screen.getByRole('checkbox', { name: `Select ${mockCharacter.name}` }));

    expect(onCheckboxToggle).toHaveBeenCalledTimes(1);
    expect(onCheckboxToggle).toHaveBeenCalledWith(mockCharacter);
  });
});
