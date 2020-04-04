import React from 'react';
import Peer from 'peerjs';
import Video from './Components/video';

class VideoCall extends React.Component {

  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
    this.startVideo = this.startVideo.bind(this);

    this.state = {
      status: 'loading',
      peer: Object,
      peerId: '',
      peers: Array
    };

    this.state.peer = new Peer();
    this.state.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on('open', () => {
        console.log('open');
      });
      conn.on('close', () => {
        console.log('close');
      });
    });

  }

  componentDidMount() {
    this.startVideo();
  }

  startVideo() {

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then( (stream) => {
          this.myVideo.current.srcObject = stream;
          this.myVideo.current.play();
        })
        .catch( (error) => {
          this.state.status = 'Error loading video.';
        });
    }

  }

  render() {
    return (
        <div>
            Status: {this.state.status} | 
            Your Video ID: {this.state.peerId}<br />
            Send this link to join your call: peervideo.nl/join#{this.state.peerId}.<br />
            <video ref={this.myVideo}></video>
        </div>
    )
  }
}

export default VideoCall;