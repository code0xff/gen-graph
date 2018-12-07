import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';

class App extends Component {
  state={selected: 0}
  menuList = ['create', 'asset']
  _menuSelect = (e) => {
    this.setState({selected: parseInt(e.target.id)});
  }

  render() {
    return (
      <div>
        <Header menuSelect={this._menuSelect}/>
        {this.state.selected === 0 ? <Main /> : <div style={{color: 'red', textAlign: 'center'}}>menu is not selected yet.</div>}
      </div>
    );
  }
}

export default App;
