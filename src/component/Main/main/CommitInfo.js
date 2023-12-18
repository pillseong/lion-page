import React from 'react';

const CommitInfo = ({ commit }) => {
  return (
    <div className="commit-info">
      <p>
        <strong>커밋 메시지:</strong> {commit.commit.message}
      </p>
      {/* 기타 커밋 정보 표시 */}
    </div>
  );
};

export default CommitInfo;