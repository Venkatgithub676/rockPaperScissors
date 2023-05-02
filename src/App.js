import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {score: 0, myself: '', gameOver: false, opponent: '', result: 'WON'}

  onClickEvent = event => {
    const opponentChoice = choicesList[Math.floor(3 * Math.random())]
    const filteredId = choicesList.filter(
      each => each.imageUrl === event.target.src,
    )
    console.log(filteredId, opponentChoice)
    if (filteredId[0].id === 'ROCK' && opponentChoice.id === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (
      filteredId[0].id === 'SCISSORS' &&
      opponentChoice.id === 'PAPER'
    ) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (filteredId[0].id === 'PAPER' && opponentChoice.id === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (
      (filteredId[0].id === 'ROCK' && opponentChoice.id === 'ROCK') ||
      (filteredId[0].id === 'SCISSORS' && opponentChoice.id === 'SCISSORS') ||
      (filteredId[0].id === 'PAPER' && opponentChoice.id === 'PAPER')
    ) {
      this.setState({result: 'IT IS DRAW'})
    } else {
      this.setState(prevState => ({
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    }

    this.setState({
      myself: event.target.src,
      gameOver: true,
      opponent: opponentChoice,
    })
  }

  onClickPlayAgain = () => {
    this.setState({gameOver: false})
  }

  render() {
    const {score, myself, gameOver, opponent, result} = this.state
    // console.log(myself)

    const first = (
      <div className="upper-container">
        <div className="first-container">
          <button data-testid="rockButton" type="button" className="btns">
            <img
              onClick={this.onClickEvent}
              src={choicesList[0].imageUrl}
              className="img1"
              alt="ROCK"
            />
          </button>
          <button data-testid="scissorsButton" type="button" className="btns">
            <img
              onClick={this.onClickEvent}
              src={choicesList[1].imageUrl}
              className="img1"
              alt="SCISSORS"
            />
          </button>
        </div>
        <div className="second-container">
          <button data-testid="paperButton" type="button" className="btns">
            <img
              onClick={this.onClickEvent}
              src={choicesList[2].imageUrl}
              className="img1"
              alt="PAPER"
            />
          </button>
        </div>
      </div>
    )

    const second = (
      <div className="second-upper-container">
        <div className="result-container">
          <div className="my-self">
            <h1 className="headings">You</h1>
            <img src={myself} className="my-choice" alt="your choice" />
          </div>
          <div className="opponent">
            <h1 className="headings">Opponent</h1>
            <img
              src={opponent.imageUrl}
              className="opponent-choice"
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result">{result}</p>
        <button
          type="button"
          className="play-again"
          onClick={this.onClickPlayAgain}
        >
          PLAY AGAIN
        </button>
      </div>
    )
    const res = gameOver ? second : first

    const overlayStyles = {backgroundColor: 'transparent'}
    return (
      <div className="bg-container">
        <div className="container2">
          <div className="nav-container">
            <ul className="ul-container">
              <li>ROCK</li>
              <li>PAPER</li>
              <li>SCISSORS</li>
            </ul>
            <div className="score-container">
              <p className="score-para">Score</p>
              <p className="score-heading">{score}</p>
            </div>
          </div>
          {res}
          <Popup
            modal
            trigger={
              <button type="button" className="rules-btn">
                Rules
              </button>
            }
            overlayStyle={overlayStyles}
          >
            {close => (
              <div className="rules-container">
                <RiCloseLine onClick={() => close()} className="close-btn" />

                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="pop-up-img"
                />
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default App
