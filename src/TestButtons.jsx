import { useState } from 'react'

export default function ButtonTests() {
    const [count, setCount] = useState(0);
    function clicker(){setCount(count + 1)};
    function DependentBtn({count, onClick}) {
        return (<button onClick={onClick}>click to increment together: {count}</button>)};
    return(
      <div>
        <h3>Vite-React Testing Grounds</h3>
          <IndependentBtn />
          <IndependentBtn />
          <IndependentBtn />
        <div>
          <DependentBtn count={count} onClick={clicker} />
          <DependentBtn count={count} onClick={clicker} />
        </div>
      </div>
    )
  };

  function IndependentBtn() {
    const [something, setSomething] = useState(0); //states must be declared in parent element before being passed as child
      function handleClick (){setSomething(something + 1)};
      return (<button onClick={handleClick}>press to increment individually: {something}</button>);
      };