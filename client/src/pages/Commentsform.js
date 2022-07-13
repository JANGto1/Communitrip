import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
axios.defaults.withCredentials = true;


export const Commentss = styled.div`
float: left
`
export const Editcomments = styled.button`
float: right
`
export const Deletecomments = styled.button`
float: right
`
export const Editcommentsinput =styled.input`
width: 100%
`
export const Editcommentsbutton =styled.button`

`
export default function Commentsform(props){
console.log(props)
const [Test,setTest]=useState(false);
const [commentsinfo,setcommentsinfo]= useState({
    comments:''
});
console.log(commentsinfo)
const deleteComment =()=>{
axios.delete(`${process.env.REACT_APP_API_URL}/posts/${props.posts.post_id}/comments/${props.posts.id}`)
.then(window.location.reload())
}
const editComment =()=>{
    axios.patch(`${process.env.REACT_APP_API_URL}/posts/${props.posts.post_id}/comments/${props.posts.id}`,{
        comment:commentsinfo.comments,
    })
    .then(setTest(false),window.location.reload())
    }
    const handleInputValue = (key) => (e) => {
        setcommentsinfo({ ...commentsinfo, [key]: e.target.value });
      };
    
    return(
        <>
          
                <div key={props.posts.id}>
                    <Commentss>{props.posts.comment}</Commentss>
                   {props.userid===props.posts.user_id ? <Deletecomments onClick={() => {deleteComment()}}>삭제</Deletecomments> : null}
                   {props.userid===props.posts.user_id ? <Editcomments onClick={() => {setTest(true)}}>수정</Editcomments> : null}
                   
                </div>
                <br />
               
                {Test === true ? <Editcommentsinput type="comments" placeholder='댓글을 수정해주세요' onChange={handleInputValue('comments')} />
                 : null}{Test === true ? <Editcommentsbutton onClick={() => {editComment()}}>수정완료</Editcommentsbutton>
                 : null}
                
        </>
    )
}