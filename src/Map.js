import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
  _createFrame = () => {
    let cols = [];
    for (let i = 1; i <= this.props.col; i++) {
      cols.push(i);
    }
    let rows = [];
    for (let i = 1; i <= this.props.row; i++) {
      rows.push(i);
    }
    return rows.map((rowIndex) => {
      let blocks = cols.map((colIndex) => {
        let id = (rowIndex < 10 ? '0' + rowIndex : rowIndex) + '' + (colIndex < 10 ? '0' + colIndex : colIndex);
        return <td className='Block'
        onClick={this.props.setBlockType}
        key={id} id={id} 
        style={{width: parseInt(100 / this.props.col) + '%',
                height: parseInt(100 / this.props.row) + '%'
              }}
        background={'/images/' + this.props.mapSet[this.props.getBlockType(id)] + '.jpg'}
        >
        </td>});

      return (<tr key={rowIndex} id={rowIndex}>{blocks}</tr>)
    });
  }

  render() {
    return (
      <div>
        <table className='Map' 
          style={{width: this.props.width + 'px',
                  height: this.props.height + 'px'
          }}>
          <thead></thead>
          <tbody>
            {this._createFrame()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Map;
