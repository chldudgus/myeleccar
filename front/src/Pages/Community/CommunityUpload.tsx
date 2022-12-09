import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "components/common/Header";
import Main from "components/common/Main";
import { useNavigate } from "react-router-dom";
import * as uploadStyle from "style/CommunityUploadStyle";

const CommunityUpload = () => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const hashTagsRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [titleWarn, setTitleWarn] = useState("");
  const [contentWarn, setContentWarn] = useState("");

  const baseUrl = "http://localhost:4005";

  const toPreviousPage = () => {
    navigate(`/community`);
  };

  const validation = () => {
    if (!titleRef.current || !contentRef.current) {
      return;
    }
    if (titleRef.current?.value == "" && contentRef.current?.value == "") {
      titleRef.current?.focus();
      titleRef.current.style.borderColor = "#FF4F18";
      contentRef.current.style.borderColor = "#FF4F18";
      setTitleWarn("제목을 입력해주세요");
      setContentWarn("내용을 입력해주세요");
    } else if (titleRef.current?.value == "") {
      titleRef.current?.focus();
      titleRef.current.style.borderColor = "#FF4F18";
      contentRef.current.style.borderColor = "#303030";
      setTitleWarn("제목을 입력해주세요");
      setContentWarn("");
    } else if (contentRef.current?.value == "") {
      contentRef.current?.focus();
      titleRef.current.style.borderColor = "#303030";
      contentRef.current.style.borderColor = "#FF4F18";
      setTitleWarn("");
      setContentWarn("내용을 입력해주세요");
    } else {
      titleRef.current.style.borderColor = "#303030";
      contentRef.current.style.borderColor = "#303030";
      setTitleWarn("");
      setContentWarn("");

      return true;
    }
  };
  let uploadData;
  const uploadContent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    uploadData = {
      title,
      content,
      hashtags: hashTagsRef?.current?.value,
    };

    try {
      axios({
        method: "post",
        data: uploadData,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjhiODVjMzEtOTMzNy00ODU1LWFlZjctZmQzZTMzMWM5YzVjIiwiaWF0IjoxNjcwNTU1NjQ1fQ.g5z1XHSMydzzfP8sXuS27IRolC-dez13OqoUiZdz7pc`,
        },
        url: `${baseUrl}/community`,
      }).then(res => {
        console.log("👉res data ==>", res.data);
      });
    } catch (err) {
      console.log("err=>", err);
    }

    navigate(`/community`);
  };
  return (
    <>
      <Header />
      <Main width="950px">
        <uploadStyle.Title>
          <h2>커뮤니티 글쓰기</h2>
        </uploadStyle.Title>
        <uploadStyle.UploadContent onSubmit={uploadContent}>
          <uploadStyle.Content>
            <p>제목</p>
            <div>
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                ref={titleRef}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
              <span>{titleWarn}</span>
            </div>
          </uploadStyle.Content>
          <uploadStyle.Content>
            <p>내용</p>
            <div className="contentArea">
              <textarea
                placeholder="내용을 입력해주세요"
                ref={contentRef}
                onChange={e => {
                  setContent(e.target.value);
                }}
              ></textarea>
              <span>{contentWarn}</span>
            </div>
          </uploadStyle.Content>
          <uploadStyle.HashTags>
            <p>관련검색어</p>
            <div className="contentArea">
              <input
                placeholder="내용을 입력해주세요"
                ref={hashTagsRef}
                // onChange={e => {
                //   setHashtags(e.target.value);
                // }}
              ></input>
              <span>{contentWarn}</span>
            </div>
          </uploadStyle.HashTags>
          <uploadStyle.ButtonWrap>
            <button type="button" onClick={toPreviousPage}>
              취소하기
            </button>
            <button>등록하기</button>
          </uploadStyle.ButtonWrap>
        </uploadStyle.UploadContent>
      </Main>
    </>
  );
};

export default CommunityUpload;
