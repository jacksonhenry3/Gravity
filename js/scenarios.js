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

function earthMoonSun(data)
{
	var Msun = 1.989*Math.pow(10,30),
		Rsun   = zeroVector(2),// in m
		Vsun   = zeroVector(2),// in m/s
		Radsun = 695800000, //in m
		sun    = new body(Rsun,Vsun,Msun,Radsun,1)

	var Mearth   = 5.972*Math.pow(10,24),// in kg
		Rearth   = new vector([149.5*Math.pow(10,9),0]),// in m
		Vearth   = new vector([0,29780]),// in m/s
		RadEarth = 6371000,// in m
		earth    = new body(Rearth,Vearth,Mearth,RadEarth,1);

	var	Mmoon    = 7.34767309 *Math.pow(10,22),// in kg
		Rmoon    = Rearth.add(new vector([384400000,0])),//in m
		Vmoon    = Vearth.add(new vector([0,-1045])),// in m/s
		Radmoon  = 1737400;// in m
		moon     = new body(Rmoon,Vmoon,Mmoon,Radmoon,1);

	//add earth, moon and sun to the data
	data.push(sun)
	data.push(earth)
	data.push(moon)

	return(data)
}