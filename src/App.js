import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header';
import Main from './Main';
import Asset from './Asset';

class App extends Component {
  state = {selected: 0, row: 5, col: 5, width: 300, height: 300}

  mapList = [];
  mapSetList = {};

  mapSetNameIndex = ['empty'];
  mapSet = ['empty'];

  componentDidMount() {
    axios.get('/assets')
    .then((response) => {
      this.mapList = response.data.mapList;
      this.mapSetList = response.data.mapSetList;
    })
    .catch((err) => {
      console.log(err);
    });

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

  _setRow = (row) => {
    this.setState({row});
  }

  _setCol = (col) => {
    this.setState({col});
  }

  _setWidth = (width) => {
    this.setState({width});
  }

  _setHeight = (height) => {
    this.setState({height});
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
        row={this.state.row}
        col={this.state.col}
        width={this.state.width}
        height={this.state.height}
        setRow={this._setRow}
        setCol={this._setCol}
        setWidth={this._setWidth}
        setHeight={this._setHeight}
        /> 
        : <Asset 
        mapList={this.mapList}
        mapSetList={this.mapSetList}
        />}
      </div>
    );
  }
}

export default App;
