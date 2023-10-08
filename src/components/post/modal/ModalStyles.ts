import styled from 'styled-components';
import Modal from 'react-modal';

export const StyledModal = styled(Modal)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vh;
    background-color: gray;
    padding: 20px;
    
    img {
        width: 30%;
        height: 30%;
        max-width: 100%; // image will not exceed the container's width
        max-height: calc(100% - (20px * 2)); // image will not exceed the container's height minus padding
        object-fit: contain; 
        display:block; 
        margin:auto; 
     }
`;