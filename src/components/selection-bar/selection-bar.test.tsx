import { screen } from '@testing-library/react';
import { SelectionBar } from './selection-bar';
import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from '../../store/characters-reducer/characters-reducer';
import { Provider } from 'react-redux';
import { mockCharacters } from '../../test-utils/mocks/characters';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '../../test-utils/render-with-intl';

const renderSelectionBar = (selectedCharactersById = {}) => {
  const store = configureStore({
    reducer: {
      characters: charactersReducer,
    },
    preloadedState: {
      characters: {
        selectedCharactersById,
      },
    },
  });

  renderWithIntl(
    <Provider store={store}>
      <SelectionBar />
    </Provider>
  );
};

describe('SectionBar', () => {
  it('should not render when no characters are selected', () => {
    renderSelectionBar();

    expect(screen.queryByRole('button', { name: /unselect all/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /download/i })).not.toBeInTheDocument();
  });

  it('should render when at least one character is selected', () => {
    renderSelectionBar({
      [mockCharacters[0].id]: mockCharacters[0],
    });

    expect(screen.getByRole('button', { name: /unselect all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();
  });

  it('should hide component when Unselect all is clicked', async () => {
    const user = userEvent.setup();

    renderSelectionBar({
      [mockCharacters[0].id]: mockCharacters[0],
    });

    expect(screen.getByText('1 item selected')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(screen.queryByRole('button', { name: /unselect all/i })).not.toBeInTheDocument();
  });

  it('should render CSV export form with selected character ids', () => {
    renderSelectionBar({
      [mockCharacters[0].id]: mockCharacters[0],
    });

    const form = screen.getByRole('button', { name: /download/i }).closest('form');
    const input = screen.getByDisplayValue(String(mockCharacters[0].id));

    expect(form).toHaveAttribute('action', '/api/export/characters');
    expect(form).toHaveAttribute('method', 'post');
    expect(input).toHaveAttribute('name', 'ids');
  });
});
