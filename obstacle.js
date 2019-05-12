class Obstacle
{
	constructor()
	{
		this.x=width;
		this.tam=random(20, 60);
		this.w=10;
		this.y=height-this.tam;
		this.speed=4;
	}
	show()
	{
		fill(255);
		rect(this.x, this.y, this.w, this.tam);
	}
	hits(human)
	{
		if(human.x+human.w>this.x && human.x<this.x+this.w && human.y+human.h>this.y)
		{
			return true;
		}
		else return false;
	}
	update()
	{
		this.x-=this.speed;
	}
	offScreen()
	{
		if(this.x<-this.w)return true;
		else return false;
	}
}