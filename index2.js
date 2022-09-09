async function main () {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    const localVideo = document.querySelector('#video1')
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
    
    pc.addEventListener('connectionstatechange', event => {
        if (pc.connectionState === 'connected') {
            // Peers connected!
            console.log('peers connectec');
        }
    });


    // const localStream = await getUserMedia({vide: true, audio: true});
    // const peerConnection = new RTCPeerConnection(iceConfig);
    localStream.getTracks().forEach(track => {
        
        pc.addTrack(track, localStream);
    });

    const remoteVideo = document.querySelector('#video2');

    pc.addEventListener('track', async (event) => {
        const [remoteStream] = event.streams;
        remoteVideo.srcObject = remoteStream;
    });

}
main();