class Human
{
	constructor(brain)
	{
		this.x=70;
		this.w=10;
		this.h=20;
		this.y=height-this.h;

		this.gravity=0.8;
		this.lift=-25;
		this.velocity=0;

		this.score=0;
		this.fitness=0;

		if(brain instanceof NeuralNetwork)
		{
			this.brain=brain.copy();
			this.brain.mutate(0.2);
		}
		else this.brain=new NeuralNetwork(4,8,2);
	}
	copy()
	{
		return new Human(this.brain);
	}
	think(obs)
	{
		var closest=null;
		var record=Infinity;
		for(var i=0; i<obs.length; i++)
		{
			var diff=obs[i].x-this.x;
			if(diff>0 && diff<record)
			{
				record=diff;
				closest=obs[i];
			}
		}
		if(closest!=null)
		{
			var inputs=[];
			inputs[0]=map(closest.x, this.x, width, 0, 1);
			inputs[1]=map(closest.tam, 20, 60, 0, 1);
			inputs[2]=map(this.y, 0, 290, 0, 1);
			inputs[3]=map(this.velocity, -14, 8, 0, 1);

			var action=this.brain.predict(inputs);
			if(action[1]>action[0])
			{
				this.up();
			}
		}
	}
	show()
	{
		fill(255, 100);
		rect(this.x, this.y, this.w, this.h);
	}
	up()
	{
		if(this.y+this.h>=height)this.velocity+=this.lift;
	}
	update()
	{
		this.velocity+=this.gravity;
		this.y+=this.velocity;
		this.score++;
		if(this.y+this.h>height)this.y=height-this.h;
		this.velocity*=0.9;
	}
}