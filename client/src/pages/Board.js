import React,{ useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Boardpostform from './Boardpostform';
axios.defaults.withCredentials = true;

export const Allpage = styled.div`
width : 99vw;
height : 90vh;
margin: 0 auto;
`
export const Options = styled.div`
width : 99vw;
height : 4vh;
background-color : green;
`
export const Boardbutton = styled.button`
margin-right : 25px
`
export const ViewBoard =styled.div`
width : 99vw;
height : 90vh;
overflow : auto;
background-color : skyblue;
`
export const Vboard = styled.div`
display: table;
margin: 0 auto;
width: 99%;
height: calc(100vh - 4rem);
`
export const Vboards = styled.div`
background-color: #bc9eff0e;
padding: 5rem;
width: 100%;
min-height: 90vh;
height: 90%;
`
export const Postbutton = styled.button`
float: right;
`
const OPTIONS = [
  { id: 1, value: "tags", name: "태그 선택" },
  { id: 2, value: "mountain", name: "산", post_id: "1" },
  { id: 3, value: "river", name: "강", post_id: "2" },
  { id: 4, value: "sea", name: "바다", post_id: "3" },
  { id: 5, value: "valley", name: "계곡", post_id: "4" },
];

const SelectBox = (props) => {
  const [tags, setTags] = useState('')

  const handleTags = (e) => {
      axios.get(`${process.env.REACT_APP_API_URL}/tags/${e.target.value}`).then((result) => {
          props.setPostsByTags(result)
          console.log(props.postsByTags)
      })
      setTags(e.target.value)
  }
  return (
      <select onChange={handleTags} value={tags}>
          {props.options.map((option) => (
              <option
                  key={option.value}
                  value={option.post_id}
                  defaultValue={props.defaultValue === option.value}
              >
                  {option.name}
              </option>
          ))}
      </select>
  );
};

export default function Board(props){

console.log(props)
const navigate = useNavigate();
  const [tests,settests]=useState()
  console.log(tests)
  props.onepostinfo(tests)
  
   console.log(props.onepostinfo(tests))
  const [postsinfo, setPostsinfo]=useState()
  console.log(postsinfo)
  const isPosts =() =>{
    axios.get(`${process.env.REACT_APP_API_URL}/posts`).then((res)=>{ 
    const test = res.data.data    
    setPostsinfo(test)
      }).catch(error =>{
        console.log(error)
      })
  }
  useEffect(() => {
    isPosts();
  }, []);

  const handlemovepost=(e)=>{
console.log(e)
navigate('/post',{state: {post:e}})
  }
return(
  
<Allpage>
    <Options>
    <SelectBox options={OPTIONS} postsByTags={props.postsByTags} setPostsByTags={props.setPostsByTags} defaultValue="태그 선택" />
    게시글 나열 방식  <Postbutton onClick={() => {navigate('/create_post');}}>글쓰기</Postbutton>
    </Options>
    <ViewBoard>
    <Vboard>
      <Vboards>
      {props.postsByTags === '' ?
                            postsinfo && postsinfo.map(posts => {
                                return (
                                    <Boardbutton onClick={() => { settests(posts); handlemovepost(posts) }} >
                                        <Boardpostform
                                            posts={posts}
                                            key={posts.id}
                                        />
                                    </Boardbutton>
                                )
                            }) :
                            props.postsByTags.data.results.map((posts) => {
                                return (
                                    <Boardbutton onClick={() => { settests(posts); handlemovepost(posts) }} >
                                        <Boardpostform
                                            posts={posts}
                                            key={posts.id}
                                        />
                                    </Boardbutton>
                                )
                            }
                            )}
            
      </Vboards>
    </Vboard>
    </ViewBoard>
</Allpage>


)
}
