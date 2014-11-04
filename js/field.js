n   = 35;
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
    .attr("stroke",'teal')
    .attr("stroke-width",'1');

function updateField()
{
    for (var i = vectorData.length - 1; i >= 0; i--)
    {
        vectorData[i].vec = gravityAcceleration(vectorData[i].origin,null)

    };
    
    svg.selectAll("line")
        .attr("x2",function(d){return(w_scale.invert(d.origin.x+d.vec.x*600000000))})
        .attr("y2",function(d){return(h_scale.invert(d.origin.y+d.vec.y*600000000))})
};