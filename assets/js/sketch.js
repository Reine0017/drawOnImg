window.addEventListener("load", () => {
	const canvas = document.querySelector("#canvas");
	const clearButton = document.querySelector("#clear");
	const blackButton = document.querySelector("#black");
	const whiteButton = document.querySelector("#white");
	const ctx = canvas.getContext('2d');

	const img = new Image();
	img.src = "assets/images/IMG_1427.jpg";

	img.onload = () => {
		const [img_scaled_width, img_scaled_height] = drawImageToScale(img, ctx);
		canvas.width = img_scaled_width;
		canvas.height = img_scaled_height;
		window.addEventListener('resize', drawImageToScale(img,ctx));
	}

	// eventListeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", endPosition);
	canvas.addEventListener("mousemove", draw);

	let painting = false;

	function startPosition(e){
		painting = true;
		draw(e);
	}

	function endPosition(){
		painting = false;
		ctx.beginPath();
	}

	function draw(e){
		if (!painting)
			return;
		ctx.lineWidth = 3;
		ctx.lineCap = 'round';
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}

	clearButton.addEventListener('click', () => clearCanvas(img, ctx, canvas.width, canvas.height));
	blackButton.addEventListener('click', () => ctx.strokeStyle = "#000000");
	whiteButton.addEventListener('click', () => ctx.strokeStyle = "#ffffff");

});

function drawImageToScale(img, ctx){
	const img_width = 650;
	const scaleFactor = img_width / img.width;
	const img_height = img.height * scaleFactor;
	ctx.drawImage(img, 0 , 0, img_width, img_height);
	return [img_width, img_height];
}

function clearCanvas(img, ctx, img_scaled_width, img_scaled_height){
	ctx.clearRect(0, 0, img_scaled_width, img_scaled_height);
	drawImageToScale(img,ctx);
}
