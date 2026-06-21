import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGetCharacterQuery } from '../../api/ramapi-service';
import { mockCharacters } from '../../test-utils/mocks/characters';
import { CharacterDetails } from './character-details';

vi.mock('../../api/ramapi-service', () => ({
  useGetCharacterQuery: vi.fn(),
}));

describe('CharacterDetails', () => {
  const mockCharacter = mockCharacters[0];
  const onClose = vi.fn();

  const renderCharacterDetails = () => {
    render(<CharacterDetails selectedCharacterId={mockCharacter.id} onClose={onClose} />);
  };

  beforeEach(() => {
    onClose.mockClear();

    vi.mocked(useGetCharacterQuery).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetCharacterQuery>);
  });

  it('should request character details by selected id', () => {
    renderCharacterDetails();

    expect(useGetCharacterQuery).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should show loader while details are loading', () => {
    vi.mocked(useGetCharacterQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetCharacterQuery>);

    renderCharacterDetails();

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('should render character details after successful request', () => {
    renderCharacterDetails();

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
  });

  it('should show error message when request fails', () => {
    vi.mocked(useGetCharacterQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404, data: { error: 'Not found' } },
      refetch: vi.fn(),
    } as ReturnType<typeof useGetCharacterQuery>);

    renderCharacterDetails();

    expect(screen.getByRole('alert')).toHaveTextContent('Character details were not found.');
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();

    renderCharacterDetails();

    await user.click(screen.getByRole('button', { name: /close details/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should show refresh indicator while details are refetching', () => {
    vi.mocked(useGetCharacterQuery).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isFetching: true,
      error: undefined,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCharacterQuery>);

    renderCharacterDetails();

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });
});
