// Rover Object Goes Here
// ======================
// const directions = ['N', 'S', 'L', 'O'];


const lines = 9;
const columns = 9;
const obstaclesNumber = 3;
const Rover = {
  direction: 'N',
  x: 0,
  y: 0,
  travelLog: [],
};
const Rover2 = {
  direction: 'N',
  x: lines,
  y: columns,
  travelLog: [],
};
// ====================== SELF INVOLKING

(function makeGrid(line, column) {
  const grid = document.createElement('table');
  grid.setAttribute('align', 'center');
  for (let i = 0; i <= line; i += 1) { // criar linha
    grid.insertRow(i);
    for (let j = 0; j <= column; j += 1) { // criar coluna
      const cell = grid.rows.item(i).insertCell(j);
      const index = `${j},${i}`;
      cell.setAttribute('id', index);
      cell.setAttribute('align', 'center');
    }
  }
  document.getElementById('game-table').appendChild(grid);
}(lines, columns));
(function makeRovers(rover1, rover2) {
  const cellRover1 = document.getElementById('0,0');
  cellRover1.innerHTML = '&#8607;';
  cellRover1.setAttribute('class', 'active');
  const cellRover2 = document.getElementById(`${lines},${columns}`);
  cellRover2.innerHTML = '&#8607;';
  cellRover2.setAttribute('class', 'active');
  
}());

(function makeObstacle(obstacles) {
  for (let i = 1; i < obstacles + 1; i += 1) {
    const randomX = Math.floor((Math.random() * lines) + 1);
    const randomY = Math.floor((Math.random() * columns) + 1);
    const index = `${randomX},${randomY}`;
    const cellBlock = document.getElementById(index);
    cellBlock.setAttribute('class', 'blocked');
    cellBlock.innerHTML = '&#128056;';
  }
}(obstaclesNumber));

// ====================== ACTION

function remove(direction, x, y) {
  const index = `${x},${y}`;
  const del = document.getElementById(index);
  del.innerHTML = '';
  del.removeAttribute('class', 'active');
}

function clean(rover) {
  rover.travelLog.push([rover.y, rover.x]);
  remove(rover.direction, rover.x, rover.y);
}

function write(direction, x, y) {
  const index = `${x},${y}`;
  const cell = document.getElementById(index);
  switch (direction) {
    case 'S':
      cell.innerHTML = '&#8595;';
      break;
    case 'L':
      cell.innerHTML = '&#8594;';
      break;
    case 'O':
      cell.innerHTML = '&#8592;';
      break;
    default:
      cell.innerHTML = '&#8607;';
      break;
  }
  cell.setAttribute('class', 'active');
}

function check(index, className) {
  return document.getElementById(index).hasAttribute('class', className);
}
// ====================== MOVEMENTS

function turnLeft(rover) {
  console.log("turnLeft was called! "+rover.direction);
  clean(rover);
  switch (rover.direction) {
    case 'S':
      rover.direction = 'L';
      break;
    case 'L':
      rover.direction = 'N';
      break;
    case 'O':
      rover.direction = 'S';
      break;
    default:
      rover.direction = 'O';
      break;
  }
  write(rover.direction, rover.x, rover.y);
}

function turnRight(rover) {
  console.log("turnRight was called!");
  clean(rover);
  switch (rover.direction) {
    case 'S':
      rover.direction = 'O';
      break;
    case 'L':
      rover.direction = 'S';
      break;
    case 'O':
      rover.direction = 'N';
      break;
    default:
      rover.direction = 'L';
      break;
  }
  write(rover.direction, rover.x, rover.y);
}

function moveForward(rover, maxLines, maxColumns) {
  console.log("moveForward was called!");
  clean(rover);
  switch (rover.direction) {
    case 'S':
      if (rover.y < maxLines) {
        const index = `${rover.x},${rover.y + 1}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.y += 1;
        }
      }
      break;
    case 'L':
      if (rover.x < maxColumns) {
        const index = `${rover.x + 1},${rover.y}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.x += 1;
        }
      }
      break;
    case 'O':
      if (rover.x > 0) {
        const index = `${rover.x - 1},${rover.y}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.x -= 1;
        }
      }
      break;
    default:
      if (rover.y > 0) {
        const index = `${rover.x},${rover.y - 1}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.y -= 1;
        }
      }
      break;
  }
  write(rover.direction, rover.x, rover.y);
}
function moveBackward(rover, maxLines, maxColumns) {
  console.log("moveBackward was called!");
  clean(rover);
  switch (rover.direction) {
    case 'S':
      if (rover.y > 0) {
        const index = `${rover.x},${rover.y - 1}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.y -= 1;
        }
      }
      break;
    case 'L':
      if (rover.x > 0) {
        const index = `${rover.x - 1},${rover.y}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.x -= 1;
        }
      }
      break;
    case 'O':
      if (rover.x < maxColumns) {
        const index = `${rover.x + 1},${rover.y}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.x += 1;
        }
      }
      break;
    default:
      if (rover.y < maxLines) {
        const index = `${rover.x},${rover.y + 1}`;
        if (!check(index, 'blocked') && !check(index, 'active')) {
          rover.y += 1;
        }
      }
      break;
  }
  write(rover.direction, rover.x, rover.y);
}

function commands(text) {
  text.split('').forEach((c) => {
    switch (c) {
      case 'f':
        moveForward(Rover, lines, columns);
        break;
      case 'l':
        turnLeft(Rover);
        break;
      case 'r':
        turnRight(Rover);
        break;
      case 'b':
        moveBackward(Rover, lines, columns);
        break;
      default:
        break;
    }
  });
}

document.addEventListener('keydown', (event) => {
  switch (event.which) {
    case 38:
      moveForward(Rover, lines, columns);
      break;
    case 40:
      moveBackward(Rover, lines, columns);
      break;
    case 37:
      turnLeft(Rover);
      break;
    case 39:
      turnRight(Rover);
      break;
    case 87:
      moveForward(Rover2, lines, columns);
      break;
    case 90:
      moveBackward(Rover2, lines, columns);
      break;
    case 65:
      turnLeft(Rover2);
      break;
    case 83:
      turnRight(Rover2);
      break;
    default:
      break;
  }
});


commands('b');
