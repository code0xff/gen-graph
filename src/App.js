import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import empty from './resources/empty.jpg';
import grass from './resources/grass.jpg';
import water from './resources/water.jpg';
import sand from './resources/sand.jpg';
import town from './resources/town.jpg';
import tree from './resources/tree.jpg';
import mountain from './resources/mountain.jpg';
import well from './resources/well.jpg';
import drum from './resources/drum.jpg';

class App extends Component {
  state={selected: 0}
  mapSetNameIndex=['empty'];
  mapSet=[empty];
  mapList=['grass', 'water', 'sand', 'town', 'tree', 'mountain', 'well', 'drum'];
  mapSetList = {'grass': grass, 'water': water, 'sand': sand, 'town': town, 'tree': tree, 'mountain': mountain, 'well': well, 'drum': drum};

  componentDidMount() {
    let obj, rowId, colId;
    for (let i = 1; i <= 50; i++) {
      rowId = i < 10 ? '0' + i : i;
      for (let j = 1; j <= 50; j++) {
        colId = j < 10 ? '0' + j : j;
        obj = {};
        obj[rowId + '' + colId] = 0;
        this.setState(obj);
      }
    }
  }

  _updateMapSet = (e) => {
    if (e.target.checked) {
      if (this.mapSetNameIndex.indexOf(e.target.id) === -1) {
        this.mapSet.push(this.mapSetList[e.target.id]);
        this.mapSetNameIndex.push(e.target.id);
      }
    } else {
      let index = this.mapSetNameIndex.indexOf(e.target.id);
      if (index !== -1) {
        this.mapSet.splice(index, 1);
        this.mapSetNameIndex.splice(index, 1);
      }
    }
  }

  _setBlockType = (e) => {
    let obj = {};
    let type = this.state[e.target.id] + 1;
    if (type >= this.mapSet.length) {
      type %= this.mapSet.length;
    }
    obj[e.target.id] = type;
    this.setState(obj);
  }
  
  _getBlockType = (id) => {
    return this.state[id];
  }

  menuList = ['create', 'asset']
  _menuSelect = (e) => {
    this.setState({selected: parseInt(e.target.id)});
  }

  render() {
    return (
      <div>
        <Header menuSelect={this._menuSelect}/>
        {this.state.selected === 0 ? 
        <Main 
        setBlockType={this._setBlockType} 
        getBlockType={this._getBlockType}
        updateMapSet={this._updateMapSet}
        mapSet={this.mapSet}
        mapList={this.mapList}
        /> 
        : <div style={{color: 'red', textAlign: 'center'}}>menu is not selected yet.</div>}
      </div>
    );
  }
}

export default App;
