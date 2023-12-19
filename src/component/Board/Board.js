import React, { useState } from 'react';
import Header from '../Main/header/header';
import './Board.css';

// 이 부분에서는 실제로는 파일에서 읽어오거나, 서버에서 데이터를 받아오는 등의 로직을 사용해야 합니다.
import boardData from '../../Board.json';

function Board() {
  const [selectedBoard, setSelectedBoard] = useState('free'); // 기본값은 'free'

  // 선택한 게시판에 따른 데이터를 가져오는 함수
  const getBoardData = () => {
    return boardData[selectedBoard];
  };

  // 선택한 게시판의 데이터
  const currentBoardData = getBoardData();

  // 버튼 클릭 시에 호출되는 함수
  const handleBoardChange = (boardType) => {
    setSelectedBoard(boardType);
  };

  return (
    <>
      <Header />
      <div className='tum'></div>
      <h1 className="Board_title">여긴 게시판 페이지</h1>
      <div className="Board_buttons">
        <button onClick={() => handleBoardChange('free')}>자유게시판</button>
        <button onClick={() => handleBoardChange('QnA')}>QnA게시판</button>
      </div>
      <div className="Board_content">
        {currentBoardData && (
          <>
            <h2>{`${selectedBoard} 게시판`}</h2>
            <table className="Board_table">
              <thead>
                <tr className='ttl'>
                  <th>ID</th>
                  <th>이름</th>
                  <th>제목</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(currentBoardData).map((postId) => (
                  <tr key={postId}>
                    <td>{postId}</td>
                    <td>{currentBoardData[postId].name}</td>
                    <td>{currentBoardData[postId].title}</td>
                    <td>{currentBoardData[postId].write}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default Board;
