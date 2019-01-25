import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';

export default class Game extends React.Component {
    state = {
        number: Math.floor(Math.random() * 100),
        feedback: 'Make your guess!',
        guesses: [10, 15, 25],
        currentGuess: 0
    }
    checkGuess(guess) {
        return guess === this.state.number ? this.setState({feedback: 'You won!'}) : this.setState({feedback: 'Try again'});
    }
    render () {
        return (
            <div>
                <Header />
                <GuessSection feedback={this.state.feedback} handleClick={() => this.checkGuess(this.state.currentGuess)} />
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={this.state.guesses} />
            </div>
        );
    }
}

