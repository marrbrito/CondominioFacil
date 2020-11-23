import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`

  > header {
    height: 85px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: auto;

      svg {
       color: #999591;
       width: 24px;
       height: 24;
     }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: -130px auto;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

`;

export const FiguraInput = styled.div`
  img {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    margin-bottom: 16px;
  }
`;
