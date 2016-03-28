import React from 'react';
import ReactDOM from 'react-dom';
const styles = {
    bar:{
        zIndex:'999',
        top:'0',
        left:'0',
        position:'fixed',
        background:'rgba(255,255,255,1)', 
        height:'10%',
        width:'100%',
    },
    button:{
        float:'right',
        display:'inline-block',
    },
    brandname:{
        padding:'5px',
        fontSize:'3vw',
        color:'#000',
    },
};


const NavBar = React.createClass({

    handleScroll(){
        
    },

    render(){
        return (
                <nav className="navbar" style={Object.assign({},styles.bar,{})}>
                    <div className="brandname" style={styles.brandname}>
                    {this.props.brandname}
                    </div>
                    <div className="navbtn" style={styles.button}>
                    </div>
                </nav>
                );
    }
});

ReactDOM.render(<NavBar brandname="LIVESTREAMSALE"/>,document.getElementById('container'));
