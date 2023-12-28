import "./main.css"
import Header from '../header/header';
import React, { useState, useEffect } from 'react';
import CommitInfo from './CommitInfo';
// import { useAuth } from "../../Login/AuthContext";

function Main() {
    const [commitData, setCommitData] = useState([]);
    // const { loginInfo } = useAuth();
    
    useEffect(() => {
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
            <div className="commit_data">
                <div>커밋정보
                    {commitData.map((commit, index) => (
                        <CommitInfo key={index} commit={commit} />
                    ))}
                </div>
                <div>공지사항</div>
            </div>


        </div>
    );
}

export default Main;
