import React from 'react';
import {
  Link
} from "react-router-dom";
import { ReactComponent as Logo } from './logo.svg';

function Navigation() {
  return (
      <nav className="flex items-center justify-between flex-wrap bg-pink-700 p-6">
        <div className="flex items-center flex-shrink-0 text-white">
          <Link className="flex mr-3" to="/">
            <Logo></Logo>
            <span className="font-semibold text-xl tracking-tight">Peer Video</span>
          </Link>
          <Link className="flex mr-3 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white" to="/start">
            Start Video
          </Link>
          <Link className="mr-3" to="/about">
            Help
          </Link>
        </div>
      </nav>
  )
}

export default Navigation;
