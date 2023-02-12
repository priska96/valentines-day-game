import React from 'react';
import {connect} from 'react-redux';
import {updatePlayerSummary} from '../tile-view/slices/characterSlice'

const GameUI = ({character, updatePlayerSummary}) => {
    const {heroClass, playerSummary, portrait, inventory} = character;

    return (
        <div className="game-ui">
            <div className="game-ui__avatar" />
            <img src={portrait} alt={`portrait_${playerSummary.name}`}/>
            <div className="game-ui__info">
                <p>Name: {playerSummary.name}</p>
                <p>Class: {heroClass}</p>
                <p>Level: {playerSummary.level}</p>
                <p>Health: {playerSummary.health}/ {playerSummary.maxHealth}</p>
                <p className="game-ui__inventory">Inventory:<br/>
                    {inventory.map((item, idx)=>{
                        return (
                            <span key={idx}>
                                <span className={item.healing>0?"healingItem":""} onClick={()=> {
                                    if(item.healing >0) {
                                        const newHealth = playerSummary.health + item.healing > playerSummary.maxHealth?
                                            playerSummary.maxHealth : playerSummary.health + item.healing
                                        updatePlayerSummary({health: newHealth})
                                    }}}
                                >
                                    {item.item}
                                </span><br/>
                            </span>
                        )
                    })}
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = ({character}) => ({character: character});
const mapDispatch = {updatePlayerSummary}
export default connect(mapStateToProps, mapDispatch)(GameUI);
