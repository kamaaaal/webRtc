async function main () {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    const localVideo = document.querySelector('#video1')
    localVideo.srcObject = localStream;
    const pc = new RTCPeerConnection({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]});
    const offer = await pc.createOffer({'offerToReceiveAudio':true,'offerToReceiveVideo':true});
    pc.addEventListener('icecandidate', event => {
        // console.log('iceCandidate');
        if (event.candidate) {
            // signalingChannel.send({'new-ice-candidate': event.candidate});
            console.log(JSON.stringify(event.candidate));
        }
    });
    await pc.setLocalDescription(offer);
    console.log(JSON.stringify( offer ));
    const answer = JSON.parse(prompt('answer'));
    const remoteDesc = new RTCSessionDescription(answer);
    await pc.setRemoteDescription(remoteDesc);
    
    pc.addEventListener('track', async (event) => {
        console.log(event.streams,"stremas");
        const [remoteStream] = event.streams;
        remoteVideo.srcObject = remoteStream;
    });

    pc.ontrack =  async (event) => {
        console.log(event.streams,"stremas");
        const [remoteStream] = event.streams;
        remoteVideo.srcObject = remoteStream;
    };

    // const localStream = await getUserMedia({vide: true, audio: true});
    // const peerConnection = new RTCPeerConnection(iceConfig);
    localStream.getTracks().forEach(track => {
        
        pc.addTrack(track, localStream);
    });

    const remoteVideo = document.querySelector('#video2');

}
main();