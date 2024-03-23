const model = await tf.loadGraphModel('https://tfhub.dev/mediapipe/tfjs-model/face_detection/1/default/1');

const video = document.getElementById('video');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

async function detectFace() {
    const predictions = await model.estimateFaces(video);
    ctx.drawImage(video, 0, 0, 640, 480);

    if (predictions.length > 0) {
        predictions.forEach(prediction => {
            const start = prediction.topLeft;
            const end = prediction.bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];

            // Draw rectangle around the detected face
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 4;
            ctx.strokeRect(start[0], start[1], size[0], size[1]);
        });
    }

    requestAnimationFrame(detectFace);
}

detectFace();
