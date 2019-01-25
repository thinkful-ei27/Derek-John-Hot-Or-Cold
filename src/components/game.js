import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount from './guess-count';
import GuessList from './guess-list';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            feedback: 'Make your guess!',
            guesses: [],
            guess: ''
        }
        this.state = {...this.initialState, number: this.generateNumber()};
    }

    generateNumber() {
        return Math.floor(Math.random() * 100);
    }

    checkGuess(guess) {
        // We can provide feedback, and add the guess to 'guesses'
        return guess === this.state.number ? this.setState({ feedback: 'You won!' }) : this.hotterOrColder(guess);
    }

    hotterOrColder(guess) {
        const secret = this.state.number;
        // Will use later
        const prevGuess = this.state.guesses[this.state.guesses.length - 1];
        return (Math.abs(secret - guess) < 10) ? this.setState({ feedback: 'Hot!' })
            : (Math.abs(secret - guess) < 20) ? this.setState({ feedback: 'Kinda hot' })
                : (Math.abs(secret - guess) < 30) ? this.setState({ feedback: 'Warm' })
                    : this.setState({ feedback: 'Cold as ice' });
    }

    addGuessToState(guess) {
        this.setState({ guesses: [...this.state.guesses, guess] });
    }

    render() {
        return (
            <div>
                <Header handleNewGame={() => this.setState({...this.initialState, number: this.generateNumber()})} />
                <GuessSection
                    feedback={this.state.feedback}
                    guessValue={this.state.guess}
                    handleClick={(guess) => {
                        this.addGuessToState(guess)
                        this.checkGuess(guess)
                    }}
                    handleChange={(value) => {this.setState({guess: value})}} />
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={this.state.guesses} />
            </div>
        );
    }
}

