import React from "react";
import CountUp from 'react-countup';

function IncExpDisplay({ total, pos, neg }) {
  //Maybe I should throw an anim here? 
  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '25px' }}>
        <h4>Your Balance</h4>
        <h1>{total < 0 && '-'} $<CountUp end={Math.abs(total)} /></h1>
      </div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">
            +$<CountUp end={pos} />
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">
            -$<CountUp end={Math.abs(neg)} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default IncExpDisplay;
