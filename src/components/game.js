import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';

export default class Game extends React.Component {
    state = {
        number: Math.floor(Math.random() * 100),
        feedback: 'Make your guess!',
        guesses: []
    }
    checkGuess(guess) {
        // We can provide feedback, and add the guess to 'guesses'
        console.log('Number', this.state.number);
        console.log(guess);
        return guess === this.state.number ? this.setState({feedback: 'You won!'}) : this.hotterOrColder(guess);
    }

    hotterOrColder(guess) {
        const secret = this.state.number;
        return (Math.abs(secret - guess) < 10) ? this.setState({feedback: 'Hot!'})
        : (Math.abs(secret - guess) < 20) ? this.setState({feedback: 'Kinda hot'})
        : (Math.abs(secret - guess) < 30) ? this.setState({feedback: 'Warm'})
        : this.setState({feedback: 'Cold as ice'})
    }

    addGuessToGuesses(guess) {
        this.setState({guesses: [...this.state.guesses, guess]});
    }

    render () {
        return (
            <div>
                <Header />
                <GuessSection 
                    feedback={this.state.feedback} 
                    handleClick={(guess) => {
                        this.addGuessToGuesses(guess)
                        this.checkGuess(guess)}} />
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={this.state.guesses} />
            </div>
        );
    }
}

