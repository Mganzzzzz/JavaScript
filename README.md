<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>贪吃蛇</title>
        <link rel="stylesheet" href="snake-style.css">
    </head>
    <body>
        <div class="interface">
            <canvas id="myCanvas" width="500" height="500" style="border:1px solid #c3c3c3;">
            Your browser does not support the canvas element.
            </canvas>
        </div>

        <audio controls preload="auto" id="mouseClick">
        	<source src="click.wav" controls></source>

        	Your browser isn't invited for super fun audio time.
        </audio>

        <audio controls preload="auto" id="endGame">
        	<source src="end.wav" controls></source>

        	Your browser isn't invited for super fun audio time.
        </audio>

        <audio controls preload="auto" id="background" display=''>
        	<source src="background.mp3" autoplay></source>

        	Your browser isn't invited for super fun audio time.
        </audio>


        <script src=snake.js></script>
    </body>
</html>
