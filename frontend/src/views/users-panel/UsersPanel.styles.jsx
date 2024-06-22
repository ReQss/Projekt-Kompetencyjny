import styled from 'styled-components';

export const PanelContainerStyled = styled.div`
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

    .user-card {
      display: flex;
      flex-direction: column;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      width: 250px;

      .user-details {
        margin-bottom: 10px;
      }
    }
  }
`;