import React, { Component } from 'react'
import bookMarkContext from './bookMarkContext'
import {withRouter} from 'react-router-dom';

class UpdateForm extends Component {

constructor(props){
  super(props)

  this.state ={
    title:'',
    url:'',
    description:'',
  }
}

componentDidMount(){
  console.log("RUNNING DID MOUNT AGAIN")
  const bookMarkId = this.props.match.params.bookmark_id
  fetch(`http://localhost:8000/bookmarks/${bookMarkId}`,{
    method:'GET',
    headers:{
      'content-type':'application-json'
    },
  })
  .then(res =>{
    return res.json()
  })
  .then(response =>{
    this.setState({
      title: response.title,
      url: response.url,
      description:response.description
    })
  })
}

handleSubmit =(id,event,context)=>{
  event.preventDefault()
  
  let bookmarkOBJ ={
    id:id,
    title:this.state.title,
    url:this.state.url,
    description:this.state.description,
    rating:5
  }
  fetch(`http://localhost:8000/bookmarks/${id}`,{
    method: 'PATCH',
    body: JSON.stringify(bookmarkOBJ),
    headers:{
      'content-type':'application/json'

    }
  })

}

updatetitle(name){
  this.setState({
    title: name
  })
}
updateurl(url){
  this.setState({
    url:url
  })
}
updatedescription(description){
  this.setState({
    description:description
  })
}
  render() {

const {title, url, description}= this.state
console.log('IN update form')
console.log(this.props.match.params.bookmark_id)
    return (
      <bookMarkContext.Consumer>
        {(context)=>(
      <section>
        <h2>Edit Article</h2>
        <form onSubmit ={(e)=>{this.handleSubmit(this.props.match.params.bookmark_id,e,context)}}>
          <h2>Title of Article</h2>
          <input
          id = 'title'
          type= 'text'
          name = 'title'
          value = {title}
          onChange = {(e)=>this.updatetitle(e.target.value)}/>

          <input 
          id = 'url'
          type= 'text'
          name = 'url'
          value = {url}
          onChange = {(e)=>this.updateurl(e.target.value)}/>
          
          <input
          id = 'description'
          type= 'text'
          name = 'description'
          value = {description}
          onChange = {(e)=>this.updatedescription(e.target.value)}/>
           <input  type = 'submit' value= 'Submit'
                />
        </form>
      </section>
        )}
        </bookMarkContext.Consumer>
    )
  }
}
export default withRouter(UpdateForm)