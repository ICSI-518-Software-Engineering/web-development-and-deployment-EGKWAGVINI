import { useState } from "react";

const ComputationScreen = () => {
  const [frontEndNumbers, setFrontEndNumbers] = useState({});
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addFrontEnd = () => {
    if (frontEndNumbers.number1 !== "" && frontEndNumbers.number2 !== "") {
      setResult1(Number(frontEndNumbers.number1) + Number(frontEndNumbers.number2));
      setErrorMessage('');
    } else {
      setResult1('');
      setErrorMessage('Please fill all values');
    }
  }

  const addBackend = async () => {
    if (frontEndNumbers.number1 !== "" && frontEndNumbers.number2 !== "") {
      try {
        const response = await fetch('http://ec2-18-117-195-78.us-east-2.compute.amazonaws.com/addNumbers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(frontEndNumbers)
        });

        const responseData = await response.json();
        if (responseData.result)
          setResult2(responseData.result);
        else
          setErrorMessage(responseData.error);
      } catch (e) {
        console.log(e);
        setErrorMessage('Please enter all values');
      }
    } else {
      setResult2('');
      setErrorMessage('Please fill all values');
    }
  }

  return (
    <div className="container">
      <div className="px-5 py-5">
        <h5>Frontend</h5>
        <label>Number 1 <span className="text-danger">*</span></label>
        <input type="number" className="form-control" onChange={(e) => setFrontEndNumbers({ ...frontEndNumbers, number1: e.target.value })} placeholder="Enter Number 1" />
        <br />
        <label>Number 2 <span className="text-danger">*</span></label>
        <input type="number" className="form-control" onChange={(e) => setFrontEndNumbers({ ...frontEndNumbers, number2: e.target.value })} placeholder="Enter Number 2" />
        <span className='text-danger'>{errorMessage}</span>
        <br />
        <button onClick={() => { addFrontEnd(); addBackend(); }} className="btn btn-primary">Add</button>
        <br />
        <span className="h2">Result 1 : {result1}</span>
        <br />
        <span className="h2">Result 2 : {result2}</span>
      </div>
    </div>
  );
}

export default ComputationScreen;
