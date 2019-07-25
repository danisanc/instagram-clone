import React, { Component } from 'react'

import Api from '../services/api'

import './style.css'

class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }

        this.loadPosts()
    }

    loadPosts = async () => {
        const response = await Api.get('posts')

        this.setState({ posts: response.data })
    }

    render() {
        const state = this.state

        return(
            <main className="feed">
                {state.posts.map(post => (
                    <article className="post-card" key={post._id}>
                        <header>
                            {post.author}
                            <i className="fas fa-ellipsis-h" />
                        </header>

                        <img src={`http://localhost:3333/static/uploads/resized/${post.image}`} alt={post.author} />

                        <footer>
                            <div className="post-actions">
                                <i className="far fa-heart" />
                                <i className="far fa-comment" />
                            </div>
                            <p className="post-description">
                                <span className="author">{post.author}: </span>
                                {post.description} 
                                <span className="hashtags">{post.hashtags}</span>
                            </p>
                        </footer>
                    </article>
                ))}
            </main>
        )
    }
}

export default Feed
