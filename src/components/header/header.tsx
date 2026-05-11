import { Component, type ReactNode } from 'react';
import './header.scss';

interface Props {
  children?: ReactNode;
}

export class Header extends Component<Props> {
  render() {
    return <header className="app-header">{this.props.children}</header>;
  }
}
