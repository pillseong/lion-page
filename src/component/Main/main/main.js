import React from 'react';
import "./main.css"
import Header from '../header/header';
import { useState, useEffect } from 'react';
import CommitInfo from './CommitInfo';

function Main() {
    const [commitData, setCommitData] = useState([]);
    useEffect(() => {
        // GitHub API 또는 원하는 데이터 소스에서 커밋 정보를 가져옴
        const fetchData = async () => {
          try {
            const response = await fetch('https://api.github.com/repos/OckJuYong/Likelion_homePage/commits');
            const data = await response.json();
            setCommitData(data);
          } catch (error) {
            console.error('Error fetching commit data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div>
            <Header />
            {commitData.map((commit, index) => (
                <CommitInfo key={index} commit={commit} />
            ))}
        </div>
    );
}

export default Main;
