import './App.scss';
import React, { Component } from 'react';
import ProjectGallery from './containers/ProjectGallery';

export default class App extends Component {
  render() {
    return (
      <div>
        <ProjectGallery />
      </div>
    );
  }
}
