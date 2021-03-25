status="";
objects=[];
song="";


function preload(){
    song=loadSound("peace.mp3");

}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";

}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){

        r=random(255);
        g=random(255);
        b=random(255);

       objectDetector.detect(video, gotResult); 
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML= "status: objectDetected";
            document.getElementById("number_of_object").innerHTML="the Number of Detected Objects are : " + objects.length;


            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("number_of_object").innerHTML="Baby Discovered. Traumatise it?"
                song.stop();

            }
            else{
                document.getElementById("number_of_object").innerHTML="Baby not Discovered. Suspicious?"
                song.play();
            }
        }
    }
      }

function modelLoaded(){
   console.log("modelLoaded");
   status=true;
      
}

function gotResult(error, results){
   if(error){
       console.log(error);
   }
   else{
       console.log(results);
       objects=results;

   }

}