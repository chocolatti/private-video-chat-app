// This is a test of the p5LiveMedia webrtc library and associated service.
// Open this sketch up 2 times to send video back and forth

let myVideo;
let otherVideo = [];
let p5l;
let myAudio;
let myCanvas;

let constraints = {audio: true, video: true};

connect.addEventListener('click', function(e) {
    connectionStuff(roomName.value)
})

function setup() {
  myCanvas = createCanvas(400, 400);
    myCanvas.parent('local');
}

function connectionStuff(roomName) {
    myVideo = createCapture(VIDEO);
    myVideo.hide();

    let constraints = {
      audio: true,
      video: false};
    
    myAudio = createCapture(constraints, function(stream) {
      let canvasStream = myCanvas.elt.captureStream(15);
      let audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        canvasStream.addTrack(audioTracks[0]);
      }
      console.log(canvasStream);
      p5l = new p5LiveMedia(this, "CAPTURE", canvasStream, roomName);
      p5l.on('stream', gotStream);
    });

    myAudio.elt.muted = true;
    myAudio.hide();
}


function draw() {
  background(220);
  stroke(255);
  if (myVideo != null && myVideo.elt.readyState >= 2) {
    image(myVideo,0,0,width,height);
    text("My Video", 10, 20);
  }
   
}

// We got a new stream!
function gotStream(stream, id) {
  console.log("Got a new stream from id: " + id);

  if (otherVideo.length >= 2) {
    stream.remove();
    console.log("both remote vide slots are full, ignoring incoming stream");
    return;
  }

  let slot;
  if (otherVideo.some(person => person.slot === 'remote1')) {
    slot = 'remote2';
  } else {
    slot = 'remote1';
  }
  
  let container = document.getElementById(slot);

  stream.parent(container);
  stream.elt.autoplay = true;
  stream.elt.playsInline = true;
  stream.elt.muted = false;

  otherVideo.push({id: id, stream: stream, slot: slot});
  console.log("Partcipant added in: " + slot);
}