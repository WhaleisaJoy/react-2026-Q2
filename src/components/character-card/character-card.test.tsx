import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { CharacterCard } from './character-card';
import { mockCharacters } from '../../test-utils/mocks/characters';
import userEvent from '@testing-library/user-event';

describe('CharacterCard', () => {
  const mockCharacter = mockCharacters[0];
  const onSelect = vi.fn();

  const renderCharacterCard = (isSelected = false) => {
    render(<CharacterCard character={mockCharacter} isSelected={isSelected} onSelect={onSelect} />);
  };

  beforeEach(() => {
    onSelect.mockClear();
  });

  it('should render character name as a heading', () => {
    renderCharacterCard();
    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
  });

  it('should render character image with correct alt text and src', () => {
    renderCharacterCard();

    const image = screen.getByRole('img', { name: mockCharacter.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(image).toHaveAttribute('alt', mockCharacter.name);
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

  it('should call onSelect with character id when card is clicked', async () => {
    const user = userEvent.setup();
    renderCharacterCard();

    await user.click(screen.getByRole('button'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should add selected class when character is selected', () => {
    renderCharacterCard(true);

    expect(screen.getByRole('article')).toHaveClass('character-card--selected');
  });
});
