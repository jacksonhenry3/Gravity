function earthMoon(data)
{
	var Mearth   = 5.972*Math.pow(10,24),// in kg
		Rearth   = zeroVector(2),// in m
		Vearth   = new vector([1045/50,0]),// in m/s
		RadEarth = 6371000,// in m
		earth    = new body(Rearth,Vearth,Mearth,RadEarth,1);

	var	Mmoon    = 7.34767309 *Math.pow(10,22),// in kg
		Rmoon    = new vector([0,384400000]),//in m
		Vmoon    = new vector([-49*1045/50,0]),// in m/s
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

function solarSystem(data)
{
	var Msun   = 1.989*Math.pow(10,30),
		Rsun   = zeroVector(2),// in m
		Vsun   = zeroVector(2),// in m/s
		Radsun = 695800000, //in m
		sun    = new body(Rsun,Vsun,Msun,Radsun,1)

	var Mmercury   = .33*Math.pow(10,24),// in kg
		Rmercury   = new vector([57.9*Math.pow(10,9),0]),// in m
		Vmercury   = new vector([0,47.4*Math.pow(10,3)]),// in m/s
		Radmercury = 4879/2*Math.pow(10,3)// in m
		mercury    = new body(Rmercury,Vmercury,Mmercury,Radmercury,1);

	var Mvenus   = 4.87*Math.pow(10,24),// in kg
		Rvenus   = new vector([108.2*Math.pow(10,9),0]),// in m
		Vvenus   = new vector([0,35.0*Math.pow(10,3)]),// in m/s
		Radvenus = 12104/2*Math.pow(10,3)// in m
		venus    = new body(Rvenus,Vvenus,Mvenus,Radvenus,1);

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

	var Mmars   = .642*Math.pow(10,24),// in kg
		Rmars   = new vector([227.9*Math.pow(10,9),0]),// in m
		Vmars   = new vector([0,24.1*Math.pow(10,3)]),// in m/s
		Radmars = 6792/2*Math.pow(10,3)// in m
		mars    = new body(Rmars,Vmars,Mmars,Radmars,1);

	var Mjupiter   = 1898*Math.pow(10,24),// in kg
		Rjupiter   = new vector([778.6*Math.pow(10,9),0]),// in m
		Vjupiter   = new vector([0,13.1*Math.pow(10,3)]),// in m/s
		Radjupiter = 142984/2*Math.pow(10,3)// in m
		jupiter    = new body(Rjupiter,Vjupiter,Mjupiter,Radjupiter,1);

	var Msaturn   = 568*Math.pow(10,24),// in kg
		Rsaturn   = new vector([1433.5*Math.pow(10,9),0]),// in m
		Vsaturn   = new vector([0,9.7*Math.pow(10,3)]),// in m/s
		Radsaturn = 120536/2*Math.pow(10,3)// in m
		saturn    = new body(Rsaturn,Vsaturn,Msaturn,Radsaturn,1);

	var Muranus   = 86.8*Math.pow(10,24),// in kg
		Ruranus   = new vector([2872.5*Math.pow(10,9),0]),// in m
		Vuranus   = new vector([0,6.8*Math.pow(10,3)]),// in m/s
		Raduranus = 51118/2*Math.pow(10,3)// in m
		uranus    = new body(Ruranus,Vuranus,Muranus,Raduranus,1);

	var Mneptune   = 102*Math.pow(10,24),// in kg
		Rneptune   = new vector([4495.1*Math.pow(10,9),0]),// in m
		Vneptune   = new vector([0,5.4*Math.pow(10,3)]),// in m/s
		Radneptune = 49528/2*Math.pow(10,3)// in m
		neptune    = new body(Rneptune,Vneptune,Mneptune,Radneptune,1);


	//add earth, moon and sun to the data
	data.push(sun)
	data.push(mercury)
	data.push(venus)
	data.push(earth)
	data.push(moon)
	data.push(mars)
	data.push(jupiter)
	data.push(saturn)
	data.push(uranus)
	data.push(neptune)

	

	return(data)
}