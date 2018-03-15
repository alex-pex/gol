import React from 'react';

const getCellStyle = value => ({
  width: '10px',
  height: '10px',
  border: '1px solid #ccc',
  background: value ? 'black' : 'white'
})

const Grid = ({ cells }) => (
  <table style={{ borderCollapse: 'collapse' }}>
    {cells.map((row, y) => (
      <tr key={y}>
        {row.map((cell, x) => (
          <td key={x} style={getCellStyle(cell)} />
        ))}
      </tr>
    ))}
  </table>
);

export default Grid;
