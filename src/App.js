import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header';
import Main from './Main';
import Asset from './Asset';

class App extends Component {
  state = {selected: 0, row: 5, col: 5, width: 300, height: 300, mapList: [], mapSetList: {}, selectedMapSet: 'empty', mode: 'click'}

  _reloadMapList = () => {
    axios.get('/assets')
    .then((response) => {
      this.setState({mapList: response.data.mapList, mapSetList: response.data.mapSetList});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  _initialize = () => {
    let obj, rowId, colId;
    for (let i = 1; i <= 50; i++) {
      rowId = i < 10 ? '0' + i : i;
      for (let j = 1; j <= 50; j++) {
        colId = j < 10 ? '0' + j : j;
        obj = {};
        obj[rowId + '' + colId] = 'empty';
        this.setState(obj);
      }
    }
  }

  componentDidMount() {
    this._reloadMapList();
    this._initialize();    
  }

  _updateMapSet = (e) => {
    this.setState({selectedMapSet: e.target.id});
  }

  _setBlockType = (e) => {
    let obj = {};
    obj[e.target.id] = this.state.mapSetList[this.state.selectedMapSet];
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

  _setMode =(e) => {
    this.setState({mode: e.target.value});
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
        initialize={this._initialize}
        selectedMapSet={this.state.selectedMapSet}
        mapList={this.state.mapList}
        mapSetList={this.state.mapSetList}
        row={this.state.row}
        col={this.state.col}
        width={this.state.width}
        height={this.state.height}
        setRow={this._setRow}
        setCol={this._setCol}
        setWidth={this._setWidth}
        setHeight={this._setHeight}
        mode={this.state.mode}
        setMode={this._setMode}
        /> 
        : <Asset 
        mapList={this.state.mapList}
        mapSetList={this.state.mapSetList}
        reloadMapList={this._reloadMapList}
        />}
      </div>
    );
  }
}

export default App;
