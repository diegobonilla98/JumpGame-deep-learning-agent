function resetGame()
{
	obstacles=[];
}
function nextGeneration()
{
	resetGame();
	normalizeFitness(allHumans);
	activeHumans=generate(allHumans);
	allHumans=activeHumans.slice();
}
function generate(old)
{
	var newHumans=[];
	for(var i=0; i<old.length; i++)
	{
		var human=poolSelection(old);
		newHumans[i]=human;
	}
	return newHumans;
}
function normalizeFitness(humans)
{
	var sum=0;
	for(var i=0; i<humans.length; i++)
	{
		humans[i].score=pow(humans[i].score);
		sum+=humans[i].score;
	}

	for(var i=0; i<humans.length; i++)
	{
		humans[i].fitness=humans[i].score/sum;
	}
}
function poolSelection(humans)
{
	var index=0;
	var r=random(1);

	while(r>0)
	{
		r-=humans[index].fitness;
		index++;
	}
	index--;

	return humans[index].copy();
}