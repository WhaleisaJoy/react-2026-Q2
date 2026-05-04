import { Component, type ErrorInfo, type ReactNode } from 'react';
import './error-boundry.scss';
import { Button } from '../shared/button/button';

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="app-error" role="alert">
            <h3 className="app-error__title">Something went wrong.</h3>
            <p>Please try refreshing the page or come back later.</p>
            <Button className="error-boundary__button" type="button" onClick={this.handleReload}>
              Reload app
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
