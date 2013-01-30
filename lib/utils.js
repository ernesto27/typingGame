var utils = {};

utils.captureMouse = function(element){
	var mouse = {x:0, y:0};

	element.addEventListener("mousemove", function(event){
		var x, y;
		if(event.pageX || event.pageY){
			x = event.pageX;
			y = event.pageY;
		}else{
			x = event.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollLeft +
				document.documentElement.scrollLeft;
		}

		x -= element.offsetLeft;
		y -= element.offsetLeft;

		mouse.x = x;
		mouse.y = y;

		/*console.log(mouse.x);
		console.log(mouse.y);*/
	},false);

	return mouse;
};


utils.captureTouche = function(element){
	var touch = {x:null, y:null, isPressed:false};

	element.addEventListener("touchstart",function(event){
		touch.idPressed = true;
	},false);

	element.addEventListener("touchend",function(event){
		touch.isPressed = false;
		touch.x = null;
		touch.y = null;
	},false);

	element.addEventListener("touchmove",function(event){
		var x,y, 
			touch_event = event.touches[0]; //first touch;

		if(touch_event.pageX || touch_event.pageY){
			x = touch_event.pageX;
			y = touch_event.pageY;
		}else{
			x = touch_event.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = touch_event.clientY + document.body.scrollLeft +
				document.documentElement.scrollLeft;
		}

		x -= offsetLeft;
		y -= offseTop;

		touch.x = x;
		touch.y = y;
	},false);

	return touch;
};

utils.colorToRGB = function(color,alpha){
	// if string format , convert to number;
	if(typeof color === "string" && color[0] === "#"){
		color = parseInt(color.slice(1), 16);
	}
	alpha = (alpha === undefined) ? 1 : alpha;

	//extract component values
	var r = color >> 16 & 0xff, 
    g = color >> 8 & 0xff, 
    b = color & 0xff, 
    a = (alpha < 0 ) ? 0 : ((alpha > 1) ? 1 : alpha);

    //use rgba if needed
    if(a === 1){
      return "rgb("+ r +","+ g +","+ b +")"; 
	} else { 
	  return "rgba("+ r +","+ g +","+ b +","+ a +")"; 
	} 
};

utils.parseColor = function(color, toNumber){
	if(toNumber === true){
		if(typeof color === 'number'){
			return (color | 0);
		}
		if(typeof color === 'string' && color[0] === '#'){
			color = color.slice(1);
		}
		return parseInt(color,16);
	}else{
		if(typeof color === 'number'){
			//make sure our hexadecimal number is padded out 
			color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
		}
		return color;

	}
};

utils.containsPoint = function(rect, x, y){
	return !(x < rect.x || x > rect.x + rect.width ||
			 y < rect.y || y > rect.y + rect.height);
}


utils.intersects = function (rectA, rectB) { 
  return !(rectA.x + rectA.width < rectB.x || 
           rectB.x + rectB.width < rectA.x || 
           rectA.y + rectA.height < rectB.y || 
           rectB.y + rectB.height < rectA.y); 
}; 


//radians = degrees * Math.PI / 180 
//degrees = radians * 180 / Math.PI 
//degrees = radians * 180 / Math.PI 


if (!window.requestAnimationFrame) { 
  			window.requestAnimationFrame = 
  					(window.webkitRequestAnimationFrame || 
                    window.mozRequestAnimationFrame || 
                    window.oRequestAnimationFrame || 
                    window.msRequestAnimationFrame || 
                    function (callback) { 
                         return window.setTimeout(callback, 1000/60); 
                     }); 
} 


if (!window.cancelRequestAnimationFrame) { 
  window.cancelRequestAnimationFrame = (window.cancelAnimationFrame || 
                                        window.webkitCancelRequestAnimationFrame || 
                                        window.mozCancelRequestAnimationFrame || 
                                        window.oCancelRequestAnimationFrame || 
                                        window.msCancelRequestAnimationFrame || 
                                        window.clearTimeout); 
} 