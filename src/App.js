// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

type State = {
  timer: {
    hour: number;
    min: number;
    sec: number;
    ms: number;
  };
  run: number;
};

class Stopwatch extends Component {
  state: State;

  constructor() {
    super();
    this.state = {
      timer: {
        hour: 0,
        min: 0,
        sec: 0,
        ms: 0,
      },
      run: -1,
    };

    autobind(this);
  }

  start() {
    if (this.state.run === -1) {
      let running = setInterval(this.run, 100);
      this.setState({run: running});
    }
  }

  stop() {
    clearInterval(this.state.run);
    this.setState({run: -1});
  }

  run() {
    let {hour, min, sec, ms} = this.state.timer;
    ms++;
    if (ms > 9) {
      ms = 0;
      sec++;
    }
    if (sec > 59) {
      sec = 0;
      min++;
    }
    if (min > 59) {
      min = 0;
      hour++;
    }
    this.setState({
      timer: {
        hour: hour,
        min: min,
        sec: sec,
        ms: ms,
      },
    });
  }

  reset() {
    let newTimer = {
      hour: 0,
      min: 0,
      sec: 0,
      ms: 0,
    };
    this.stop();
    this.setState({
      timer: newTimer,
    });
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1>
            {(this.state.timer.hour < 10) ? ('0' + this.state.timer.hour) : (this.state.timer.hour) }
            &nbsp;:&nbsp;
            {(this.state.timer.min < 10) ? ('0' + this.state.timer.min) : (this.state.timer.min)}
            &nbsp;:&nbsp;
            {(this.state.timer.sec < 10) ? ('0' + this.state.timer.sec) : (this.state.timer.sec)}
            &nbsp;:&nbsp;
            {this.state.timer.ms}
          </h1>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {
              (this.state.run !== -1) ?
              (<button type="text" onClick={this.stop}>Stop</button>) :
              (<button type="text" onClick={this.start}>Start</button>)
            }&nbsp;
            <button type="text" onClick={this.reset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
