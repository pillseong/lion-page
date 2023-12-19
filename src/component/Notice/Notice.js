import React from 'react';
import Header from '../Main/header/header';
import './Notice.css';

const executives = [
  {
    role: '프론트엔드',
    members: [
      { name: '옥주용', position: '프론트장', major: '컴퓨터 공학과' },
      { name: '정필성', position: '프론트 보조', major: '정보통신 공학과' },
    ],
  },
  {
    role: '백엔드',
    members: [
      { name: '채성수', position: '백엔드장', major: '컴퓨터 공학과' },
      { name: '육종범', position: '백엔드 보조', major: '컴퓨터 공학과' },
      { name: '서민재', position: '백엔드 보조', major: '컴퓨터 공학과' },
    ],
  },
];

function Notice() {
  return (
    <>
      <Header />
      <div className='body_info'>
        <h1 className="main_title">운영진 소개</h1>
        <div className="main_info">
            {executives.map((group, index) => (
            <div key={index} className={group.role.toLowerCase()}>
                <br/>
                {group.members.map((member, memberIndex) => (
                <div key={memberIndex}>
                    <span>{`${member.name} [${member.position}]`}</span>
                    <p>{member.major}</p>
                    <br />
                    <hr />
                </div>
                ))}
            </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Notice;