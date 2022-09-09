let media;
let videoTag;




async function setRemoteDescription(peerConnection,answer){
const remoteDesc = new RTCSessionDescription(answer);
await peerConnection.setRemoteDescription(remoteDesc);
}

async function startStream(userMediaStream,peerConnection){
    userMediaStream.getTracks()
    .forEach(track => peerConnection.addTrack(track, userMediaStream));
    // peerConnection.setRemoteDescription()

}
async function main () {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    const localVideo = document.querySelector('#video')
    localVideo.srcObject = localStream;
    const pc = new RTCPeerConnection({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]});
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log(JSON.stringify( pc.currentLocalDescription) );
    await startStream(localStream,pc)
    await setRemoteDescription(pc);

}
main();

