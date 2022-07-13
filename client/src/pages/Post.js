import React,{ useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";
import Commentsform from "./Commentsform";
import {Map, MapMarker} from 'react-kakao-maps-sdk'
axios.defaults.withCredentials = true;

export const Postimg = styled.img`
flex: 1 1 100%;
width: 70%;
height: 20%;
margin: 0;
object-fit: cover;
`
export const Commentsinput =styled.input`
width: 90%

`
export const Editbutton =styled.button`
float: right
`
export const Likebutton =styled.button`
float: right
`
export const Commentsforms =styled.div`
width: 100%;
border: 1px solid;
float: left;
`


export default function Post(props){
const location =useLocation();
const navigate=useNavigate();
console.log(location.state.post.user_id)
console.log(props.userinfo.id)
const [commentslist,setcommentslist]= useState()
const [commentsinfo,setcommentsinfo]= useState({
    comments:''
});
const userid=props.userinfo.id
console.log(userid)
const [likeuser,setlikeuser]=useState();
console.log(commentsinfo)
console.log(commentslist)
console.log(likeuser)
console.log(location.state.post.total_likes)
const Getcomments=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${location.state.post.id}/comments`).then((res)=>{ 
        const testt = res.data.comments
        console.log(testt)    
        setcommentslist(testt)
          }).catch(error =>{
            console.log(error)
          })
      }
const Getlikes=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/posts/${location.state.post.id}/likes/${props.userinfo.id}`).then((res)=>{ 
        const like = res.data.data
        console.log(like)    
        setlikeuser(like)
          }).catch(error =>{
            console.log(error)
          })
      }

const Postlikes=()=>{
    axios.post(`${process.env.REACT_APP_API_URL}/posts/${location.state.post.id}/likes`,{
        user_id: props.userinfo.id,
        post_id: location.state.post.id,
    }).then(Getlikes)
}

const Postcomment=()=>{
if(commentsinfo.comments !==''){
    axios.post(`${process.env.REACT_APP_API_URL}/posts/${location.state.post.id}/comments`,{
        user_id: props.userinfo.id,
        post_id: location.state.post.id,
        comment: commentsinfo.comments
    }).then(Getcomments)
}
}
const handleInputValue = (key) => (e) => {
    setcommentsinfo({ ...commentsinfo, [key]: e.target.value });
  };
  useEffect(() => {
    Getcomments();
    Getlikes();
    setlikeuser();
  }, []);

  const handlemoveeditpost=(e)=>{
    console.log(e)
    navigate('/editpost',{state: {post:e}})
      }
return(
 <>
 <center>
  <h1>{location.state.post.title}</h1>
  { props.userinfo.id===location.state.post.user_id ?
  <Editbutton onClick={() => {handlemoveeditpost(location.state.post)}}>
게시물 수정 버튼
  </Editbutton> : null
}
  <br /><br />
 <Postimg src={location.state.post.image} alt={location.state.post.title}></Postimg>
 <br />
 <div>
     {props.userinfo.id === likeuser ?
 <Likebutton onClick={() => {Postlikes()}}>
<FontAwesomeIcon icon={fasHeart} />
</Likebutton> :
<Likebutton onClick={() => {Postlikes()}}>
<FontAwesomeIcon icon={farHeart} />
</Likebutton>
}
</div>
<br />
 <div>{location.state.post.contents}</div>
 <br />
<Map center={{ lat: location.state.post.latitude, lng: location.state.post.longitude ,}}
style={{ width: "450px", height: "450px"}} level={4}>
  <MapMarker position={{ lat: location.state.post.latitude, lng: location.state.post.longitude,}}/> </Map>
<div>{commentslist&&commentslist.map((posts) => {
   
                                return (<Commentsforms>
                                        <Commentsform userid={userid}
                                            posts={posts}
                                            key={posts.id}
                                        />
                                        {console.log(posts)}
                                         
                                        </Commentsforms>
                                )
                            })   
}

</div>

<br />

 <Commentsinput type="comments" placeholder='댓글을 입력해주세요.' onChange={handleInputValue('comments')}/>
{props.userinfo.id ===undefined ? null :
<button onClick={() => {Postcomment()}} >확인</button>
}

 </center>
 </>
    )
}