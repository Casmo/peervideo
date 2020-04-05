import React from 'react';

class Video extends React.Component {

  constructor(props) {
    super(props);

    this.video = React.createRef();
  }

  componentDidMount() {
      this.video.current.srcObject = this.props.stream;
      this.video.current.play();
    // this.state.peer.connection.on('stream', (remoteStream) => {

    // });
  }

  render() {
    return (
        <div>
          {this.props.type}:
            <video className="bg-red-200" ref={this.video}></video>
        </div>
    )
  }
}

export default Video;