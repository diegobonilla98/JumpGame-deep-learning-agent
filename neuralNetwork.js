class NeuralNetwork
{
	constructor(a,b,c,d)
	{
		if(a instanceof tf.Sequential)
		{
			this.model=a;
			this.input_nodes=b;
			this.hidden_nodes=c;
			this.output_nodes=d;
		}
		else
		{
			this.input_nodes=a;
			this.hidden_nodes=b;
			this.output_nodes=c;

			this.model=this.createModel();
		}
	}
	copy()
	{
		const modelCopy=this.createModel();
		const weights=this.model.getWeights();

		var weightCopy=[];
		for(var i=0; i<weights.length; i++)
		{
			weightCopy[i]=weights[i].clone();
		}
		modelCopy.setWeights(weightCopy);

		return new NeuralNetwork(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes);
	}
	mutate(rate)
	{
		tf.tidy(()=>{
			const weights=this.model.getWeights();
			const mutatedWeights=[]

			for(var i=0; i<weights.length; i++)
			{
				let tensor=weights[i];
				let values=tensor.dataSync().slice();
				let shape=weights[i].shape;
				for(var j=0; j<values.length; j++)
				{
					if(random(1)<rate)
					{
						let w=values[j];
						values[j]=w+randomGaussian();
					}
				}
				let newTensor=tf.tensor(values, shape);
				mutatedWeights[i]=newTensor;
			}
			this.model.setWeights(mutatedWeights);
		});
	}
	predict(inputs)
	{
		return tf.tidy(()=>{
			const xs=tf.tensor2d([inputs]);
			const ys=this.model.predict(xs);
			const outputs=ys.dataSync();
			return outputs;
		});
	}
	createModel()
	{
		const mode=tf.sequential();

		const hidden=tf.layers.dense({
		  units: this.hidden_nodes,
		  inputShape: [this.input_nodes],
		  activation: 'sigmoid'})
		mode.add(hidden);

		const output=tf.layers.dense({
		  units: this.output_nodes,
		  activation: 'softmax'});
		mode.add(output);
		return mode;
	}
}