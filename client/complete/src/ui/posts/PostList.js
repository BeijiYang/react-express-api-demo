import React, { Component } from 'react';
import axios from 'axios';
import Settings from '../../settings';
import {Link} from 'react-router';
import DeletePost from './DeletePost';
import filter from 'lodash/fp/filter';

class PostList extends Component {

  constructor() {
    super();
    this.state = {
      posts: [],
      id: ''
    }
  }

  componentWillMount() {
    axios.get(`${Settings.host}/posts`).then(res => {
      console.log(res.data);
      this.setState({
        posts: res.data.posts
      })
    })
    .catch(error => {
      if (error.response) {
        // 服务器响应了客户端发送的请求，但服务器返回给客户端的状态码不属于 2xx 范围，则打印返回的错误信息。
        console.log(error.response.data.error);
      } else {
        // 比如 API 服务器宕机的时候，则打印 'Network Error'
        console.log(error.message);
      }
    });
  }

  getStyles() {
    return {
      content: {
        position: 'relative',
        width: '100%',
        height: '60px',
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
      },
      title: {
        fontSize: '1.2em'
      },
      button: {
        display: 'block',
        margin: '30px auto',
        width: '120px',
        height: '36px',
        lineHeight: '36px',
        textAlign: 'center',
        backgroundColor: '#ff4081',
        fontSize: '1em',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '20px'
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
    const postList = this.state.posts.map(
      (post) => {
        return (
          <div style={styles.content} key={post._id}>
            <div style={styles.title}> {post.title} </div>
            <div style={styles.actions}>
              <Link to={`/posts/${post._id}`} style={styles.link}>查看</Link>
              <Link to={`/posts/${post._id}/edit`} style={styles.link}>修改</Link>
              <Link to='' style={styles.link} onClick={this.handleClick.bind(this, post._id)}>删除</Link>
            </div>
          </div>
        )
      }
    );


    return (
      <div>
        <Link to='/posts/new' style={styles.button}>写文章</Link>
        { postList }
        <DeletePost id={this.state.id} removePosts={this.filterPosts.bind(this)} ref='dialog' />
      </div>
    );
  }
}

export default PostList;
