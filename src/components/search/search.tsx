import { Component, type ChangeEvent, type SubmitEvent } from 'react';
import './search.scss';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export class Search extends Component<SearchProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  public render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input
          className="search__field"
          value={this.props.value}
          type="text"
          placeholder="Search for characters..."
          onChange={this.handleChange}
        />
        <button className="search__button" type="submit">
          Search
        </button>
      </form>
    );
  }
}
