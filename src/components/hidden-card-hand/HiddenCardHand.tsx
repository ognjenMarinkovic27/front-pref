import { Flex } from "@radix-ui/themes";
import HiddenCard from "../hideen-card/HiddenCard";

interface HiddenCardHandProps {
  count: number;
}

function HiddenCardHand({ count }: HiddenCardHandProps) {
  return (
    <Flex direction={{ initial: "column", lg: "row" }}>
      {Array.from({ length: count }, (_, i) => (
        <HiddenCard key={i} />
      ))}
    </Flex>
  );
}

export default HiddenCardHand;
