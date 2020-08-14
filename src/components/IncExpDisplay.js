import React from "react";

function IncExpDisplay({total,pos,neg}) {
  return (
    <div>
      <div style={{textAlign:'center', marginTop: '25px'}}>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
      </div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">
            +${pos}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">
            -${Math.abs(neg)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IncExpDisplay;
