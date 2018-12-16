import React, { Component } from 'react';
import axios, {post} from 'axios';
import './App.css';
import Header from './Header';
import Main from './Main';
import Asset from './Asset';

class App extends Component {
  state = {selectedMenu: 0, 
    row: 7, 
    col: 7, 
    width: 350,
    height: 350, 
    collapse: 'separate',
    mapList: ['empty'], 
    mapSetList: {'empty': 'empty'}, 
    selectedMapSet: 'empty', 
    mode: 'click',
    line: 1,
    loadMapFile: null,
    loadMapFileName: ''
  }

  componentDidMount() {
    this._reloadMapList();
    this._initialize();    
  }

  _reloadMapList = () => {
    axios.get('/assets')
    .then((res) => {
      this.setState({mapList: res.data.mapList, mapSetList: res.data.mapSetList});
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

  _onOffCollapse = (e) => {
    if (e.target.checked) {
      this.setState({collapse: 'collapse'});
    } else {
      this.setState({collapse: 'separate'});
    }
  }

  _onOffLine = (e) => {
    if (e.target.checked) {
      this.setState({line: 0});
    } else {
      this.setState({line: 1});
    }
  }

  _updateMapSet = (e) => {
    this.setState({selectedMapSet: e.target.id});
  }

  _setBlockType = (e) => {
    if (this.state.mode === 'over' || this.state.mode === 'click') {
      let obj = {};
      obj[e.target.id] = this.state.selectedMapSet;
      this.setState(obj);
    }
  }
  
  _getTypeImage = (id) => {
    return this.state.mapSetList[this.state[id]];
  }

  menuList = ['create', 'asset']
  _menuSelect = (e) => {
    this.setState({selectedMenu: parseInt(e.target.id)});
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

  _setMode = (e) => {
    this.setState({mode: e.target.value});
  }

  _editMapChipOrder = (e) => {
    let selectedIndex = this.state.mapList.indexOf(this.state.selectedMapSet);
    let mapList = this.state.mapList;
    if (e.target.id === 'up') {
      if (selectedIndex === 1) {
        return;
      }
      let temp = mapList[selectedIndex - 1];
      mapList[selectedIndex - 1] = mapList[selectedIndex];
      mapList[selectedIndex] = temp;
      this.setState({mapList, selectedMapSet: this.state.mapList[selectedIndex - 1]});
    } else if (e.target.id === 'down') {
      if (selectedIndex === this.state.mapList.length - 1) {
        return;
      }
      let temp = mapList[selectedIndex + 1];
      mapList[selectedIndex + 1] = mapList[selectedIndex];
      mapList[selectedIndex] = temp;
      this.setState({mapList, selectedMapSet: this.state.mapList[selectedIndex + 1]});
    }
  }

  _saveMap = () => {
    let fileName = window.prompt('please input file name');

    if (fileName === '' || fileName === null) {
      alert('fail to save');
      return;
    }

    let map = '';
    let rowId, colId;
    let mapElement;
    let type;
    let matcher = {};
    for (let i = 1; i <= this.state.row; i++) {
      rowId = i < 10 ? '0' + i : i;
      for (let j = 1; j <= this.state.col; j++) {
        colId = j < 10 ? '0' + j : j;

        type = this.state[rowId + '' + colId];
        mapElement = String.fromCharCode(65 + this.state.mapList.indexOf(type));
        if (!(mapElement in matcher)) {
          matcher[mapElement] = type;
        } 
        map += mapElement;
      }
    }

    axios({url: '/map/save',
    method: 'POST',
    data: {fileName: fileName, row: this.state.row, col: this.state.col, width: this.state.width, height: this.state.height, matcher: matcher, map: map},
    responseType: 'blob',
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName + '.json');
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {console.log(err)});
  }

  _drawLoadMap = (param) => {
    this.setState({
      row: param['row'],
      col: param['col'],
      width: param['width'],
      height: param['height'],
    });

    const map = param['map'];
    const matcher = param['matcher'];
    let rowId, colId;
    let obj;
    let index = 0;

    for (let i = 1; i <= this.state.row; i++) {
      rowId = i < 10 ? '0' + i : i;
      for (let j = 1; j <= this.state.col; j++) {
        colId = j < 10 ? '0' + j : j;
        obj = {};
        
        obj[rowId + '' + colId] = matcher[map[index]];
        this.setState(obj);
        index++;
      }
    }
  }
  
  _sendMapFile = () => {
    const url = '/map/load';
    const formData = new FormData();
    
    formData.append('mapFile', this.state.loadMapFile);
    formData.append('fileName', this.state.loadMapFileName);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
  }

  _uploadMapFile = () => {
    this._sendMapFile()
    .then((res)=>{
      this._drawLoadMap(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  _setMapFile = (e) => {
    this.setState({loadMapFile: e.target.files[0], loadMapFileName: e.target.files[0].name});
    this._uploadMapFile();
  }

  _loadMap = () => {
    const form = document.createElement('form');
    form.onsubmit = this._onFormSubmit;
    const file = document.createElement('input');
    file.type = 'file';
    file.onchange = this._setMapFile;
    form.append(file);
    document.body.appendChild(form);
    file.style.display = 'none';
    file.click();
  }

  render() {
    return (
      <div>
        <Header menuSelect={this._menuSelect}/>
        {this.state.selectedMenu === 0 ? 
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
        loadMap={this._loadMap}
        collapse={this.state.collapse}
        line={this.state.line}
        onOffCollapse={this._onOffCollapse}
        onOffLine={this._onOffLine}
        editMapChipOrder={this._editMapChipOrder}
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
