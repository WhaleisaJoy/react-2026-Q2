import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { CharacterCard } from './character-card';
import { mockCharacters } from '../../test-utils/mocks/characters';
import userEvent from '@testing-library/user-event';

describe('CharacterCard', () => {
  const mockCharacter = mockCharacters[0];
  const onSelect = vi.fn();
  const onCheckboxToggle = vi.fn();

  const renderCharacterCard = (isSelected = false) => {
    render(
      <CharacterCard
        character={mockCharacter}
        isCardSelected={isSelected}
        isCheckboxSelected={false}
        onCardSelect={onSelect}
        onCheckboxToggle={onCheckboxToggle}
      />
    );
  };

  beforeEach(() => {
    onSelect.mockClear();
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

  it('should call onSelect with character id when card is clicked', async () => {
    const user = userEvent.setup();
    renderCharacterCard();

    await user.click(screen.getByRole('button'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should call onSelect with character id when card is activated with keyboard', async () => {
    const user = userEvent.setup();
    renderCharacterCard();

    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should toggle checkbox without opening character details', async () => {
    const user = userEvent.setup();
    renderCharacterCard();

    await user.click(screen.getByRole('checkbox', { name: `Select ${mockCharacter.name}` }));

    expect(onCheckboxToggle).toHaveBeenCalledTimes(1);
    expect(onCheckboxToggle).toHaveBeenCalledWith(mockCharacter);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should not call onSelect when unsupported key is pressed on card', async () => {
    const user = userEvent.setup();
    renderCharacterCard();

    screen.getByRole('button').focus();
    await user.keyboard('a');

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should not call onSelect when keydown comes from checkbox', async () => {
    const user = userEvent.setup();
    renderCharacterCard();

    screen.getByRole('checkbox', { name: `Select ${mockCharacter.name}` }).focus();
    await user.keyboard('{Enter}');

    expect(onSelect).not.toHaveBeenCalled();
  });
});
