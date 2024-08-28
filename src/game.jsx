import React, { useState } from 'react';
import './game.css';

const cardsDeck = [
  '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
  '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
  '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
  '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC'
];

const Game = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [buttonLabel, setButtonLabel] = useState('Start');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const getCardSets = () => {
    // Define some predefined sets
    const sets = {
      allAces: ['KH','JD','5C', 'AC','AH', 'AD'],
      allAces1: ['AH', 'AD', 'AS' , 'KH','JD','5C'],
      allKings: ['KH', 'KD', 'KS', '5C', 'AH' ,'10S'],
      allKings1: ['5C', 'AH' ,'10S', 'KH', 'KD', 'KS'],
      allQueens: ['QH', 'QD', 'QS', 'QC', '5C', '10S'],
      allQueens1: ['5C', '10S', '5S', 'QD', 'QS', 'QC'],
      allJacks: ['JH', 'JD', 'JS', 'JC', '8C', '7S'],
      allJacks1: ['5C', 'AH' ,'10S', 'JH', 'JD', 'JS'],
      
    };
  
    // Choose a random set or arrangement
    const randomChoice = Math.random();
  
    if (randomChoice < 0.15) {
      // Pick one of the predefined sets (20% chance)
      const setKeys = Object.keys(sets);
      const setKey = setKeys[Math.floor(Math.random() * setKeys.length)];
      return sets[setKey];
    } else {
      // Generate random cards (80% chance)
      const shuffledDeck = [...cardsDeck].sort(() => 0.5 - Math.random());
      return shuffledDeck.slice(0, 6); // Adjust the number if needed
    }
  };
  
  const getRandomCards = () => {
    const cardSet = getCardSets();
    
    // Shuffle and slice cards for both players
    const player1Cards = cardSet.slice(0, 3);
    const player2Cards = cardSet.slice(3, 6);
  
    setPlayer1Cards(player1Cards);
    setPlayer2Cards(player2Cards);
    setShowCards(false);
  };
  

  const handleButtonClick = () => {
    if (!isNameEntered) {
      setIsNameEntered(true);
    } else if (buttonLabel === 'Start') {
      getRandomCards();
      setButtonLabel('Show');
    } else if (buttonLabel === 'Show') {
      setShowCards(true);
      setButtonLabel('Replay');
    } else if (buttonLabel === 'Replay') {
      getRandomCards();
      setButtonLabel('Show');
    }
  };

  return (
    <div className="game">
      {!isNameEntered ? (
        <form>
          <input
            type="text"
            placeholder="Enter Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          <button type="button" onClick={handleButtonClick}>Enter Names</button>
        </form>
      ) : (
        <>
          <div className="player">
            <h2>{player1Name}</h2>
            <div className="cards">
              <ul>
                {player1Cards.map((card, index) => (
                  <li key={index} className="card-container">
                    <div className={`card ${showCards ? 'flip' : ''}`}>
                      <div className="card-front">
                        <img src={`/cards/blank.png`} alt="Blank card" />
                      </div>
                      <div className="card-back">
                        <img src={`/cards/${card}.png`} alt={card} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={handleButtonClick}>{buttonLabel}</button>
          <div className="player">
            <h2>{player2Name}</h2>
            <div className="cards">
              <ul>
                {player2Cards.map((card, index) => (
                  <li key={index} className="card-container">
                    <div className={`card ${showCards ? 'flip' : ''}`}>
                      <div className="card-front">
                        <img src={`/cards/blank.png`} alt="Blank card" />
                      </div>
                      <div className="card-back">
                        <img src={`/cards/${card}.png`} alt={card} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
