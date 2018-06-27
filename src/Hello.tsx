import * as React from "react";
import Tooltip from './Tooltip'

interface Props {
  title: string;
}

interface State {
  selectedText: string;
  top: number;
  left: number;
}

export default class extends React.Component<Props, State> {
  state: State = { selectedText: null, top: null, left: null };

  clearTooltip = e => {
    this.setState({
      selectedText: null,
      top: null,
      left: null
    })
  }

  handleSelect = e => {
    const sel = window.getSelection();
    const text = sel.toString();
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (text && text.length) {
      this.setState({
        selectedText: sel.toString(),
        top: rect.top,
        left: rect.left + rect.width / 2
      });
    } else {
      this.clearTooltip();
    }
  };

  render() {
    const { title } = this.props;
    return (
      <div onMouseUp={this.handleSelect}>
        <h1>{title}</h1>
        <p>Just select text and get GIFs!</p>
        <p>Cats 😻, dogs 🐶,unicorns 🦄 and lions 🦁!</p>
        {this.state.selectedText && (
          <Tooltip selectedText={this.state.selectedText} top={this.state.top} left={this.state.left} onDismiss={this.clearTooltip} />
        )}
      </div>
    );
  }
}
