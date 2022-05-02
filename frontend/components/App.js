import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner' /*this is not in the pjt with gabe from web 52, client side auth*/
import axios from 'axios'
import { response } from 'msw'

export const articlesUrl = 'http://localhost:9000/api/articles'
export const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') }
  const redirectToArticles = () => { navigate('/articles') }

  const logout = () => {
    window.localStorage.removeItem('token');
      setMessage('Goodbye!')
      redirectToLogin()
  }

  const login = ({ username, password }) => {
    setMessage('')
    setSpinnerOn(true)
    axios.post(loginUrl, { username, password })
      .then((res) => {
        const token = response.data.token;
        window.localStorage.setItem('token', res.data.token)
        setMessage(res.data.message)
        redirectToArticles()
      })
      .catch(err => {
      // to do, render on screen (√)
        setMessage(err.response.data.message)
      .finally(() => {
          setSpinnerOn(false)
      })
      })
  }

  const getArticles = () => {
    redirectToLogin()
    //we attach the token from local storage in to the request using the authorization header

    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.(√)
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => {
  //we attach an authorization header containing the token from local storage in to the request using the authorization header

    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <React.StrictMode>
      <Spinner />
      <Message />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="articles" element={
            <>
              <ArticleForm />
              <Articles />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </React.StrictMode>
  )
}
