	(function(){
		//var canvas = document.getElementById("canvas"),
		var canvas  = $("#canvas")[0];	
			context = canvas.getContext("2d"),
			canvasWidth = canvas.width;
			canvasHeight = canvas.height;
		;
		
		balls = [];
		var numBalls = 6;
		var shoot = false;
		var box = new Box(8,55);
		var indexWord = 0;
		var userInput = "";
		var inputType = $("#userInput");
		var disabledInput = false;
		var level = 1;
		var playGame = false;

		

		var words = ["break","catch","default","else","finally","if","new","this"];
		


		box.lineWidth = 0;
		box.x = canvasWidth / 2;
		box.y = canvasHeight - 30;
		box.vy = 12;


		// start game button listener
		$(".start-game-button").on("click", function(){

			$("#game-intro").hide();
			$("#canvas").add(inputType).show();
			playGame = true;

			drawFrame();
			inputType.focus();
		})


	
		

		function createBall(arrayWords,vy){

			for(var i = 0; i < numBalls ; i++ ){
				ball = new Ball();
				ball.color = "#1d00ff";
				ball.radius = Math.random() * 10 + 8;
				ball.x  = Math.random() * canvas.width - ball.radius;
				//ball.y = 100;
				ball.y = Math.random() * 25 - 5;
				ball.vx = Math.random() * 2 -1;
				ball.vy = vy;
				//ball.vy = 10;
				balls.push(ball); 
				context.font = "15px Verdana";
				context.fillText(arrayWords[i], ball.x, ball.y)
			}


		}

		function resetGame(text){
			playGame = false;
			$("#canvas").add(inputType).hide();
			$("#game-intro").show().find("h1").text(text);
			level = 1;
			balls = [];
			words = ["break","catch","default","else","finally","if","new","this"];
			createBall(words,0.3);
		}

		createBall(words,0.3);


		function draw(ball){
			ball.x += ball.vx;
			ball.y += ball.vy;



			// check boundaries
			if(ball.x + ball.radius > canvasWidth){
				ball.x -= ball.vx;
				ball.vx = -ball.vx;	
			}

			if(ball.x < 0 + ball.radius ){
				ball.x += ball.vx;
				ball.vx *= +ball.vx;

			}

			// check game over
			if(ball.y + ball.radius> canvasHeight){
				window.cancelRequestAnimationFrame(drawFrame, canvas);
				resetGame("Game over")
				return;

			}

			

			ball.draw(context)
		}

		document.addEventListener("keydown", function(e){

			if(disabledInput){
				e.preventDefault();
			}

		});

		

		function drawFrame(){
			if(playGame){
				window.requestAnimationFrame(drawFrame, canvas);
			}else{
				return;
			}
			
			context.clearRect(0,0,canvas.width,canvas.height);

			var i = balls.length;
	
			if(level == 5 ){

				window.cancelRequestAnimationFrame(drawFrame, canvas);
				resetGame("You win!!")
				return;
			}


			if(i == 0){
				level++;
				
				switch(level){ 
					case 2:
						words = ["bool","case","die","echo","function","in","return","with"]
						createBall(words,0.5);						
					break;
					case 3:
						words = ["base","continue","delete","ease","firefox","instance","remake","void"]
						createBall(words,0.7);						
					break;
					case 4:
						words = ["backbone","cobol","do","emacs","find","while","rhino","vim"]
						createBall(words,0.8);						
					break;
					case 4:
						words = ["boots","case","dojo","eval","foreach","wrap","route","void"]
						createBall(words,1);
						level = 5;						
					break;
					
				
				}

			
			}

			while( i-- ){
				context.font = "15px Verdana";
				context.fillText(words[i], balls[i].x + balls[i].radius + 1,balls[i].y)

				if(inputType.val() == words[i].charAt(0)){
					balls[i].color = "red";
				}

				draw(balls[i])
				

				
			
				if(inputType.val() === words[i]){ 
	
					window.cancelRequestAnimationFrame(drawFrame);
					shoot = true;
					disabledInput = true;
		
					if(shoot){

						box.y -= box.vy;
						box.x = balls[i].x;
						box.draw(context);

						var dX = box.x - balls[i].x;
						var dY = box.y - balls[i].y;
						var distance = Math.sqrt((dX*dX)+(dY*dY));

						
						if(distance < box.width){
							balls.splice(i,1);

							words.splice(i,1);
							inputType.val("")
							disabledInput = false;
							shoot = false;
							box.y = canvasHeight - 30;

						}

					}

				}

			}
	
		}

	
	


	})()