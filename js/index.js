console.log("Great, that you check console. I would love to work with such insightful person ;)");

var modal = document.getElementById('myModal');

var active = document.querySelector(".hover") || document.querySelector(".hoverlist li");

var lis = document.getElementsByTagName("li");
var len = lis.length;
for (var i=0; i < len; i++) {
    lis[i].addEventListener("mouseover",function(e) {
      active.classList.remove("hover");
      active=e.target.parentNode.parentNode;
      active.classList.add("hover");
      active.querySelector('input').focus();
    });
};
document.addEventListener("keydown", function (e){
    active.classList.remove("hover");
    if (e.which == 40){
        active = active.nextElementSibling || active;
    }else if (e.which == 38){
        active = active.previousElementSibling || active;
    } else if (typeof(active) != 'undefined' && active != null){
        active.classList.add("hover");
        active.querySelector('input').focus();
    }else{
        active = e.target;
    }
    active.classList.add("hover");
    active.querySelector('input').focus();

});

var aText = new Array(
    "My name is Krzysiek, my first computer was IBM 386 SLC. From that moment I am passionate about technologu. I am currently looking for new opportunities at the meeting point of technologu and people. If you like what I do, please write to me to me!",
    "No worries, I can develop web apps that look modern. I've finished bootcamp Javascript Developer: React at Coders Lab;)"
    );
var iSpeed = 30;
var iIndex = 0;
var iArrLength = aText[0].length;
var iScrollAt = 20;

var iTextPos = 0;
var sContents = '';
var iRow;

function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");

 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()", 500);
  }
 } else {
  setTimeout("typewriter()", iSpeed);
 }
}

var blinkF = document.getElementById('blinkFront')

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 32) {
        typewriter();
        blinkF.style.display = "none"
    } else if (event.keyCode == 113) {
        modal.style.display = "block"
    } else if  (event.keyCode == 27) {
        modal.style.display = "none"
    }
});

var touch = document.getElementById("touch");
touch.addEventListener('touchstart', function(event){
    typewriter();
    touch.style.display = "none";
}, false)
