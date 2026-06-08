import { render, screen } from '@testing-library/react';
import { Modal } from './modal';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '');
    };

    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
    };
  });

  it('renders modal into portal', () => {
    render(
      <Modal isOpen={true} title="Test Modal" onClose={vi.fn()}>
        Content
      </Modal>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(document.body).toContainElement(screen.getByText('Content'));
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} title="Test Modal" onClose={vi.fn()}>
        Content
      </Modal>
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} title="Test Modal" onClose={onClose}>
        Content
      </Modal>
    );

    await userEvent.click(screen.getByLabelText(/close modal/i));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has accessible dialog attributes', async () => {
    render(
      <Modal isOpen={true} title="Test Modal" onClose={vi.fn()}>
        Content
      </Modal>
    );

    const dialog = await screen.findByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });
});
