import React from 'react';

import GuessForm from './guess-form';

import './guess-section.css';

export default function GuessSection(props) {
    return (
        <section>
            <h2 id="feedback" className={props.backgroundColor}>{props.feedback}</h2>
            <GuessForm guessValue={props.guessValue} handleClick={(guess) => props.handleClick(guess)} handleChange={(value) => props.handleChange(value)} />
        </section>
    );
}

