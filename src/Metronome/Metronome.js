import React, { Component } from 'react';
import './Metronome.css';
import click1 from '../Sounds/click1.wav'


class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };
        this.click1 = new Audio(click1)
    }

    playClick = () => {
        this.click1.play()

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }))

    }
    handleEvent = event => {
        const bpm = event.target.value;
        this.setState({ bpm })
    }
    startStop = () => {
        if (this.state.isPlaying) {
            clearInterval(this.timer);
            this.setState({
                isPlaying: false
            });
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    isPlaying: true
                },
                this.playClick
            );
        }
        this.click1.play();
    }
    render() {
        const { isPlaying, bpm } = this.state;

        return (
            <div className="metronome">
                <div>
                    <h1>{bpm} Beats Per Minute </h1>
                    <input type="range" min="0" max="250" value={bpm} onChange={this.handleEvent}></input>
                </div>
                <button onClick={this.startStop}>{isPlaying ? 'Stop' : 'Start'}</button>

            </div >
        );
    }
}

export default Metronome;
