var svg = document.querySelector('svg')
var hb = document.querySelector('#hb')
var car = document.querySelector('#car_image')
var speed = 12

var keyState;    
window.addEventListener('mousedown',function(e){
  keyState = true;
});    
window.addEventListener('touchstart',function(e){
  keyState = true;
});    

window.addEventListener('mouseup',function(e){
  keyState = false;
});
window.addEventListener('touchend',function(e){
  // e.preventDefault()
  keyState = false;
});
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
}, false);

svg.pauseAnimations()

function gameLoop() {
  if(keyState){
    svg.pauseAnimations()
  } else {
    svg.unpauseAnimations()
    var car = document.querySelector('#car_image')
    var car_deets = car.getBoundingClientRect()  
    hb.style.width = car_deets.width*.5 +'px'
    hb.style.height = car_deets.height*.5 +'px'
    hb.style.left = car_deets.left + (car_deets.width*.25) +'px'
    hb.style.top = car_deets.top + (car_deets.height*.25) +'px'

    if(document.querySelector('.road_block')){      
      var rb = document.querySelectorAll('.road_block')
      rb.forEach(function(elm){
        var rb_deets = elm.getBoundingClientRect()
        var hb_deets = hb.getBoundingClientRect()
        // console.log(car_deets.x)
        var ouch = !(rb_deets.right < car_deets.left || 
                     rb_deets.left > car_deets.right || 
                     rb_deets.bottom < car_deets.top || 
                     rb_deets.top > car_deets.bottom)
        if(ouch) { console.log('Ouch!')                   
                  if(elm.classList[1] == 'finish') {
                    document.querySelector('#start_btn').style.display = ''
                    document.querySelector('#start_btn p').innerHTML = 'Play again for a bit more of a challenge.'
                    if(speed <= 2) {
                      document.querySelector('#start_btn p').innerHTML = '<strong>Well played. You have mastered the roads.</strong>'
                    }
                    car.style.opacity = ''             
                  } else {
                    document.querySelector('#car_path').beginElement();
                  }
                 }
      })
    }
  }
  setTimeout(gameLoop, 1000/60);
}

document.querySelector('#start_btn').addEventListener('click', function() {
  this.style.display = 'none'
  car.style.opacity = '1'
  if(speed <= 2) {
    speed = 2
  } else {
    speed = speed - 2  
  }
  document.querySelector('#car_path').setAttribute('dur', speed + 's') 
  document.querySelector('#car_path').beginElement();  
  gameLoop();
})