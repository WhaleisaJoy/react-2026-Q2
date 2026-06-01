import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext } from 'react-router';
import { useGetCharacterQuery } from '../../api/ramapi-service';
import { mockCharacters } from '../../test-utils/mocks/characters';
import { CharacterDetails } from './character-details';

vi.mock('../../api/ramapi-service', () => ({
  useGetCharacterQuery: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

describe('CharacterDetails', () => {
  const mockCharacter = mockCharacters[0];
  const onClose = vi.fn();

  beforeEach(() => {
    vi.mocked(useOutletContext).mockReturnValue({
      selectedCharacterId: mockCharacter.id,
      onClose,
    });

    vi.mocked(useGetCharacterQuery).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetCharacterQuery>);
  });

  it('should request character details by selected id', () => {
    render(<CharacterDetails />);

    expect(useGetCharacterQuery).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should show loader while details are loading', () => {
    vi.mocked(useGetCharacterQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetCharacterQuery>);

    render(<CharacterDetails />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('should render character details after successful request', () => {
    render(<CharacterDetails />);

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
  });

  it('should show error message when request fails', () => {
    vi.mocked(useGetCharacterQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404, data: { error: 'Not found' } },
      refetch: vi.fn(),
    } as ReturnType<typeof useGetCharacterQuery>);

    render(<CharacterDetails />);

    expect(screen.getByRole('alert')).toHaveTextContent('Character details were not found.');
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();

    render(<CharacterDetails />);

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

    render(<CharacterDetails />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });
});
