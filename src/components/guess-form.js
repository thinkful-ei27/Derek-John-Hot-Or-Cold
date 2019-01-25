import React from 'react';

import './guess-form.css';

export default function GuessForm(props) {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.handleClick();
    };
    return (
        <form onSubmit={(e) => handleFormSubmit(e)}>
            <input type="text" name="userGuess" id="userGuess"
                className="text" maxLength="3" autoComplete="off"
                placeholder="Enter your Guess" required />
            <input type="submit" id="guessButton" className="button" name="submit" value="Guess" />
        </form>
    );
};

