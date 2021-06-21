import { useEffect, useRef } from "react";
import { MessageResponse } from "../../graphql";
interface Props {
  messages: MessageResponse[];
  prevMessages: MessageResponse[];
}
const ScrollToBottom = ({ messages, prevMessages }: Props) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (elementRef && messages.length === prevMessages.length + 1)
      elementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [elementRef, messages, prevMessages]);
  return <div ref={elementRef} />;
};
export default ScrollToBottom;
