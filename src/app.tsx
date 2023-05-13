import React, {useState} from "react"
import {createRoot} from "react-dom/client"

const turretList = {
  // @ts-ignore
  "0": {label: "0/1 Challenger", asset: new URL("assets/0.webp", import.meta.url)},
  // @ts-ignore
  "1": {label: "1/1", asset: new URL("assets/1.webp", import.meta.url)},
  // @ts-ignore
  "2": {label: "2/1 Tough", asset: new URL("assets/2.webp", import.meta.url)},
  // @ts-ignore
  "3": {label: "3/1 Fearsome", asset: new URL("assets/3.webp", import.meta.url)},
  // @ts-ignore
  "4": {label: "4/1 Overwhelm", asset: new URL("assets/4.webp", import.meta.url)},
  // @ts-ignore
  "5": {label: "5/1 Quick Attack", asset: new URL("assets/5.webp", import.meta.url)},
  // @ts-ignore
  "6": {label: "6/1 Elusive :)", asset: new URL("assets/6.webp", import.meta.url)},
  // @ts-ignore
  "7": {label: "7/1 Barrier", asset: new URL("assets/7.webp", import.meta.url)},
  // @ts-ignore
  "8": {label: "8/8 Dino", asset: new URL("assets/8.webp", import.meta.url)},
}


const UIMain = () => {
  const [manaSpent, setManaSpent] = useState(0)
  const [boardSpace, setBoardSpace] = useState(1)

  const results: {[key: string]: number} = {}

  const addCalc = (result: any, boardSpace: number, manaLeft: number) => {
    const numberOfLoops = boardSpace > 1 ? Math.min(manaLeft, 8) : 1
    const chance = result.chance / numberOfLoops
    // 8 is the max amount of mana we can spend on a turret
    for (let i = 1; i <= 8; i++) {
      if (boardSpace === 1 || manaLeft === i) {
        const lastTurret = Math.min(manaLeft, 8)
        const key = (result.turrets+lastTurret).split('').sort().join('')
        results[key] = (results[key] || 0) + chance
        break
      }
      addCalc({turrets: result.turrets+i, chance: chance}, boardSpace - 1, manaLeft - i)
    }
  }

  if (manaSpent === 0) {
    // Manual case
    results["0"]= 100
  } else {
    addCalc({turrets: "", chance: 100}, boardSpace, manaSpent)
  }

  // Possibly two different ways of displaying, one the chance of getting a particular turret, the other a particular outcome

  const resultsArray = Object.entries(results).sort(([_, chanceA], [__, chanceB]) => {
    if (chanceA < chanceB)
      return 1;
    if (chanceA > chanceB)
      return -1;
    return 0;
  })

  return <div>
    <h3>Inputs:</h3>
    <div className="input-line">
      <label>Mana spent</label>
      <input type="number" value={manaSpent} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value < 0) {
          setManaSpent(0)
        } else if (value > 13) {
          setManaSpent(13)
        } else {
          setManaSpent(Number(value))
        }
      }} />
    </div>
    <div className="input-line">
      <label>Available board space</label>
      <input type="number" value={boardSpace} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value < 1) {
          setBoardSpace(1)
        } else if (value > 6) {
          setBoardSpace(6)
        } else {
          setBoardSpace(Number(value))
        }
        }} />
    </div>
    <h3>{resultsArray.length} Possible Result/s:</h3>
      {resultsArray.map(([turrets, chance]) => (<div className="item">
        <div className="chance">{Number(chance.toFixed(2))}%</div>
          <div className="turret-list">{String(turrets).split('').map(
            turret =>
            <div>
              {/* <div>{turretList[turret].label}</div> */}
              <img className="turret" src={turretList[turret].asset}></img>
            </div>
          )}</div>
        </div>
      ))}
  </div>
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<UIMain />)
