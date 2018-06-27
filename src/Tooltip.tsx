import * as React from "react";

const GIPHY_API_KEY = "4Z15yuylYr1bEQkpJiBb3dd4ffvUfs5v";

interface Props {
  selectedText: string;
  top: number;
  left: number;
}

interface State {
  url: null;
}

export default class extends React.Component<Props, State> {
  state: State = { url: null };

  constructor(props: Props) {
    super(props);
    this.fetchImage();
  }

  fetchImage() {
    const url = new URL("https://api.giphy.com/v1/gifs/search");
    const params = {
      api_key: GIPHY_API_KEY,
      q: this.props.selectedText,
      limit: 25,
      offset: 0,
      rating: "PG-13",
      lang: "en"
    };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const images = data.data;
        const embedUrl =
          images[Math.floor(Math.random() * images.length)].embed_url;
        console.log(embedUrl);
        this.setState({
          url: embedUrl
        });
      })
      .catch(e => {
        console.error("Error!!", e);
      });
  }

  render() {
    return [
      <div className="backdrop" onMouseUp={this.props.onDismiss} />,
      <div
        className="tooltip-outer"
        style={{ left: this.props.left, top: this.props.top }}
      >
        <div className="tooltip-inner">
          <div className="tooltip">
            <iframe src={this.state.url} />
          </div>
          <div className="tooltip-bub" />
        </div>
      </div>
    ];
  }
}
