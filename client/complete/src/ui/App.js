import React, { Component } from 'react';
import {Link} from 'react-router';
//import PostList from './posts/PostList';

class App extends Component {
  getStyles() {
    return {
      header: {
        height: '64px',
        width: '100%',
        backgroundColor: '#00bcd4',
        textAlign: 'center',
        lineHeight: '64px',
      },
      link: {
        fontSize: '1.5em',
        color: '#fff',
        textDecoration: 'none'
      }
    };
  }

  render() {
    let styles = this.getStyles();
    return (
      <div>
        <header style={styles.header}>
           <Link to='/' style={styles.link}>SEIKO & ROLEX</Link>
        </header>
        { this.props.children }
      </div>
    );
  }
}

export default App;
