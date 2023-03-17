import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Color, TwitterPicker } from 'react-color';
import { Button } from '@mui/material';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const color = useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const [currentColor, setCurrentColor] = useState('#fff');
  const handleOnChange = ({ color }: any) => {
    console.log(color?.hex);
    setCurrentColor(color?.hex);
    contextRef.current.strokeStyle = color?.hex;
    contextRef.current.lineWidth = 5;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${window.innerHeight - 110}px`,
      }}
    >
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      ></canvas>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: currentColor,
          width: `${window.innerWidth}px`,
          borderTop: '5px solid black',
        }}
      >
        <TwitterPicker
          triangle="hide"
          color={currentColor}
          onChangeComplete={handleOnChange}
        />
        <Button
          variant="contained"
          onClick={() => {
            contextRef.current.strokeStyle = 'white';
            contextRef.current.lineWidth = 50;
            setCurrentColor('white');
          }}
        >
          Eraser
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            contextRef.current.clearRect(
              0,
              0,
              window.innerWidth,
              window.innerHeight
            );
          }}
        >
          Erase All
        </Button>
      </div>
    </div>
  );
}

export default App;
