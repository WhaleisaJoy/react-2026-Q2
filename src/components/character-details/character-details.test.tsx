import { render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes } from 'react';
import { mockCharacters } from '../../test-utils/mocks/characters';
import { CharacterDetails } from './character-details';

const fetchCharacterByIdMock = vi.hoisted(() => vi.fn());

vi.mock('../../api/ramapi-server', () => ({
  fetchCharacterById: fetchCharacterByIdMock,
}));

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) => {
      const messages: Record<string, string> = {
        close: 'Close details',
        status: 'Status',
        species: 'Species',
        gender: 'Gender',
        origin: 'Origin',
        location: 'Location',
        episodes: 'Episodes',
      };

      return messages[key] ?? key;
    }),
}));

vi.mock('../../i18n/navigation', () => ({
  Link: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('CharacterDetails', () => {
  const mockCharacter = mockCharacters[0];

  const renderCharacterDetails = async () => {
    const ui = await CharacterDetails({
      selectedCharacterId: mockCharacter.id,
      closeHref: '/?search=rick',
    });

    render(ui);
  };

  beforeEach(() => {
    fetchCharacterByIdMock.mockResolvedValue(mockCharacter);
  });

  it('should request character details by selected id', async () => {
    await renderCharacterDetails();

    expect(fetchCharacterByIdMock).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should render character details after successful request', async () => {
    await renderCharacterDetails();

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
  });

  it('should render close link', async () => {
    await renderCharacterDetails();

    expect(screen.getByRole('link', { name: /close details/i })).toHaveAttribute('href', '/?search=rick');
  });
});
