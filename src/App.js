import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header';
import Main from './Main';
import Asset from './Asset';

class App extends Component {
  state = {selected: 0, row: 7, col: 7, width: 350, height: 350, mapList: ['empty'], mapSetList: {'empty': 'empty'}, selectedMapSet: 0, mode: 'click'}

  componentDidMount() {
    this._reloadMapList();
    this._initialize();    
  }

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
        obj[rowId + '' + colId] = 0;
        this.setState(obj);
      }
    }
  }

  _updateMapSet = (e) => {
    this.setState({selectedMapSet: parseInt(e.target.id)});
  }

  _setBlockType = (e) => {
    let obj = {};
    obj[e.target.id] = this.state.selectedMapSet;
    this.setState(obj);
  }
  
  _getTypeImage = (id) => {
    return this.state.mapSetList[this.state.mapList[this.state[id]]];
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

  _saveMap = () => {
    let fileName = window.prompt('please input file name');
    if (fileName === '') {
      alert('fail to save');
      return;
    }

    let map = '';
    let rowId, colId;
    for (let i = 1; i <= this.state.row; i++) {
      rowId = i < 10 ? '0' + i : i;
      for (let j = 1; j <= this.state.col; j++) {
        colId = j < 10 ? '0' + j : j;
        map += this.state[rowId + '' + colId];
      }
    }

    axios({url: '/assets/save',
    method: 'POST',
    data: {map: map, fileName: fileName, row: this.state.row, col: this.state.col},
    responseType: 'blob',
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName + '.txt');
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {console.log(err)});
  }

  render() {
    return (
      <div>
        <Header menuSelect={this._menuSelect}/>
        {this.state.selected === 0 ? 
        <Main 
        setBlockType={this._setBlockType} 
        getTypeImage={this._getTypeImage}
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
        saveMap={this._saveMap}
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
