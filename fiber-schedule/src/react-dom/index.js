import { TAG_ROOT } from "../react/types"
import { scheduleRoot } from "../react/schedule"
export const render = (element , container) => {
  let rootFilber = {
    tag: TAG_ROOT,
    stateNode: container,
    props: {
      children: [element]
    }
  };
  scheduleRoot(rootFilber);
  // console.log(rootFilber);
}