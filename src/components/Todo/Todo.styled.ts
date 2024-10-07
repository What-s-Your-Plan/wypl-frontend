import styled from '@emotion/styled';

import { InputDefault } from '@/components/common/InputText.ts';

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: start;

  & > span {
    width: 100%;
    font-size: 13px;
    cursor: pointer;
  }
`;
const CheckBox = styled.input`
  margin-top: 6px;
  margin-right: 4px;
`;

const IconButton = styled.button`
  margin-top: 4px;
  cursor: pointer;
  margin-left: 5px;
`;
const TodoElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > div {
        width: 12px;
    }
`;

const SubmitDiv = styled.div`
  margin-top: 6px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledInputDefault = styled(InputDefault)`
  font-size: 0.85rem;
  cursor: pointer;
  background-color: transparent;
  margin-left: 3px;
`;

export {
  Form,
  CheckBox,
  Header,
  SubmitDiv,
  StyledInputDefault,
  IconButton,
  TodoElement,
};
