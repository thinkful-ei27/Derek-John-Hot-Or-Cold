import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount from './guess-count';
import GuessList from './guess-list';
import {Bar} from 'react-chartjs-2';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            feedback: 'Make your guess!',
            guesses: [],
            number1: 3,
            guess: '',
            showInfo: false,
            backgroundColor: 'hot'
        }
        this.state = { ...this.initialState, number: this.generateNumber() };
    }

    generateNumber() {
        return Math.floor(Math.random() * 100);
    }

    checkGuess(guess) {
        // We can provide feedback, and add the guess to 'guesses'
        return guess === this.state.number ? this.setState({ feedback: 'You won!', backgroundColor: 'winner' }) : this.hotterOrColder(guess);
    }

    hotterOrColder(guess) {
        const secret = this.state.number;
        // Will use later
        const prevGuess = this.state.guesses[this.state.guesses.length - 1];
        const temperature = (Math.abs(secret - guess) < 10) ? { feedback: 'Hot!', backgroundColor: 'hot' }
        : (Math.abs(secret - guess) < 20) ? { feedback: 'Kinda hot', backgroundColor: 'hot' }
            : (Math.abs(secret - guess) < 30) ? { feedback: 'Warm', backgroundColor: 'warm' }
                : { feedback: 'Cold as ice', backgroundColor: 'cool' };
        if (!prevGuess) {
            return this.setState(temperature);
        } else {
            const prevGuessDistance = Math.abs(secret - prevGuess);
            const currGuessDistance = Math.abs(secret - guess);
            const status = currGuessDistance < prevGuessDistance ? 'warmer' : 'cooler';
            return this.setState({...temperature, feedback: `You are getting ${status}. ${temperature.feedback}`});
            // return this.setState({ feedback: `You are getting ${status}`, backgroundColor: 'cool' });
        }
    }

    addGuessToState(guess) {
        this.setState({ guesses: [...this.state.guesses, guess] });
    }

    toggleHelp() {
        this.setState({ showInfo: !this.state.showInfo });
    }

    render() {
        return (
            <div>
                <Header
                    handleNewGame={() => this.setState({ ...this.initialState, number: this.generateNumber() })}
                    handleToggleHelp={() => this.toggleHelp()}
                    showHelp={this.state.showInfo}
                />
                <GuessSection
                    feedback={this.state.feedback}
                    backgroundColor={this.state.backgroundColor}
                    guessValue={this.state.guess}
                    handleClick={(guess) => {
                        this.addGuessToState(guess)
                        this.checkGuess(guess)
                    }}
                    handleChange={(value) => { this.setState({ guess: value }) }} />
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={this.state.guesses} />
                <Bar data={{
                    labels: this.state.guesses.map((guess, index) => index),
                    datasets: [{
                        label: "Guesses So Far",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: this.state.guesses,
                    }]
                    }} 
                />
            </div>
        );
    }
}

