data = earthMoonSun([])
// data = []
draw()
window.setInterval(function(){data = update_position(data);repaint();},1)