// "use strict";
var data   = [],
	mass   = 5.972 *Math.pow(10,24), // in kg
	scale  = 384400000, // in meters
	radius = 6371000, //in meters
	G      = -6.67*Math.pow(10,-11), //m^3/(kg s^2)
	w      = document.body.scrollWidth,
	h      = document.body.scrollHeight,
	mpp    = 2*scale/h, // meters per pixel
	canvas = d3.select("#canvas"),
	svg    = canvas.append("svg:svg");

w_scale    = d3.scale.linear()
	.range([-w/h*scale, w/h*scale])
	.domain([0, w]);

h_scale = d3.scale.linear()
	.range([-scale, scale])
	.domain([h,0]);

svg.attr("width", w)
   .attr("height", h)
   .style("background-color",'#222')
   .style("pointer-events", "all")
   .on("click",add_data)


function add_data(){
	//get mouse coordinates and convert to graph coordinates
	var m = d3.mouse(this);
	x = w_scale(m[0])
	y = h_scale(m[1])
	r = new vector([x,y]) //in meters
	v = randomVector(2).scale(5000)  //in m/s
	v = new vector([0,0])
	data.push({r:r,v:v,m:mass,radius:radius})

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx",function(d){return(w_scale.invert(d.r.x))})
		.attr("cy",function(d){return(h_scale.invert(d.r.y))}) 
		.attr("r",10)
		.attr("fill",function(){return('#'+Math.floor(Math.random()*16777215).toString(16));});
}

update_position = function (){
	var h = 100.;
	for (var i = data.length - 1; i >= 0; i--){
		d   = data[i]
		k1 = gravityAcceleration(d.r,i)
		k2 = gravityAcceleration(d.r.add(k1.scale(h/2)),i)
		k3 = gravityAcceleration(d.r.add(k2.scale(h/2)),i)
		k4 = gravityAcceleration(d.r.add(k3.scale(h)),i)
		d.v = d.v.add(k1.add(k2.scale(2).add(k3.scale(2).add(k4))).scale(h/6))
		d.r = d.r.add(d.v.scale(h))
	};

	svg.selectAll("circle")
		.attr('cx',function(d){return(w_scale.invert(d.r.x))})
		.attr('cy',function(d){return(h_scale.invert(d.r.y))})
};

function gravityAcceleration(r,index)
	{
		Gaccel = new vector([0,0])
		for (var i = data.length - 1; i >= 0; i--) {
			if (i != index)
			{
				r2 = data[i].r
				dr = r.subtract(r2)
				m2 = data[i].m
				forceVector = dr.norm().scale(G*m2/(Math.pow(dr.magnitude(),2)))
				Gaccel = Gaccel.add(forceVector)
			};
		};
		a = new vector([0,0])
		return(pauli(a,r,index));
	};


function pauli(totalForce,r,index)
	{
		for (var i = data.length - 1; i >= 0; i--) {
			if (i != index)
			{
				r2 = data[i].r
				dr = r.subtract(r2)
				totalForce = totalForce.add(dr.norm().scale(100000000/Math.pow(dr.magnitude(),10)))
			};
		};

		console.log(totalForce)
		return(totalForce)
	}

setInterval(update_position,1);