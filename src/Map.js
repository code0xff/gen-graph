import React, { Component } from 'react';
import './Map.css';
import empty from './resources/empty.jpg';
import grass from './resources/grass.jpg';
import water from './resources/water.jpg';
import sand from './resources/sand.jpg';
import town from './resources/town.jpg';
import tree from './resources/tree.jpg';
import mountain from './resources/mountain.jpg';
import well from './resources/well.jpg';
import drum from './resources/drum.jpg';

class Map extends Component {
  state={}
  map=[empty, grass, water, sand, town, tree, mountain, well, drum];

  componentDidMount() {
    let obj;
    for (let i = 1; i <= 50; i++) {
      for (let j = 1; j <= 50; j++) {
        obj = {};
        obj[i + '' + j] = 0;
        this.setState(obj);
      }
    }
  }

  _setBlockType = (e) => {
    let obj = {};
    let type = this.state[e.target.id] + 1;
    if (type >= this.map.length) {
      type %= this.map.length;
    }
    obj[e.target.id] = type;
    this.setState(obj);
  }

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
        let id = rowIndex + '' + colIndex;
        return <td className='Block'
        onClick={this._setBlockType}
        key={colIndex} id={id} 
        style={{width: (100 / this.props.col) + '%',
                height: (100 / this.props.row) + '%'
              }}
        background={this.map[this.state[id]]}
        >
        </td>});

      return (<tr key ={rowIndex} id={rowIndex}>{blocks}</tr>)
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
