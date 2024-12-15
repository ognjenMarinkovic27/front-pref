import React from 'react';
import { Button, Flex } from '@radix-ui/themes';

interface ButtonArrayProps {
  buttonLabels: string[];
  onButtonClick: (label: string) => void;
}

const ButtonArray: React.FC<ButtonArrayProps> = ({ buttonLabels, onButtonClick }) => {
  const handleClick = (label: string) => {
    if (onButtonClick) {
      onButtonClick(label);
    }
  };

  return (
    <Flex gap="3" direction="column" mt="auto">
      {buttonLabels.map((label, index) => (
        <Button
          key={index}
          variant="solid"
          onClick={() => handleClick(label)}
        >
          {label}
        </Button>
      ))}
    </Flex>
  );
};

export default ButtonArray;
