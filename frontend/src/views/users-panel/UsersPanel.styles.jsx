import styled from 'styled-components';

export const StyledPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .title {
    margin-bottom: 20px;
  }

  .users-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .user-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 250px;
    min-height: 250px;
    overflow-wrap: break-word;
  }

  .user-details {
    margin-bottom: 10px;
    word-wrap: break-word;
  }

  button {
    margin-bottom: 20px;
  }

  .edit-button,
  .delete-button {
    margin-top: auto;
  }
`;
