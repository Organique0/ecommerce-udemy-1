import styled from "styled-components";

//you can thank AI for creating this cool animation
export const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: 
    radial-gradient(circle, #999, transparent),
    linear-gradient(135deg, #aaa, #777),
    linear-gradient(45deg, #bbb, #888),
    linear-gradient(to right, #ccc, #999);
  background-size: 100px 100px, 200% 200%, 200% 200%, 200% 200%;
  background-position: center, center, center, center;
  animation: gradientPulse 2s ease infinite;

@keyframes gradientPulse {
  0% {
    background-size: 100px 100px, 200% 200%, 200% 200%, 200% 200%;
  }
  50% {
    background-size: 200px 200px, 200% 200%, 200% 200%, 200% 200%;
  }
  100% {
    background-size: 100px 100px, 200% 200%, 200% 200%, 200% 200%;
  }
}
`;



export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
