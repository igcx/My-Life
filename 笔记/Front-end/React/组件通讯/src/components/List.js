import { Component } from 'react'

class List extends Component {
  render() {
    return (
      <div className="comment-list">
        <div className="list-item">
          <div className="user-face">
            <img className="user-head" src="./images/avatar.png" alt="" />
          </div>
          <div className="comment">
            <div className="user">西西弗的守望</div>
            <p className="text">这个视频太好笑了</p>
            <div className="info">
              <span className="time">2021-10-08 09:05:00</span>
              <span className="like liked">
                <i className="icon" />
              </span>
              <span className="hate hated">
                <i className="icon" />
              </span>
              <span className="reply btn-hover">删除</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default List
