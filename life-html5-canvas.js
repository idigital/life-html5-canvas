function Life(size, delay) {
	// Set up canvas
	var context = document.getElementById('life-html5-canvas').getContext('2d');
	var cols = Math.round(context.canvas.width / size);
	var rows = Math.round(context.canvas.height / size);
	var drawColor = '#000000';
	var eraseColor = '#FFFFFF';
	
	// Set up world
	var world = [];
	for (var r = 0; r < rows; r++) {
		var temp = [];
		for (var c = 0; c < cols; c++)
			temp.push(Math.round(Math.random()));	// Random dead or alive
		world.push(temp);	// Insert row into world
	}
	var copy;
	
	// Count neighbors surrounding a cell
	function getNeighbors(world, row, col) {
		var row1 = row - 1;
		var row2 = row;
		var row3 = row + 1;
		var col1 = col - 1;
		var col2 = col;
		var col3 = col + 1;
		// Wrap around
		if (row1 < 0)
			row1 = rows - 1;
		if (row3 >= rows)
			row3 = 0;
		if (col1 < 0)
			col1 = cols - 1;
		if (col3 >= cols)
			col3 = 0;	
		var neighbors = world[row1][col1] + world[row1][col2] + world[row1][col3] +
		                world[row2][col1] +                     world[row2][col3] +
		                world[row3][col1] + world[row3][col2] + world[row3][col3];
		return neighbors;
	}
	
	var run = true;
	
	var timer = setInterval(lifeCycle, delay);
	
	function lifeCycle() {
		if (!run)
			return;
		// Make copy of world to preserve values
		var copy = Array();
		for (row = 0; row < world.length; row++) {
			copy.push(world[row].slice(0));
		}
		for (var row = 0; row < rows; row++) {
			for (var col = 0; col < cols; col++) {
				var neighbors = getNeighbors(copy, row, col);
				if (world[row][col]) {
					// Cell is alive
					if (neighbors < 2 || neighbors > 3) {
						// Cell dies from loneliness :( or overcrowding >:(
						world[row][col] = 0;
						context.fillStyle = eraseColor;
						context.fillRect(col * size, row * size, size, size);
					}
				} else {
					// Cell is dead
					if (neighbors == 3) {
						// Cell is born :D
						world[row][col] = 1;
						context.fillStyle = drawColor;
						context.fillRect(col * size, row * size, size, size);
					}
				}
			}
		}
	}
}