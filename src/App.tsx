import { useState } from 'react';
import './App.scss';
import { Modal } from './components/shared/modal/modal';
import { UncontrolledForm } from './components/uncontrolled-form/uncontrolled-form';
import { Provider } from 'react-redux';
import { store } from './store/store';

type FormType = 'uncontrolled' | 'rhf' | null;

function App() {
  const [openedForm, setOpenedForm] = useState<FormType>(null);

  const openUncontrolledForm = () => setOpenedForm('uncontrolled');
  const closeModal = () => setOpenedForm(null);

  return (
    <Provider store={store}>
      <div className="app">
        <main>
          <h1>Forms</h1>

          <div className="app__actions">
            <button type="button" className="button" onClick={openUncontrolledForm}>
              Open uncontrolled form
            </button>
          </div>
        </main>

        <Modal
          isOpen={openedForm !== null}
          title={openedForm === 'uncontrolled' ? 'Uncontrolled Form' : 'React Hook Form'}
          onClose={closeModal}
        >
          {openedForm === 'uncontrolled' && <UncontrolledForm onSubmit={closeModal} />}
        </Modal>
      </div>
    </Provider>
  );
}

export default App;
