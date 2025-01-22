import plusButton from '@/assets/icons/plus.svg';
import Box from '@/components/Common/Box/Box';
import Flex from '@/components/Common/Flex/Flex';

export interface TodoHeaderProps {
  toggleCreateTodo: (state: boolean) => void;
  isCreatingTodo: boolean;
}

function TodoHeader({ toggleCreateTodo, isCreatingTodo }: TodoHeaderProps) {
  const clickPlusButton = () => {
    toggleCreateTodo(!isCreatingTodo);
  };

  return (
    <Flex styles={{ align: 'center', justify: 'space-between' }}>
      <div className="font-bold">Todo</div>
      <Box css={{ cursor: 'pointer' }} onClick={clickPlusButton}>
        <img src={plusButton} alt="Add Todo" />
      </Box>
    </Flex>
  );
}

export default TodoHeader;
