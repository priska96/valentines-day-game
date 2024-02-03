import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {updatePlayerSummary} from '../tile-view/character/slices/characterSlice'
import {RootState} from "../store";

const GameUI :React.FC<PropsFromRedux> = ({character, updatePlayerSummary}: PropsFromRedux) => {
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

const mapStateToProps = ({character}: RootState) => ({character: character});
const mapDispatch = {updatePlayerSummary}
const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(GameUI);
