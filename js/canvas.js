var w      = document.body.scrollWidth,
	h      = document.body.scrollHeight,
	scale  = 1.5*Math.pow(10,11);
	mpp    = scale/h, // meters per pixel
	canvas = d3.select("#canvas"), 
	svg    = canvas.append("svg:svg"),

svg.attr("width", w)
   .attr("height", h)
   .attr('id','space')
   .style("background-color", '#222')
   .style("pointer-events", "all")
   .on("click",add_data) 


w_scale    = d3.scale.linear() 
	.range([-w/h*scale, w/h*scale])
	.domain([0, w]);

h_scale = d3.scale.linear()
	.range([-scale, scale])
	.domain([h,0]);

function add_data(argument) {
	var m = d3.mouse(this);
		x = w_scale(m[0])
		y = h_scale(m[1])
		r = new vector([x,y]) //in meters  
		v = randomVector(2).scale(2000)  //in m/s
		v = new vector([0,10000])
		mass = 5.972*Math.pow(10,24)
		mass = 1.989*Math.pow(10,30)
	b = new body(r,v,mass,6371000,1)
	data.push(b)
	draw()
}


function draw()
{
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx",function(d){return(w_scale.invert(d.r.x))})
		.attr("cy",function(d){return(h_scale.invert(d.r.y))}) 
		.attr("r",function(d){return(d.radius/mpp*20)})
		.attr("fill",function(){return('#fff')});
}

function repaint()
{
	svg.selectAll("circle")
	   .attr('cx',function(d){return(w_scale.invert(d.r.x))})
	   .attr('cy',function(d){return(h_scale.invert(d.r.y))})
}
