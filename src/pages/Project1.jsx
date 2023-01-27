import React from 'react';
import { IpynbRenderer } from 'react-ipynb-renderer';
import "react-ipynb-renderer/dist/styles/monokai.css"

import './project1.css';
import ipynb from './TelstraNotebookCatboost.ipynb';


const Project1 = () => {
  return (
    <div>
      <IpynbRenderer ipynb={ipynb} syntaxTheme={"okaidia"} />
      Project 1: Telstra Notebook with Catboost Model
    </div>
  );
}

export default Project1