import React, { useState, useEffect } from 'react';
import './board_test.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Header from '../Main/header/header';

function Board_test() {
    const [movieContent, setMoviecontent] = useState({
        title: '',
        content: ''
    });

    const [viewContent, setViewContent] = useState([]);
    const [editor, setEditor] = useState(null);

    const getValue = (e) => {
        const { name, value } = e.target;
        setMoviecontent((prevContent) => ({
            ...prevContent,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log('Movie Content:', movieContent);
    }, [movieContent]);

    useEffect(() => {
        console.log('View Content:', viewContent);
    }, [viewContent]);

    const clearForm = () => {
        if (editor) {
            // CKEditor 데이터 초기화
            editor.setData('');
        }
        
        // 제목 및 내용 초기화
        setMoviecontent({ title: '', content: '' });
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
                                <hr/>
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
                        value={movieContent.title}  // value 속성 추가
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
                            setMoviecontent((prevContent) => ({
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
                    onClick={() => {
                        // 나머지 코드
                        setViewContent((prevContent) => [...prevContent, { ...movieContent }]);
                        clearForm();  // clearForm 함수 호출
                    }}
                >
                    입력
                </button>
            </div>
        </>
    );
}

export default Board_test;
