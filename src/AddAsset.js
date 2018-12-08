import React, {Component} from 'react';
import './AddAsset.css';

class AddAsset extends Component {
  render() {
    return (
      <div style={{textAlign: 'center', alignContent:'center' }}>
        <div className='ImageBox'></div>
        <br />
        <div >asset name</div>
        <input type='text'></input>
      </div>
    )
  }
}

export default AddAsset;