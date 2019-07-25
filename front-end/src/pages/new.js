import React, { Component } from 'react'
// import Axios from 'axios'

import './style.css'

class New extends Component {

    constructor(props) {
        super(props)

        this.state = {
            image: ""
        }
    }

    handlerSubmit = e => {
        e.preventDefault()
    }

    handlerImageChange = (e) => console.log(e.target.files[0])

    render() {
        return(
            <main className="new">
                <form className="form-new" onSubmit={this.handlerSubmit}>
                    <label>Imagem</label>
                    <input type="file" name="image" id="image" onChange={this.handlerImageChange} />
                    
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" />

                    <label htmlFor="place">Place</label>
                    <input type="text" name="place" id="place" />

                    <label htmlFor="desc">Description</label>
                    <input type="text" name="desc" id="desc" />

                    <label htmlFor="hashtags">Hashtags</label>
                    <input type="text" name="hashtags" id="hashtags" />

                    <input type="submit" value="Postar" />
                </form>
            </main>
        )
    }
}

export default New
