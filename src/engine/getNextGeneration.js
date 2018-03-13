const getCellNeighbors = cells => (y, x) => [
  // 1ère ligne
  (cells[y-1] || [])[x-1] || 0,
  (cells[y-1] || [])[x] || 0,
  (cells[y-1] || [])[x+1] || 0,
  
  // 2ème ligne
  (cells[y] || [])[x-1] || 0,
  (cells[y] || [])[x+1] || 0,
  
  // 3ème ligne
  (cells[y+1] || [])[x-1] || 0,
  (cells[y+1] || [])[x] || 0,
  (cells[y+1] || [])[x+1] || 0,
];

const aliveReducer = (total, cell) => total + (cell ? 1 : 0);

const getNextCellValue = (currentValue, neighbors) => {
  const aliveNeighbors = neighbors.reduce(aliveReducer, 0);

  if (aliveNeighbors === 3) return 1;
  if (aliveNeighbors === 2) return currentValue;
  return 0;
}

const getNextGeneration = cells => {
  return cells.map((row, y) => row.map((cell, x) => {
    return getNextCellValue(cell, getCellNeighbors(cells)(y, x))
  }));
}

export default getNextGeneration;
