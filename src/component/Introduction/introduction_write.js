// IntroductionWrite.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Main/header/header';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './IntroductionWrite.css'; 
// import { useAuth } from '../Login/AuthContext';

function IntroductionWrite() {
  // const { loginInfo } = useAuth();
  const student_id = "20202020";
  const address = "http://172.20.10.7:3000/";
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // 추가: 파일 상태
  const [notice_time, setNoticeTime] = useState(new Date().toISOString().split('.')[0] + 'Z'); 

  useEffect(() => {
    if (id) {
      const fetchNotice = async () => {
        try {
          const response = await axios.get(`${address}notice/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
          setFile(response.data.file || null);
          setNoticeTime(response.data.notice_time || '');
        } catch (error) {
          console.error('Error fetching notice:', error);
        }
      };
      fetchNotice();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { notice_title: title, notice_comment: content, student_id, file, notice_time };

    try {
      if (id) {
        setNoticeTime(new Date().toISOString().split('.')[0] + 'Z');
        await axios.put(`${address}notice/${id}/`, data, { withCredentials: true });
      } else {
        await axios.post(`${address}notice/`, data);
      }
      navigate('/Notice');
    } catch (error) {
      console.error('Error submitting notice:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${address}notice/${id}/`);
      navigate('/Notice');
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  return (
    <div className="introduction-write-container">
      <Header />
      <h1>{id ? 'Edit Notice' : 'Create Notice'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Content:</label>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />

        {/* 추가: 파일 업로드 */}
        <label>File:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        {/* 추가: 작성 시간 */}
        <label>Notice Time:</label>
        <input type="text" value={notice_time} onChange={(e) => setNoticeTime(e.target.value)} />

        <div className="button-container">
          <button type="submit" className="submit-button">
            {id ? 'Edit' : 'Create'}
          </button>
          {id && (
            <button type="button" className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default IntroductionWrite;
