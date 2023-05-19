
const sliderImage=["1.jpg","2.jpg","3.jpg"]
let currentImage=0;

const sliderElement=document.getElementById("SlideImage")
function nextSlide(){
    if(currentImage<sliderImage.length-1){
        currentImage++
    }
    else{
        currentImage=0;

    }
    sliderElement.src="images/slider/"+sliderImage[currentImage]
    
}

function previousSlide(){
    if(currentImage==0){
        currentImage=sliderImage.length-1;

    }
    else{
        currentImage--;

    }
    sliderElement.src="images/slider/"+sliderImage[currentImage]
}


    setInterval( nextButton,1000)


    
