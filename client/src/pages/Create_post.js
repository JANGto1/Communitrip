import axios from 'axios';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../components/SearchPlace'

axios.defaults.withCredentials = true;

const maindiv = styled.div`
display: flex;
align-items: center;
`

const TitleInput = styled.input`
  margin: auto;
  width : 20vw;
  height : 4vh;
  border-radius: 5px;
  `

const TextInput = styled.textarea`
  margin: auto;
  width : 20vw;
  height : 10vh;
  border-radius: 5px;
  resize: none;
`
const Dropdownbtn = styled(DropdownButton)`
  #dropdown-item-button{
    width: 9vw;
    height: 4vh;
    line-height: 1rem;
    margin: 20px;
  }
  
`

const PreviewDiv = styled.div`
  margin-left: 10px;
  border: 5px solid rgb(122, 238, 72);
  border-radius: 20px;
  min-width: 300px;
  min-height: 300px;
  width: 22%;
  height: 20%;
  .previewImg {
    width: 300px;
    height: 300px;
  }
`

const Text = styled.textarea`
width: 400px;
height: 100px;
resize: none;
`

export default function Create_post(props) {
  const [postInfo, setpostInfo] = useState({
    user_id: `${props.userinfo.id}`,
    contents: '',
    title: '',
    tag_id: '',
    total_likes: 0,
    image: '',
    address: '',
    longitude: '',
    latitude: '',
  });

  const [coordinate, setCoordinate] = useState("");
  const [tagName, setTagName] = useState('태그');
  console.log(coordinate)

  const userId = props.userinfo.id
  const navigate= useNavigate();
  console.log(props.tags)
  console.log('렌더링...')


  const handleTags = (e) => {
    setTagName(e.name)
    const tagId = e.id
    setpostInfo((e) => {
      console.log(tagId)
      return { ...e, tag_id: tagId }
    })
    
  }
  console.log(postInfo)
  

  const handlePostInfo = (key) => (e) => {
    setpostInfo({ ...postInfo, [key]: e.target.value });
  }

  const handlesucces = () => {
    if(postInfo.contents !== '' 
    && postInfo.title !== '' 
    && postInfo.tag_id !== '' 
    // && postInfo.image !== '' 
    // && postInfo.longitude !== '' 
    // && postInfo.latitude !== ''
    ) {
      axios.post(`${process.env.REACT_APP_API_URL}/posts/${userId}`, {
        user_id: postInfo.user_id,
        contents: postInfo.contents,
        title: postInfo.title,
        tag_id: `${postInfo.tag_id}`,
        total_likes: "0",
        address: postInfo.address,
        longitude: coordinate.longitude,
        latitude: coordinate.latitude,
      }, {
        withCredentials: true
      }).then(
        navigate('/board')
      )
    }
  }

  return (
    <div>
      <center>
        <h2>게시글 작성</h2>
      <>
        <div>제목</div>
        <TitleInput type="text" onChange={handlePostInfo('title')} placeholder='제목을 입력해주세요' />
      </>
      <div>태그선택</div>
      <Dropdownbtn id="dropdown-item-button" title={tagName} >
      {props.tags?.map(tags => {
        return <Dropdown.Item 
        as="button" 
        key={tags.id}
        onClick={() =>{
          handleTags(tags)
        }}
        >
        {tags.name}
        </Dropdown.Item>
      })}
    </Dropdownbtn>
    <div>글 작성</div>
      <Text  placeholder='글을 작성해주세요' onChange={handlePostInfo('contents')} />
    <div>지도</div>
      <KakaoMap setCoordinate={setCoordinate} setpostInfo={setpostInfo} coordinate={coordinate}/>
      <button onClick={handlesucces} >작성완료</button>
      </center>
    </div>
  )
}