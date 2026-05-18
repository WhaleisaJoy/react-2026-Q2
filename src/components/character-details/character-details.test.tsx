import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutletContext } from 'react-router';
import { getCharacter } from '../../api/ramapi-service';
import { mockCharacters } from '../../test-utils/mocks/characters';
import { CharacterDetails } from './character-details';

vi.mock('../../api/ramapi-service', () => ({
  getCharacter: vi.fn(),
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

    vi.mocked(getCharacter).mockResolvedValue(mockCharacter);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should request character details by selected id', async () => {
    render(<CharacterDetails />);

    await waitFor(() => {
      expect(getCharacter).toHaveBeenCalledWith(mockCharacter.id, expect.any(AbortSignal));
    });
  });

  it('should show loader while details are loading', () => {
    vi.mocked(getCharacter).mockReturnValue(new Promise(() => {}));

    render(<CharacterDetails />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('should render character details after successful request', async () => {
    render(<CharacterDetails />);

    expect(await screen.findByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
  });

  it('should show error message when request fails', async () => {
    vi.mocked(getCharacter).mockRejectedValueOnce(new Error('Character details were not found.'));

    render(<CharacterDetails />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Character details were not found.');
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();

    render(<CharacterDetails />);

    await user.click(screen.getByRole('button', { name: /close details/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
