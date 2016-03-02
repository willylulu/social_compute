import React from 'react';
import ReactDOM from 'react-dom';
const styles = {
    button:{

    },
    nav:{

    },
};


const NavBar = React.createClass({
    
    render(){
        return (
                <nav className="navbar"></nav>
                );
    }
});


ReactDOM.render(<NavBar/>,document.getElementById('navhook') );


