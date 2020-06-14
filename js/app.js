let width = 500,
    height = 0,
    filter = 'none',
    streaming = false

//DOM Elements

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos')
const photoButton = document.getElementById('photo-button')
const clearButton = document.getElementById('clear-button')
const photoFilter = document.getElementById('photo-filter')
const flip = document.getElementById('flip')

let get_user_media = {video: { facingMode: (front? "user" : "environment")  }};

//Get Media Stream
let front  = true;
flip.addEventListener('click',function(){
    front = !front;
    console.log('flip')
    get_user_media = {video: { facingMode: (front? "user" : "environment")  }};
})

navigator.mediaDevices.getUserMedia(get_user_media)
    .then(function(stream){
        //Link to the video Source
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err){
        console.log(`Error : {err}`);
    });

//Play When Ready
video.addEventListener('canplay',function(e){

    if(!streaming){
        //Set video canvas height
        height = video.videoHeight/(video.videoWidth/width);
        video.setAttribute('width',width);
        video.setAttribute('height',height)
        canvas.setAttribute('width',width)
        canvas.setAttribute('height',height)

        streaming = true;
    }

    e.preventDefault();
},false);

photoFilter.addEventListener('change',function(e){
    filter = e.target.value;
    video.style.filter = filter;
    e.preventDefault();
});

photoButton.addEventListener('click',function(e){
    takePicture();
    e.preventDefault();
},false);


//take picture from canvas
function takePicture(){
    const context = canvas.getContext('2d');
    if(width && height){
        canvas.width = width;
        canvas.height = height;
        //Draw the picture on the canvas
        context.drawImage(video,0,0,width,height);
        //Create an image from canvas
        const imgurl = canvas.toDataURL('image/png');
        //create image element
        const img = document.createElement('img');
        //Set image source
        img.setAttribute('src',imgurl);
        //Set image filter
        img.style.filter = filter;
        //Add image to photos
        photos.appendChild(img);
    }
}

clearButton.addEventListener('click',function(){
    //Clear all the photos
    photos.innerHTML = '';
    //changethe filter back to normal
    filter = 'none';
    //Set video filter to none
    video.style.filter = filter;
    photoFilter.selectedIndex = 0;
});

