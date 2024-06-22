import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px; /* Ensure the modal doesn't grow too wide */

  h2 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
      font-weight: bold;
    }

    input,
    select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box; /* Ensure padding doesn't increase the input width */
    }

    button {
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button[type='submit'] {
      background-color: #4caf50;
      color: white;
    }

    button[type='button'] {
      background-color: #f44336;
      color: white;
    }
  }
`;
