const totalPop=200;
var obstacles=[];
var allHumans=[];
var activeHumans=[];

function setup()
{
  createCanvas(500, 400);
  tf.setBackend('cpu');
  noStroke();

  obstacles.push(new Obstacle());
  for(var i=0; i<totalPop; i++)
  {
    allHumans[i]=new Human();
    activeHumans[i]=new Human();
  }
}
function draw()
{
  background(0);

  if(frameCount%70==0)
  {
    obstacles.push(new Obstacle());
  }

  for(var i=obstacles.length-1; i>=0; i--)
  {
    obstacles[i].show();
    obstacles[i].update();
    if(obstacles[i].offScreen())
    {
      obstacles.splice(i,1);
    }
    for(var j=0; j<activeHumans.length; j++)
    {
      if(obstacles[i].hits(activeHumans[j]))
      {
        activeHumans.splice(j,1);
        j--;
      }
    }
  }
  for(var i=activeHumans.length-1; i>=0; i--)
  {
    activeHumans[i].show();
    activeHumans[i].update();
    activeHumans[i].think(obstacles);
  }

  if(activeHumans.length==0)
  {
    nextGeneration();
  }
}