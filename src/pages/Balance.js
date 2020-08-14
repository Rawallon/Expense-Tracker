import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring'

import IncExpDisplay from '../components/IncExpDisplay';

function Balance() {
  //Form Stuff
  const [form, setForm] = useState({ text: '', description: '', amount: 0 })
  const addExpense = e => {
    e.preventDefault();
    if (form.text && form.amount) {
      setTransactions([...transactions, { id: transactions.length + 1, text: form.text, description: form.description, amount: Number(form.amount) }])
      setForm({ text: '', description: "", amount: 0 })
    }
  }
  //
  // \/ This shouldn't be here, I'll keep it while it doesn't have back end
  const [transactions, setTransactions] = useState([
    { id: 1, text: "Flowers", description: "Good smelling", amount: -20 },
    { id: 2, text: "Salary", description: "", amount: 300 },
    { id: 3, text: "Books", description: "'twas gud!", amount: -25 },
    { id: 4, text: "Chocolate", description: "Meh!", amount: 150 },
  ]);
  let pos = transactions.filter(el => el.amount > 0).reduce((acc, el) => acc + el.amount, 0);
  let neg = transactions.filter(el => el.amount < 0).reduce((acc, el) => acc + el.amount, 0);
  let total = pos + neg;
  //

  //Animation
  const trans = useTransition(transactions, item => item.id, {
    from: { transform: 'translate3d(0,-30px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-500%,0)', opacity: 0 },
  })
  return (
    <div>
      <h2>Expenses Tracker</h2>
      <div className="container">
        <IncExpDisplay total={total} pos={pos} neg={neg} show={true} />
        <h3>History</h3>
        <ul id="list" className="list" >
          { //Maybe make this its own component?
            trans.map(({ item, key, props }) => item && <animated.li className={item.amount < 0 ? 'minus' : 'plus'} key={key} onClick={() => { setTransactions(transactions.filter(filter => filter.id !== item.id)) }} style={props}>
              <div className='data'>{item.text} <span>{item.amount < 0 && '-'} ${Math.abs(item.amount)}</span></div>
              {item.description !== "" ? <div className='desc'>{item.description}</div> : ""}
            </animated.li>
            )
          }
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
            <label htmlFor="desc">Description </label>
            <textarea id="desc" rows='5' value={form['description']} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Enter description..." />
          </div>
          <button className="btn" >Add transaction</button>
        </form>
      </div>
    </div>
  );
}

export default Balance;
