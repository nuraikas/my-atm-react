import React, { useState } from 'react'
import './App.css'


let cardStatus = false;
let pin_status = false;
let finish = false;
let disableAtm = false;
let count = 0;

function App() {
    const [screenValue, setScreenValue] = useState('');
    const [cash, setCash] = useState('')

    const addFunc = (num) => {
        if (cardStatus===true && finish === false && disableAtm === false) {setScreenValue(screenValue + num)}
    }

    const delFunc = () => {
        setScreenValue(screenValue.substring(0, screenValue.length-1))
    }

    const cardInsert = () => {
        cardStatus = true;
        setScreenValue('Введите пин-код')
        setTimeout(function(){setScreenValue('')}, 1000)
    }

    const end = () => {
        cardStatus = false;
        setScreenValue('Заберите карту')
        setTimeout(function(){setScreenValue('')}, 2000)
        finish = false;
    }

    
    const getMoney = () => { 
        if (cardStatus === true) {
            if (pin_status === false){
                
                if (screenValue==='1111') {
                    pin_status = true;
                    setScreenValue('Введите сумму')
                    setTimeout(function(){setScreenValue('')}, 1000)
                }
                else {
                    if (count < 3){
                        console.log(count)
                        setScreenValue('Неверный пин-код. Попробуйте ещё раз')
                        setTimeout(function(){setScreenValue('')}, 1000)
                        count = count + 1;
                        console.log(count)
                    }

                    else {
                        setScreenValue('Ваш запрос отклонён. Обратитесь в банк')
                        setTimeout(function(){setScreenValue('')}, 2000)
                        disableAtm = true;
                    }
                    
                }
            }
            else {
                countCash();
                setScreenValue('Возьмите деньги')
                setTimeout(function(){setScreenValue('')}, 1000)
                setCash(bufer)
                setTimeout(function(){setCash('')}, 2000)
                finish = !finish;
            }
        }
                
    }   
    let localScreenValue = screenValue;
    let bufer = cash;
    const countCash = () => {
        
        let cashTypes = [100, 50, 20 , 10, 5, 1]
        cashTypes.forEach(element => {
            
            while (localScreenValue >= element) {
                bufer = bufer + " " + element;
                localScreenValue = localScreenValue - element;
            }
        });
    }

    const giveCashAgain = () => {
        setScreenValue('Введите сумму')
        setTimeout(function(){setScreenValue('')}, 1000)
        countCash();
        setCash(bufer)
        setTimeout(function(){setCash('')}, 1000)
        finish = !finish;
    }

  return (
    <div className="App">
      <h1>ATM</h1>
      <div className={disableAtm === false ? "screen" : "screen disabled"}>
        {screenValue}
        <button className={finish===false ? 'screenBtn':'screenBtn active'} onClick={giveCashAgain}>Продолжить</button>
        <button className={finish===false ? 'screenBtn':'screenBtn active'} onClick={end}>Выйти</button>
      </div>
      <div className="atm-body">
        <div className="keyboard">
            <div className="numbers">
                <button onClick={() => addFunc(1)}>1</button>
                <button onClick={() => addFunc(2)}>2</button>
                <button onClick={() => addFunc(3)}>3</button>
            </div>
            <div className="numbers">
                <button onClick={() => addFunc(4)}>4</button>
                <button onClick={() => addFunc(5)}>5</button>
                <button onClick={() => addFunc(6)}>6</button>
            </div>
            <div className="numbers">
                <button onClick={() => addFunc(7)}>7</button>
                <button onClick={() => addFunc(8)}>8</button>
                <button onClick={() => addFunc(9)}>9</button>
            </div>
            <div className="numbers">
                <button onClick={delFunc}>d</button>
                <button onClick={() => addFunc(0)}>0</button>
                <button onClick={getMoney}>ok</button>
            </div>
        </div>
        <div className="card_insert">
            <hr width="160" size="20" color="black"/>
            <img className={cardStatus === true ? "card-img active" : "card-img"} onClick={cardInsert} src="visa.png" alt="visa card"/>
        </div>
        </div>
        <div className='cash'>{cash}</div>
    </div>
  );
}

export default App;