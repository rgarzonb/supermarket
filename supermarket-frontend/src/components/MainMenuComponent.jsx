import React from 'react';
import { Link } from 'react-router-dom';
import { Button }  from "react-bootstrap";
import backgroundImage from './static/background.jpg';
import '../App.css';

export const MainMenuComponent = () => {
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
    };

  return (
    <div className="background-container" style={divStyle}>
        <h1> Main Menu </h1>
        <nav>
            <ul>
                <li>
                    <Link to="/list-fruits" className='btn btn-primary mb-2' style={{ fontSize: '20px' }}>
                        List Fruits
                    </Link>
                </li>
                <li>
                    <Link to="list-orders" className='btn btn-primary mb-2' style={{ fontSize: '20px' }}>                        
                        List Orders
                    </Link>
                </li>
            </ul>
        </nav>     
    </div>
  )
}

export default MainMenuComponent;