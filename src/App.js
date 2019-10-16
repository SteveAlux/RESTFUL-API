
import './App.css';
import {NavLink} from 'react-router-dom';
import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import bookMarkContext from './bookMarkContext';
import UpdateForm from './UpdateForm'


export default class App extends Component {

updateBookMark = (bookmarkOBJ) =>{
  console.log('running!')
  

}



  render() {
    const contextValue = {
      updateBookMark : this.updateBookMark
    }

    return (
      <>
      
      <bookMarkContext.Provider value ={contextValue}>
        <Route exact path = '/'
          render = {()=>{
            return <h3><NavLink to ={`/UpdateForm/${2}`}>EDIT</NavLink></h3>
          }}
        />
        <Route exact path = '/UpdateForm/:bookmark_id'
            render = {()=>{
              return (<UpdateForm/>)
            }}
            />
        

      </bookMarkContext.Provider>
      </>
    )
  }
}

