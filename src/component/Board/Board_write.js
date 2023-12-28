import React, { useState, useEffect } from 'react';
import './board_test.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Header from '../Main/header/header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Board_Write() {
    const navigate = useNavigate();
    
    const [movieContent, setMovieContent] = useState({
        student_id: 20201738,
        title: '',
        content: ''
    });
    const address = "http://13.124.78.53:8000/qna/questions/";

    const [viewContent, setViewContent] = useState([]);
    const [editor, setEditor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingPostId, setEditingPostId] = useState(null);

    const getValue = (e) => {
        const { name, value } = e.target;
        setMovieContent((prevContent) => ({
            ...prevContent,
            [name]: name === 'student_id' ? (value ? parseInt(value, 10) : '') : value,
        }));
    };

    const handleEditPost = (postId) => {
        setEditingPostId(postId);
        setIsEditMode(true);

        axios.get(`${address}/${postId}`)
            .then(response => {
                const postData = response.data;
                console.log(postData);
                setMovieContent({
                    student_id: postData.student_id,
                    title: postData.title,
                    content: postData.content
                });
            })
            .catch(error => {
                console.error('게시글 정보를 가져오는 중 오류 발생:', error);
            });
    };

    const handleCreatePost = async () => {
        try {
            if (isEditMode && editingPostId) {
                await axios.put(`${address}/${editingPostId}/`, {
                    student_id: movieContent.student_id,
                    title: movieContent.title,
                    content: movieContent.content,
                });

                console.log('게시물이 성공적으로 수정되었습니다.');
            } else {
                const response = await axios.post(`${address}`, {
                    student_id: movieContent.student_id,
                    title: movieContent.title,
                    content: movieContent.content,
                });


                clearForm();

                setViewContent((prevContent) => [...prevContent, { ...movieContent }]);

                console.log('게시물이 성공적으로 등록됨:', response.data);
            }
            setIsEditMode(false);
            setEditingPostId(null);
        } catch (error) {
            console.error('게시물 등록 또는 수정 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        console.log('Movie Content:', movieContent);
    }, [movieContent]);

    useEffect(() => {
        console.log('View Content:', viewContent);
    }, [viewContent]);

    const clearForm = () => {
        if (editor) {
            editor.setData('');
        }

        setMovieContent({ title: '', content: '' });
    };

    return (
        <>
            <Header />
            <div className="App">
                <div className='eyes'>
                    <h1>자유 게시판 초안 (테스트) </h1>
                    <div className="movie-container">
                        {viewContent.map((element, index) => (
                            <div key={index}>
                                <h2>{element.title}</h2>
                                <div>{element.content}</div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-wrapper">
                    <input
                        className="title-input"
                        type="text"
                        placeholder="제목"
                        onChange={getValue}
                        name="title"
                        value={movieContent.title}
                    />

                    <CKEditor
                        editor={ClassicEditor}
                        data={movieContent.content}
                        onReady={(editor) => {
                            console.log('Editor is ready to use!', editor);
                            setEditor(editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setMovieContent((prevContent) => ({
                                ...prevContent,
                                content: data
                            }));
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>
                <button
                    className="submit-button"
                    onClick={handleCreatePost}
                >
                    {isEditMode ? '수정 완료' : '입력'}
                </button>
            </div>
        </>
    );
}

export default Board_Write;
