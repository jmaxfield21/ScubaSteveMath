function playVideo(){
    var video = document.getElementById('credits');
    video.play();
    video.addEventListener('ended',function(){
        window.location = '/welcome';
    });
}