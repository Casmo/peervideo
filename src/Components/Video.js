import React from 'react';

class Video extends React.Component {

  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  componentDidMount() {
    this.video.current.srcObject = this.props.stream;
    this.video.current.play();
  }

  render() {
    return (
        <div>aaa
            <video className="bg-red-200" ref={this.video}></video>
            bb
        </div>
    )
  }
}

export default Video;