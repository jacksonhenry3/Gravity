function earthMoon(data)
{
	var Mearth   = 5.972*Math.pow(10,24),// in kg
		Rearth   = zeroVector(2),// in m
		Vearth   = zeroVector(2),// in m/s
		RadEarth = 6371000,// in m
		earth    = new body(Rearth,Vearth,Mearth,RadEarth,1);

	var	Mmoon    = 7.34767309 *Math.pow(10,22),// in kg
		Rmoon    = new vector([0,384400000]),//in m
		Vmoon    = new vector([1045,0]),// in m/s
		Radmoon  = 1737400;// in m
		moon     = new body(Rmoon,Vmoon,Mmoon,Radmoon,1);

	//add earth and moon to the data
	data.push(earth)
	data.push(moon)

	return(data)
}