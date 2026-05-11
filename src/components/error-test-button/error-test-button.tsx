import { Component } from 'react';
import { Button } from '../shared/button/button';

interface State {
  shouldThrowError: boolean;
}

export class ErrorTestButton extends Component {
  state: State = {
    shouldThrowError: false,
  };

  handleClick = () => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('Test application error');
    }

    return (
      <Button className="button--error" onClick={this.handleClick}>
        Throw error
      </Button>
    );
  }
}
