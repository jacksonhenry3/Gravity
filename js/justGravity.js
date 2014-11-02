// "use strict";
var data   = [],
	mass   = 5.972*Math.pow(10,24), // in kg
	scale  = 384400000, // in meters
	radius = 6371000, //in meters
	G      = -6.67*Math.pow(10,-11), //m^3/(kg s^2)
	w      = document.body.scrollWidth,
	h      = document.body.scrollHeight,
    A      = 1, //Pauli scaling factor
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
   .attr('id','space')
   .style("background-color",'#222')
   .style("pointer-events", "all")
   .on("click",add_data) 

function add_data(){ 
	//get mouse coordinates and convert to graph coordinates
	var m = d3.mouse(this);
	x = w_scale(m[0])
	y = h_scale(m[1])
	r = new vector([x,y]) //in meters
	v = randomVector(2).scale(1000)  //in m/s
    v = new vector([0,0]) 
	data.push({r:r,v:v,m:mass,radius:radius})

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx",function(d){return(w_scale.invert(d.r.x))})
		.attr("cy",function(d){return(h_scale.invert(d.r.y))}) 
		.attr("r",10)
		.attr("fill","#7fffd4");
}

update_position = function (){
	var h = 1000.;
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
    updateField()
    window.requestAnimationFrame(update_position);
};

function gravityAcceleration(r,index)
	{
		var a = new vector([0,0]);
		for (var i = data.length - 1; i >= 0; i--) {
			if (i != index)
			{
				var r2 = data[i].r,
				    dr = r.subtract(r2);
                if (dr.magnitude()<scale/2 && dr.magnitude()>(mpp*20))
                {

				var    m2 = data[i].m,
				    av = dr.norm().scale(G*m2/(Math.pow(dr.magnitude(),2)));
                
				a = a.add(av)
                                    
                }
			};
		};
        return(a)
		return(pauliAcceleration(a,r,index));
	};

function pauliAcceleration(a,r,index)
	{
		for (var i = data.length - 1; i >= 0; i--) {
			if (i != index)
			{
				var r2 = data[i].r,
				    dr = r.subtract(r2),
				    av = dr.norm().scale(A/(Math.pow(dr.magnitude()-(mpp*20)/1.3,5)));
                
				a  = a.add(av)
			};
		};
		return(a);
	};


n   = 25;
vectorData = []
for (var i = n - 1; i >= 0; i--)
{
    for (var j = n- 1; j >= 0; j--)
    {
        origin = new vector([w_scale((i/n+1/(2*n))*w),h_scale((j/n+1/(2*n))*h)])
        v = new vector([0,0])
        vectorData.push({origin:origin,vec:v})
    };
};

svg.selectAll("line")
    .data(vectorData)
    .enter()
    .append("line")
    .attr("x1",function(d){return(w_scale.invert(d.origin.x))})
    .attr("y1",function(d){return(h_scale.invert(d.origin.y))})
    .attr("x2",function(d){return(w_scale.invert(d.origin.x+d.vec.x))})
    .attr("y2",function(d){return(h_scale.invert(d.origin.y+d.vec.y))})
    .attr("stroke",'teal');

function updateField()
{
    for (var i = vectorData.length - 1; i >= 0; i--)
    {
        vectorData[i].vec = gravityAcceleration(vectorData[i].origin,null)

    };
    
    svg.selectAll("line")
        .attr("x2",function(d){return(w_scale.invert(d.origin.x+d.vec.x*30000000))})
        .attr("y2",function(d){return(h_scale.invert(d.origin.y+d.vec.y*30000000))})
};

update_position()