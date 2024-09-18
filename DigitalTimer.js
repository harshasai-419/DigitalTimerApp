import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {minutes: 25, runTime: false, seconds: 0, timer: 25}

  addMinutes = () => {
    this.setState(prevState => {
      const {runTime, minutes, timer} = prevState
      if (runTime === false) {
        return {minutes: minutes + 1, timer: timer + 1}
      }
      return null
    })
  }

  subMinutes = () => {
    this.setState(prevState => {
      const {minutes, runTime, timer} = prevState
      if (runTime === false) {
        if (minutes > 0) {
          return {minutes: minutes - 1, timer: timer - 1}
        } else {
          return {minutes: 0}
        }
      }
      return null
    })
  }

  resetTime = () => {
    clearInterval(this.timerId)
    this.setState({minutes: 25, seconds: 0, runTime: false})
  }

  TogglePlayAndPause = () => {
    this.setState(prevState => ({runTime: !prevState.runTime}))
    if (this.state.runTime === false) {
      this.timerId = setInterval(this.changeSec, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  changeSec = () => {
    this.setState(prevState => {
      const {seconds, minutes} = prevState
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.timerId)
        } else {
          return {minutes: minutes - 1, seconds: 59}
        }
      } else {
        return {seconds: seconds - 1}
      }
    })
  }

  changeSeconds = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes - 1,
      seconds: 59,
    }))
  }

  render() {
    const {minutes, runTime, seconds, timer} = this.state
    const imgUrl = runTime
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const sec = seconds > 9 ? seconds : `0${seconds}`
    const mint = minutes > 9 ? minutes : `0${minutes}`
    const timeState = runTime ? 'Running' : 'Paused'
    const altNameForpp = runTime ? 'pause icon' : 'play icon'
    return (
      <div className="total-web-con">
        <h1 className="main-head">Digital Timer</h1>
        <div className="bg-container">
          <div className="elapsed-image">
            <div className="card">
              <h1 className="time-head ">
                {mint}:{sec}
              </h1>
              <p className="clock-state">{timeState}</p>
            </div>
          </div>
          <div className="right-con">
            <div className="right-top-con">
              <div className="sub-con">
                <button
                  className="pp-button"
                  onClick={this.TogglePlayAndPause}
                  id="startAndPause"
                >
                  <img src={imgUrl} className="pp-image" alt={altNameForpp} />
                </button>
                <button className="settings-button st-para">
                  {runTime ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="sub-con">
                <button
                  className="pp-button st-para"
                  onClick={this.resetTime}
                  id="reset"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="pp-image"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="set-timer-para">Set Timer Limit</p>
            <div className="right-bottom-con">
              <button className="right-bottom-para" onClick={this.subMinutes}>
                -
              </button>
              <div className="increase-decrease-time">
                <p className="increase-decrease-time-para">{timer}</p>
              </div>
              <button className="right-bottom-para" onClick={this.addMinutes}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
