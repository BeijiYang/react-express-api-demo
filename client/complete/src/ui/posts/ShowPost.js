import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../../settings';
import {Link} from 'react-router';
import DeletePost from './DeletePost';
import filter from 'lodash/fp/filter';



class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      id: ''
    }
  }

  componentWillMount() {
    axios.get(`${Settings.host}/posts/${this.props.params.post_id}`).then(res => {
      this.setState({
        post: res.data.posts
      })
      console.log(res.data);
    })
    .catch(res => {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log(error.message);
      }
    });
  }

  getStyles() {
    return {
      content: {
        position: 'relative',
        width: '100%',
        minHeight: '200px',
        maxWidth: '600px',
        margin: '30px auto',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
      },
      category: {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '4px 6px',
        color: '#fff',
        fontSize: '.8em',
        backgroundColor: '#ed5a5a'
      },
      title: {
        fontSize: '1.3em',
        paddingTop: '10px',
        paddingBottom: '20px',
        textAlign: 'center'
      },
      text: {
        fontSize: '1em',
        color: 'rgba(0,0,0,.8)'
      },
      link: {
        display: 'inline-block',
        marginLeft: '15px',
        fontSize: '1em',
        color: '#00bcd4',
        opacity: '.8',
        textDecoration: 'none'
      },actions: {
        textAlign: 'center'
      },
    }
  }


  handleClick(value) {
    this.setState({id: value});
    console.log(this.state.id);
    this.refs.dialog.handleOpen();
  }

  filterPosts(id) {
    const posts = filter((post) => {
      return post._id !== id
    }, this.state.posts);

    this.setState({ posts: posts })
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.content}>
        <div style={styles.category}>{this.state.post.category}</div>
        <div style={styles.title}>{this.state.post.title}</div>
        <div style={styles.text}>{this.state.post.content}</div>
        <div style={styles.actions}>
          <Link to={`/posts/${this.state.post._id}/edit`} style={styles.link}>修改</Link>
          <Link to='javascript:;' style={styles.link} onClick={this.handleClick.bind(this, this.state.post._id)}>删除</Link>
        </div>
        <DeletePost id={this.state.id} removePosts={this.filterPosts.bind(this)} ref='dialog' />
      </div>
    );
  }
}

export default ShowPost;
