var  G          = -6.67*Math.pow(10,-11), //m^3/(kg s^2)
	 mass       = 7.34767309 *Math.pow(10,22), // kg
	 Speedmax   = 1000, //in m/s
	 properTime = 0;

function update_position(data)
{
	var h = 500000;
	for (var i = data.length - 1; i >= 0; i--){
		var d   = data[i],
			k1  = gravityAcceleration(d.r,i),
			k2  = gravityAcceleration(d.r.add(k1.scale(h/2)),i),
			k3  = gravityAcceleration(d.r.add(k2.scale(h/2)),i),
			k4  = gravityAcceleration(d.r.add(k3.scale(h)),i);
		
		d.v = d.v.add(k1.add(k2.scale(2).add(k3.scale(2).add(k4))).scale(h/6))
		d.r = d.r.add(d.v.scale(h))
	};
	return(data)
};

function gravityAcceleration(r,index)
{
	var a = zeroVector(2);
	for (var i = data.length - 1; i >= 0; i--)
	{
		if (i != index)
		{
			var r2 = data[i].r,
			    dr = r.subtract(r2),
				 m2 = data[i].m,
			    av = dr.norm().scale(G*m2/(Math.pow(dr.magnitude(),2)));
			
			a = a.add(av)         
		};
	};
   return(a)
};

function potential (r,data) {
	p = 0
	for (var i = data.length - 1; i >= 0; i--) {
		d = data[i]
		p=p+d.m/(d.r.subtract(r).magnitude())
	};
	p*=G
	return(p)
}
