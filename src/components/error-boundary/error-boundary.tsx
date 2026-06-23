import { Component, type ErrorInfo, type ReactNode } from 'react';
import './error-boundary.scss';
import { Button } from '../shared/button/button';
import { ErrorMessage } from '../shared/error-message/error-message';
import { useTranslations } from 'next-intl';

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

interface ErrorBoundaryInnerProps extends Props {
  message: string;
  reloadLabel: string;
  title: string;
}

class ErrorBoundaryInner extends Component<ErrorBoundaryInnerProps, State> {
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
          <ErrorMessage title={this.props.title} message={this.props.message}>
            <Button className="error-boundary__button" type="button" onClick={this.handleReload}>
              {this.props.reloadLabel}
            </Button>
          </ErrorMessage>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorBoundary({ children }: Props) {
  const t = useTranslations('errorBoundary');

  return (
    <ErrorBoundaryInner title={t('title')} message={t('message')} reloadLabel={t('reload')}>
      {children}
    </ErrorBoundaryInner>
  );
}
