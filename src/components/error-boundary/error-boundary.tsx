import { Component, type ErrorInfo, type ReactNode } from 'react';
import './error-boundary.scss';
import { Button } from '../shared/button/button';
import { ErrorMessage } from '../shared/error-message/error-message';

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
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <ErrorMessage title="Something went wrong." message="Please try refreshing the page or come back later.">
            <Button className="error-boundary__button" type="button" onClick={this.handleReload}>
              Reload app
            </Button>
          </ErrorMessage>
        </div>
      );
    }

    return this.props.children;
  }
}
