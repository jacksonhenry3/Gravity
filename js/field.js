var n      = 20,
    width  = w/(n-2),
    height = h/(n-2);

vectorData = []
for (var i = n - 1; i >= 0; i--)
{
    for (var j = n- 1; j >= 0; j--)
    {
        origin = new vector([w_scale((i/n+1/(2*n))*w),h_scale((j/n+1/(2*n))*h)])
        v = new vector([0,.0000001])
        v = origin.add(v)
        vectorData.push({origin:origin,vec:v,p:0}) 
    };
};

svg.selectAll("rect")
    .data(vectorData)
    .enter()
    .append("rect")
    .attr("x",function(d){return(w_scale.invert(d.origin.x)-width/2)})
    .attr("y",function(d){return(h_scale.invert(d.origin.y)-height/2)})
    .attr('width',width)
    .attr('height',height)
    .style('fill','red')

function updateField()
{    
    svg.selectAll("rect")
        .style('fill',function(d){return('rgb(0,0,'+Math.round(potential(d.origin,data)/-max())+')')});
};

