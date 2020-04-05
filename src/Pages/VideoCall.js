import React from 'react';
import Peer from 'peerjs';
import Video from '../Components/Video';

class VideoCall extends React.Component {

  peer;
  peers = [];

  constructor(props) {
    super(props);
    this.startVideo = this.startVideo.bind(this);
    this.connectPeer = this.connectPeer.bind(this);
    this.callPeer = this.callPeer.bind(this);

    this.peerIdInput = React.createRef();
    this.myVideo = React.createRef();

    this.state = {
      id: '',
      stream: '',
      streams: []
    }

  }

  componentDidMount() {
    this.startVideo();
    this.connect();
  }

  /**
   * Connect to the peer2peer server for an id
   */
  connect() {

    this.peer = new Peer();

    this.peer.on('open', (id) => {
      this.setState({
        id: id
      });
    });

    this.peer.on('call', (call) => {
      console.log('someone is calling, can I get the ID? ', call);
      let caller = this.findPeerById(call.peer);
      // this.createPeer(connection);
      this.answerPeer(call);
    });

    this.peer.on('connection', (dataConnection) => {
      console.log('connection', dataConnection);
      let newPeer = this.createPeer(dataConnection);
    });
  }

  /**
   * Creates a peer object
   * @param {*} dataConnection 
   */
  createPeer(dataConnection) {
    let peer = {
      id: dataConnection.peer,
      call: {}, // The call peer thing
      stream: '',
      dataConnection: dataConnection
    }

    dataConnection.on('data', (data) => {
      console.log('Received data: ', data, dataConnection);
    });
    dataConnection.on('open', () => {
      // dataConnection.send({
      //   type: 'call',
      //   peerId: this.state.id
      // });
      this.callPeer(dataConnection.peer);
    });

    this.peers.push(peer);
    return peer;
  }

  findPeerById(id) {
    for (let i = 0; i < this.peers.length; i++) {
      if (this.peers[i].id === id) {
        return this.peers[i];
      }
    }
    return null;
  }

  /**
   * Connect a peer to the host
   */
  answerPeer(call) {

    call.answer(this.state.stream);

    call.on('stream', (stream) => {
      // `stream` is the MediaStream of the remote peer.
      // Here you'd add it to an HTML video/canvas element.
      this.setState(prevState => ({
        streams: [...prevState.streams, stream]
      }));
    });

  }

  /**
   * Call another peer with a given peer id
   * @param {} peerId 
   */
  connectPeer(peerId) {
    peerId = peerId || this.peerIdInput.current.value;
    if (peerId === '') {
      return;
    }
    
    // Step one: Create a connection
    let peerConnection = this.peer.connect(peerId);
    this.createPeer(peerConnection);
  }

  /**
   * After a connection is established, we can call
   * @param {} peerId 
   */
  callPeer(peerId) {
    // Step one: Create a connection
    let peer = this.findPeerById(peerId);
    if (peer === null) {
      console.warn('peer not found.');
      return;
    }
    
    peer.call = this.peer.call(peerId, this.state.stream);
    // peer.call.on('stream', (stream) => {
    //   // `stream` is the MediaStream of the remote peer.
    //   // Here you'd add it to an HTML video/canvas element.
    //   // @todo do something with removing it as well.
    //   this.setState(prevState => ({
    //     streams: [...prevState.streams, stream]
    //   }));
    // });
  }

  startVideo() {

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then( (stream) => {
          this.setState({
            stream: stream
          });
          this.myVideo.current.srcObject = stream;
          this.myVideo.current.play();
          let peerId = window.location.hash.substr(1);
          if (peerId.length > 1) {
            this.peerIdInput.current.value = peerId;
            this.connectPeer();
          }
        })
        .catch( (error) => {
        });
    }

  }

  render() {
    return (
        <div>
            Your Video ID: {this.state.id}<br />
            Send this link to join your call: peervideo.nl/start#{this.state.id}.<br />
            <input type="text" ref={this.peerIdInput} placeholder="Friends Peer ID" />
            <button onClick={() => this.connectPeer()}>Call peer</button>
            <video ref={this.myVideo}></video>
            {this.state.streams.map((stream, index) => {
                    return <Video stream={stream} key={ index }></Video>;
                  })}
        </div>
    )
  }
}

export default VideoCall;