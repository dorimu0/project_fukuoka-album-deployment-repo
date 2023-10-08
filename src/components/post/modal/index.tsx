import React from 'react';
import { Post } from '../../../types/post.interface'; // Assuming the path is correct
import { StyledModal } from './ModalStyles'; 

type ModalProps = {
   post : Post,
   isOpen : boolean,
   onClose : () => void,
}

StyledModal.setAppElement('#root');

const CustomModal = ({post, isOpen, onClose}: ModalProps) => {

return (
   <StyledModal 
       isOpen={isOpen}
       onRequestClose={onClose}
       contentLabel="Post Modal"
   >
       <div>
           <h2>{post.title}</h2>
           {post.image.map((imgSrc:string,index:number)=>(
               <img key={index} src={imgSrc} alt={`Post ${post.id}`}/>
           ))}
           <p>User ID : {post.userId}</p>
           <p>{post.content}</p>

           {/* Close button */}
           <button onClick={onClose}>Close</button>
       </div> 
   </StyledModal> 
);
};

export default CustomModal;
