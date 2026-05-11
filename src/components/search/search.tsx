import { Component, type ChangeEvent, type SubmitEvent } from 'react';
import { Button } from '../shared/button/button';
import './search.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export class Search extends Component<Props> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input
          id="search"
          name="search"
          className="search__field"
          value={this.props.value}
          type="text"
          placeholder="Search for characters..."
          aria-label="Search characters"
          onChange={this.handleChange}
        />

        <Button type="submit">Search</Button>
      </form>
    );
  }
}
