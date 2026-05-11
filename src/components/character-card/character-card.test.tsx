import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { CharacterCard } from './character-card';
import { mockCharacters } from '../../test-utils/mocks/characters';

describe('CharacterCard', () => {
  const mockCharacter = mockCharacters[0];

  it('should render character name as a heading', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByRole('heading', { name: mockCharacter.name })).toBeInTheDocument();
  });

  it('should render character image with correct alt text and src', () => {
    render(<CharacterCard character={mockCharacter} />);

    const image = screen.getByRole('img', { name: mockCharacter.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(image).toHaveAttribute('alt', mockCharacter.name);
  });

  it('should use lazy loading for character image', () => {
    render(<CharacterCard character={mockCharacter} />);

    const image = screen.getByRole('img', { name: mockCharacter.name });
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('should render character details', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
  });
});
