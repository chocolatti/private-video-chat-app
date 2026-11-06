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
<<<<<<< HEAD
    myVideo = createCapture(constraints, 
      function(stream) {
        let p5l = new p5LiveMedia(this, "CAPTURE", stream, roomName);
        p5l.on('stream', gotStream);
      }
    );  
    myVideo.muted = true;     
=======
    myVideo = createCapture(VIDEO);
>>>>>>> a358645 (change it to three people and edit the layout)
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


  if (otherVideo != null && otherVideo.length >= 2) {
    stream.remove();
    console.log("Already have 2 streams, ignoring this one");
    return;
  }

  let slot = otherVideo == null ? 'remote1' : 'remote2';
  let container = document.getElementById(slot);
  container.innerHTML = '';

  otherVideo = otherVideo || [];
  otherVideo.push(stream);
  stream.parent(container);
  stream.elt.autoplay = true;
  stream.elt.playsInline = true;
  stream.elt.muted = false;
}