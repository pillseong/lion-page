import React from 'react';
import "./main.css"
import Header from '../header/header';
// import { useState, useEffect } from 'react';
// import CommitInfo from './CommitInfo';

function Main() {
    // const [commitData, setCommitData] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch('https://api.github.com/repos/OckJuYong/Likelion_homePage/commits');
    //         const data = await response.json();
    //         setCommitData(data);
    //       } catch (error) {
    //         console.error('Error fetching commit data:', error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);

    return (
        <div>
            <Header />
            {/* 커밋정보
            {commitData.map((commit, index) => (
                <CommitInfo key={index} commit={commit} />
            ))} */}


        </div>
    );
}

export default Main;
