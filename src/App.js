import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

function App() {
  const [source, setSource] = useState("Source")
  const [destination, setDestination] = useState("Sync")
  const [boxes, setBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [newBoxText, setNewBoxText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const addBox = () => {
    const newBox = {
      id: boxes.length + 1,
      color: getRandomColor(),
      text: 'transformer_' + (boxes.length + 1),
    };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  const removeBox = (id) => {
    const updatedBoxes = boxes.filter((box) => box.id !== id);
    setBoxes(updatedBoxes);
  };

  const openModal = (id, text) => {
    setSelectedBoxId(id);
    setNewBoxText(text);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBoxId(null);
    setNewBoxText('');
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    setNewBoxText(event.target.value);
  };

  const updateBoxText = () => {
    if(source === selectedBoxId) {
      setSource(newBoxText)
    }
    else if(destination === selectedBoxId) {
      setDestination(newBoxText)
    } else {
    const updatedBoxes = boxes.map((box) => {
      if (box.id === selectedBoxId) {
        return { ...box, text: newBoxText };
      }
        return box;
      });
      setBoxes(updatedBoxes);
    }
    closeModal();
  };

  const getRandomColor = () => {
    const colors = ['green', 'yellow', 'purple', 'orange'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="App">
      <h1>Dynamic Boxes</h1>
      <button onClick={addBox}>Add Transformer</button>
      <div className="box-container">
        <div
          key="source"
          className="box"
          style={{ backgroundColor: 'white' }}
          onClick={() => openModal(source, source)}
        >
          <div className="box-text">{source}</div>
        </div>
        {boxes.map((box) => (

          <>
            <div
                className="arrow"
                style={{
                  top: '5px',
                }} />
            <div
              key={box.id}
              className="box"
              style={{ backgroundColor: 'orange' }}
              onClick={() => openModal(box.id, box.text)}
              >
                {box.text}
              </div>

          </>
        ))}

        <div 
              className="arrow"
              style={{
              top: '5px',
              }}
            />

        <div
          key="source"
          className="box"
          style={{ backgroundColor: 'white' }}
          onClick={() => openModal(destination, destination)}
        >
          <div className="box-text">{destination}</div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Box Text"
        >
          <h2>Edit Box Text</h2>
          <input
            type="text"
            value={newBoxText}
            onChange={handleInputChange}
          />
          <button onClick={updateBoxText}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </Modal>
      </div>
    </div>
  );
}

export default App;
