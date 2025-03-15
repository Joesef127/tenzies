import React from 'react'

const Dice = ({value, isHeld, holdDice}) => {

  const styles = {
    backgroundColor: isHeld ? "#59E391" : "#ffffff",
  }

  return (
    <div className='die' style={styles} onClick={holdDice}>{value}</div>
  )
}

export default Dice