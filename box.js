class Box
{
	constructor(x, s, m, v)
	{
		s *= 20;
		this.x = x;
		this.w = s;
		this.h = s;
		this.y = 450 - s;
		
		this.m = m;
		this.v = v;
	}
	
	show(margin, id)
	{		
		const newx = constrain(this.x, margin, this.x);
		
		fill(127,127,255);
		rect(newx, this.y, this.w, this.h);
		
		fill(0);
		textSize(this.h / 2);
		text(id+1, newx + this.w / 2, this.y + this.h / 2);
	}
	
	collide(other)
	{
		return (this.x < other.x + other.w && this.x + this.w > other.x);
	}
	
	bounce(other)
	{
		const sumM = this.m + other.m;
		return ((this.m - other.m)/(sumM) * this.v) + ((2*other.m)/(sumM))* other.v;
	}
	
	update()
	{
		this.x += this.v;
	}
}