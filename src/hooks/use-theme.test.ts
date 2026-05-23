import { renderHook } from '@testing-library/react';
import { useTheme } from './use-theme';

describe('useTheme', () => {
  it('should throw error when used outside of ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow('useTheme must be used within a ThemeProvider');
  });
});
