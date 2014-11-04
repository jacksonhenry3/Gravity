data = earthMoonSun([])
draw()
window.setInterval(function(){data = update_position(data);repaint();},1)