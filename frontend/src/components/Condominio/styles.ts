import styled, { css } from 'styled-components';

interface ICondominioProps {
  available: boolean;
}

export const Container = styled.div<ICondominioProps>`
  background: #f0f0f5;
  margin-top: 80px;
  border-radius: 8px;

  header {
    background: #ffb84d;
    border-radius: 8px 8px 0px 0px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    ${props =>
      !props.available &&
      css`
        opacity: 0.3;
      `};

    img {
      pointer-events: none;
      user-select: none;
    }
  }

  section.body {
    padding: 30px;
    background-color: #1E1C24;

    h2 {
      color: #ff9000;
    }

    p {
      color: #f4ede8;

      margin-top: 16px;
    }

    .price {
      font-style: normal;
      font-size: 24px;
      line-height: 34px;
      color: #39b100;

      b {
        font-weight: 600;
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;

    div.iconx-container {
      display: flex;

      button {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #3d3d4d;
        }

        & + button {
          margin-left: 6px;
        }
      }
    }

    div.icon-container {
      display: flex;

      button {
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        & + button {
          margin-left: 6px;
        }
      }

      button.icon {
        background: #fff;

        svg {
          color: #3d3d4d;
        }
      }

      button.icon2 {
        background: #ff9000;

        svg {
          color: #fff;
        }
      }

    }

    div.chama-container {
      display: flex;

      button {
        background: #ff9000;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #3d3d4d;
        }

        & + button {
          margin-left: 6px;
        }
      }
    }
  }
`;
