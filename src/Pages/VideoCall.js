import React from 'react';
import Peer from 'peerjs';
import Video from '../Components/Video';

class VideoCall extends React.Component {

  constructor(props) {
    super(props);
    this.startVideo = this.startVideo.bind(this);

    this.state = {
      status: 'loading',
      peer: Object,
      peerId: '',
      peers: [
      ]
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
          let peers = this.state.peers;
          peers.push({
            stream: stream
          });
          this.setState({
            peers: peers
          });
          console.log(this.state.peers);
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
            {this.state.peers.map((peer, index) => {
                    return <div>test<Video stream={peer.stream} key={ index }></Video>bcd</div>;
                  })}
        </div>
    )
  }
}

export default VideoCall;