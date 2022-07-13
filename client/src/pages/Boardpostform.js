import React from 'react';
import styled from 'styled-components';

export const Postform = styled.div`
display: inline-block;
width: 300px;
height: 290px;
margin: 0.3rem;
background-color: white;
`
export const Postforms = styled.div`
display: flex;
width: 300px;
height: 30px;
border: 1px solid black;
`
export const Postimg = styled.img`
flex: 1 1 100%;
width: 300px;
height: 260px;
margin: 0;
object-fit: cover;
`
export const Posttitle = styled.span`
flex: 1 2 100%;
float: left;
font-weight: 400;

`
export const Postcontent = styled.div`
flex: 2 1 100%;
white-space: nowrap;
overflow:hidden;
text-overflow: ellipsis;
border-left : 1px solid black;
border-right : 1px solid black;
`
export const Postlike = styled.span`
flex: 1 3 100%;
float: right;
font-weight: 700;
`



export default function Boardpostform({posts}){

    return(
        <>
            <Postform key={posts.id}>
            <Postimg src={posts.image} alt={posts.title}/>
            <Postforms>
            <Posttitle >{posts.title}</Posttitle>
            <Postcontent>{posts.contents}</Postcontent>
            <Postlike>{posts.total_likes}</Postlike>
            </Postforms>
            
            </Postform>
        </>
    )
}