import { Component } from 'react'
import avatar from './images/avatar.png'
import moment from 'moment'

class App extends Component {
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot',
      },
      {
        id: 2,
        name: '时间',
        type: 'time',
      },
      {
        id: 3,
        name: '点赞',
        type: 'good',
      },
    ],
    active: 'hot',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1,
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0,
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1,
      },
    ],
    // 评论内容
    comment: '',
  }

  render() {
    const state = this.state
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>{state.list.length} 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {state.tabs.map((item) => (
                <li
                  className={item.type === state.active ? 'on' : ''}
                  key={item.id}
                  onClick={this.changeTabs.bind(this, item.type)}
                >
                  按{item.name}排序
                </li>
              ))}
            </ul>
          </div>
          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={(e) => this.setState({ comment: e.target.value })}
              />
              <button className="comment-submit" onClick={this.add}>
                发表评论
              </button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>
          {/* 评论列表 */}
          {this.renderList()}
        </div>
      </div>
    )
  }
  renderList() {
    if (this.state.list.length > 0) {
      return (
        <div className="comment-list">
          {this.state.list.map((item) => (
            <div className="list-item" key={item.id}>
              <div className="user-face">
                <img className="user-head" src={avatar} alt="" />
              </div>
              <div className="comment">
                <div className="user">{item.author}</div>
                <p className="text">{item.comment}</p>
                <div className="info">
                  <span className="time">
                    {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <span
                    onClick={this.changeAttitude.bind(
                      this,
                      item.id,
                      item.attitude === 1 ? 0 : 1
                    )}
                    className={[
                      'like',
                      item.attitude === 1 ? 'liked' : '',
                    ].join(' ')}
                  >
                    <i className="icon" />
                  </span>
                  <span
                    onClick={this.changeAttitude.bind(
                      this,
                      item.id,
                      item.attitude === -1 ? 0 : -1
                    )}
                    className={`hate ${item.attitude === -1 ? 'hated' : ''}`}
                  >
                    <i className="icon" />
                  </span>
                  <span
                    className="reply btn-hover"
                    onClick={this.del.bind(this, item.id)}
                  >
                    删除
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }
    return <div>暂无更多评论～</div>
  }
  changeTabs = (type) => {
    console.log('222', type)
    this.setState({
      active: type,
    })
  }
  del = (id) => {
    console.log('删除', id)
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    })
  }
  add = () => {
    console.log('添加')
    if (!this.state.comment.trim()) {
      return alert('内容不能为空')
    }
    // 添加评论
    const content = {
      id: Date.now(),
      author: '闪电',
      comment: this.state.comment,
      time: new Date(),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 0,
    }
    this.setState({
      list: [content, ...this.state.list],
      comment: '',
    })
  }
  changeAttitude = (id, attitude) => {
    console.log(id, attitude)
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            attitude,
          }
        } else {
          return item
        }
      }),
    })
  }
}

export default App
