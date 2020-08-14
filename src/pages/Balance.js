import React, { useState } from 'react';
import { Transition, animated } from 'react-spring/renderprops'

import IncExpDisplay from '../components/IncExpDisplay';




function Balance() {
  const [form, setForm] = useState({ text: '', amount: 0 })
  const addExpense = e => {
    e.preventDefault();
    if (form.text && form.amount) {
      setTransactions([...transactions, { id: transactions.length + 1, text: form.text, amount: Number(form.amount) }])
      setForm({ text: '', amount: 0 })
    }
  }
  const [transactions, setTransactions] = useState([
    { id: 1, text: "Flores", amount: -20 },
    { id: 2, text: "Salario", amount: 300 },
    { id: 3, text: "Livros", amount: -25 },
    { id: 4, text: "Cursos", amount: 150 },
  ]);
  let pos = transactions.filter(el => el.amount > 0).reduce((acc, el) => acc + el.amount, 0);
  let neg = transactions.filter(el => el.amount < 0).reduce((acc, el) => acc + el.amount, 0);
  let total = pos + neg;

  return (
    <div>
      <h2>Expenses Tracker</h2>
      <div className="container">
        <IncExpDisplay total={total} pos={pos} neg={neg} />
        <h3>History</h3>
        <ul id="list" className="list" >
          {transactions.map(el =>
            <Transition
              items={el}
            config={{ tension: 2000, friction: 100, precision: 1 }}
              from={{ height: 0, opacity: 0 }}
              enter={{ height: 35, opacity: 1 }}>
              {item => styles => (
                <animated.li className={item.amount < 0 ? 'minus' : 'plus'} key={item.id}  onClick={() => { setTransactions(transactions.filter(filter => filter.id !== item.id)) }} style={{ ...styles }}>
                  {item.text} <span>{item.amount < 0 && '-'} ${Math.abs(item.amount)}</span>
                </animated.li>

              )}

            </Transition>

          )}
        </ul>

        <h3>Add new transaction</h3>
        <form id="form" onSubmit={addExpense}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" id="text" value={form['text']} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="Enter text..." />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
                  (negative - expense, positive - income)
                </label>
            <input type="number" id="amount" value={form['amount']} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="Enter amount..." />
          </div>
          <button className="btn" >Add transaction</button>
        </form>
      </div>
    </div>
  );
}

export default Balance;
