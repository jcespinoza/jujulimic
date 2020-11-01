import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';
import { RecorderService } from './services/RecorderService';

function App() {
  const [saveNextRecording, setSaveNextRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null as any);
  const [audioType, setAudioType] = useState(null as any);
  const [recordingService] = useState(new RecorderService());
  const [recordingHandlerSet, setRecordingHandlerSet] = useState(false);

  const onNewRecording = (event: any) => {
    console.log("Running handler..");
    console.log("Inspecting recording blob...", event);
    if(!event || !event.detail || !event.detail.recording) return;
    
    setAudioUrl(event.detail.recording.blobUrl);
    setAudioType(event.detail.recording.mimeType);
  }

/* eslint-disable */
  useEffect(() => {
    if (recordingService && !recordingHandlerSet) {
      recordingService.em.addEventListener('recording', (evt) => onNewRecording(evt));
      setRecordingHandlerSet(true);
      console.log("Handler SET");
    }
  }, [recordingService, recordingHandlerSet, saveNextRecording]);
/* eslint-enable */

  const toggleRecording = () => {
    if(isRecording){
      stopAllRecording();
    }else{
      stopAllRecording();
      setSaveNextRecording(true);
      startRecording();
    }
  }

  const startRecording = () => {
    recordingService.startRecording();
    setIsRecording(true);
    console.log("Recording now...");
  }

  const stopAllRecording = () => {
    recordingService.stopRecording();
    setIsRecording(false);
    console.log("Stoppping now...");
  }

  const audioProps = {
    src: audioUrl,
    type: audioType
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          { isRecording ? "Recording..." : "Stopped." }
        </p>
        <Row>            
          <Col>
            <audio
              {...audioProps}
              style={{ marginRight: 16, marginTop: 16 }}
              controls
            ></audio>
          </Col>
          <Col>
            <Button
              size='large'
              style={{ marginRight: 16, marginTop: 25 }}
              onClick={toggleRecording}
            >
              {/* <AudioOutlined
                className={isRecording ? 'animationColor' : ''}
                style={{ fontSize: 24 }}
              /> */}
              { isRecording ? "STOP" : "RECORD"}
              {/* <PauseOutlined
                style={{
                  fontSize: 24,
                  display: isRecording ? 'inline' : 'none',
                }}
              /> */}
            </Button>
          </Col>
        </Row>
      </header>
      <p>
        Some icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </p>
    </div>
  );
}

export default App;
