var data   = [],
	radius = 5,
	scale  = 1.5*38440000,
	scale = 10,
	G      = -6.67*Math.pow(10,-11),
	G = -.00001,
	canvas = d3.select("#canvas"),
	w      = document.body.scrollWidth,
	h      = document.body.scrollHeight,
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

// for (var i = 4 - 1; i >= 0; i--) {
// 	for (var j = 4- 1; j >= 0; j--) {
// 		data.push({r:{x:w_scale((i/4+1/8)*w),y:h_scale((j/4+1/8)*h)},v:{x:0,y:0},m:1,radius :20})
// 	};
// };

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx",function(d){return(w_scale.invert(d.r.x))})
		.attr("cy",function(d){return(h_scale.invert(d.r.y))}) 
		.attr("r",radius)
		.attr("fill",function(){return('#'+Math.floor(Math.random()*16777215).toString(16));});



function add_data(){
	//get mouse coordinates and convert to graph coordinates
	var m = d3.mouse(this);
	m[0]  = w_scale(m[0]);
	m[1]  = h_scale(m[1]);
	a = (Math.random()-.5)/100
	b = (Math.random()-.5)/100
	// console.log(a)
	//add new point to data
	data.push({r:{x:m[0],y:m[1]},v:{x:a,y:b},m:1,radius :5})


	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx",function(d){return(w_scale.invert(d.r.x))})
		.attr("cy",function(d){return(h_scale.invert(d.r.y))}) 
		.attr("r",radius)
		.attr("fill",function(){return('#'+Math.floor(Math.random()*16777215).toString(16));});
}

update_position = function (){
	//in seconds (becouse set interval is 1 ms)
	
	var dt = 1;
	for (var i = data.length - 1; i >= 0; i--){
		d   = data[i]
		F   = gravity(d.r.x,d.r.y,d.m,i)
		a   = {x:F.x/d.m,       y:F.y/d.m}
		d.v = {x:a.x*dt+d.v.x,  y:a.y*dt+d.v.y}
		d.r = {x:(d.v.x*dt+d.r.x),y:(d.v.y*dt+d.r.y)}
		

	};

	svg.selectAll("circle")
		.attr('cx',function(d){return(w_scale.invert(d.r.x))})
		.attr('cy',function(d){return(h_scale.invert(d.r.y))})
};

function gravity(x,y,m1,index)
	{
		totalForce = {x:0,y:0}
		for (var i = data.length - 1; i >= 0; i--) {
			if (i != index)
			{
				r2 = data[i].r
				m2 = data[i].m
				dx = x-r2.x
				dy = y-r2.y
				rsq = Math.pow(dx,2)+Math.pow(dy,2)
				totalForce.x+=G*m1*m2/rsq*dx/Math.sqrt(rsq)
				totalForce.y+=G*m1*m2/rsq*dy/Math.sqrt(rsq)
			};
		};
		
		totalForce = pauli(totalForce,x,y,m1,index)
		return(totalForce)

	}


function pauli(totalForce,x,y,m1,index)
	{
		for (var i = data.length - 1; i >= 0; i--) {
			if (i != index)
			{
				r2 = data[i].r
				m2 = data[i].m
				dx = x-r2.x
				dy = y-r2.y
				rsq = Math.pow(dx,2)+Math.pow(dy,2)
				totalForce.x+=.000000001/Math.pow(rsq,5)*dx/Math.sqrt(rsq)
				totalForce.y+=.000000001/Math.pow(rsq,5)*dy/Math.sqrt(rsq)
			};
		};
		return(totalForce)
	}

setInterval(update_position,1);

function tell () {
	console.log(data[0].v)
}