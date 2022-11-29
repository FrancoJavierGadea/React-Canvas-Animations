import styled from "styled-components";
import bg from "../../assets/images/cropper-bg.png";

const StyledContainer = styled.div`

    --grid-bg-size: 15px;
    --grid-bg-color: #ffffff20;

    max-height: 90vh;

    background-size: var(--grid-bg-size, 40px) var(--grid-bg-size, 40px);    
    background-image: repeating-linear-gradient(0deg, var(--grid-bg-color, #fff), var(--grid-bg-color, #fff) 1px, transparent 1px, transparent var(--grid-bg-size, 40px)), repeating-linear-gradient(-90deg, var(--grid-bg-color, #fff), var(--grid-bg-color, #fff) 1px, transparent 1px, transparent var(--grid-bg-size, 40px));

    background-image: url(${bg});

    padding: 0;

    overflow: auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;


export default StyledContainer;