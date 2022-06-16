import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from 'styled-components';
import axios from 'axios';
import Boardpostform from './Boardpostform';
import Select from 'react-select'
import { dummyPost } from '../dummy.js';


export const Allpage = styled.div`
width : 99vw;
height : 90vh;
margin: 0 auto;
`
export const Options = styled.div`
width : 99vw;
height : 7vh;
background-color : green;
`
export const ViewBoard = styled.div`
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
width: 99%;
min-height: 90vh;
height: 90%;
`
export const Postbutton = styled.button`
float: right;
`

// export const Select = styled.select`
// 	margin: 0;
// 	min-width: 0;
// 	display: block;
// 	width: 10%;
// 	padding: 8px 8px;
// 	font-size: inherit;
// 	line-height: inherit;
// 	border: 1px solid;
// 	border-radius: 4px;
// 	color: inherit;
// 	background-color: transparent;
// 	&:focus {
// 		border-color: red;
// 	}
// `;

const OPTIONS = [
    { id: 1, value: "tags", name: "태그 선택"},
    { id: 2, value: "mountain", name: "산", post_id: "1" },
    { id: 3, value: "river", name: "강", post_id: "2" },
    { id: 4, value: "sea", name: "바다", post_id: "3"},
    { id: 5, value: "valley", name: "계곡", post_id: "4"},
];


const SelectBox = (props) => {
    const [tags, setTags] = useState('')
    const [postsByTags, setPostsByTags] = useState('');

    useEffect(() => {
        console.log('tags changed')
    })

    const handleTags = (e) => {
        axios.get(`http://localhost:8080/tags/${e.target.value}`).then((result) => {
            setPostsByTags(result)
            console.log(postsByTags)
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



export default function Board(props) {
    // console.log(props.postsinfo)
    const navigate = useNavigate();

    const [changedPosts, setChangedPosts] = useState('')

    useEffect(() => {

    })
    
    return (
        <Allpage>
            <Options>
                <SelectBox options={OPTIONS} defaultValue="태그 선택"/>
                게시글 나열 방식  <Postbutton onClick={() => { navigate('/create_post'); }}>글쓰기</Postbutton>
            </Options>
            <ViewBoard>
                <Vboard>
                    <Vboards>
                        {changedPosts ? console.log(changedPosts) : props.postsinfo && props.postsinfo.map((posts) =>
                            <Boardpostform
                                posts={posts}
                                key={posts.id}
                            />)}
                    </Vboards>
                </Vboard>
            </ViewBoard>
        </Allpage>


    )
}

/*{postsinfo.map((posts, idx)=>(
    <Boardpostform 
    posts={posts}
    key={idx}
    />))}*/