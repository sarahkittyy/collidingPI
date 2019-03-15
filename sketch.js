let box1;
let box2;
let collisions;

let p;
let slider;
let lastval = 1;

let digits = 1;
let timeStep;

function setup()
{
	createCanvas(600,600);
	reset();
	
	createP('');
	slider = createSlider(1, 12, 1, 1);
	p = createP(slider.value());
}

function reset()
{
	timeStep = 5*pow(10, max(1, digits-2));
	box1 = new Box(300, 2*digits, pow(100, digits - 1), -5 / timeStep);
	box2 = new Box(100, 1, 1, 0);
	collisions = 0;
	textSize(30);
	textAlign(CENTER);
}

function draw()
{
	background(127);
	fill(50);
	rect(0, 450, width, height - 150);
	
	for(i = 0; i < timeStep; ++i)
	{
		box1.update();
		box2.update();
		
		if(box1.collide(box2))
		{
			const v1 = box1.bounce(box2);
			const v2 = box2.bounce(box1);	
			box1.v = v1;
			box2.v = v2;
			collisions++;
		}
		if(box2.x < 0)
		{
			box2.v *= -1;
			collisions++;
		}
	}
		
	box1.show(box2.w, 0);
	box2.show(0, 1);
	
	p.html('Digits: ' + slider.value());
	if(lastval != slider.value())
	{
		lastval = slider.value();
		digits = slider.value();
		reset();
		return;
	}
	
	fill(180);
	textSize(30);
	text('collisions: ' + collisions, width * 0.5, height * 0.2);
	textAlign(LEFT, TOP);
	text('m1 = ' + box1.m.toExponential(1) + ' kg', 0, 0);
	text('m2 = ' + box2.m.toExponential(1) + ' kg', 0, height*0.1);
	textAlign(CENTER, CENTER);
	if(box1.v > box2.v && box1.v > 0 && box2.v > 0)
	{
		text('pi ~= ' + collisions / pow(10, digits-1), width * 0.5, height*0.3);
	}
}