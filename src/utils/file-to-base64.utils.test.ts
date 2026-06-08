import { fileToBase64 } from './file-to-base64.utils';

describe('fileToBase64', () => {
  it('converts file to base64', async () => {
    class MockFileReader {
      result: string | ArrayBuffer | null = null;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL() {
        setTimeout(() => {
          this.result = 'data:image/png;base64,test';
          this.onload?.();
        }, 0);
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    const file = new File(['test'], 'test.png', {
      type: 'image/png',
    });

    await expect(fileToBase64(file)).resolves.toBe('data:image/png;base64,test');
  });
});
