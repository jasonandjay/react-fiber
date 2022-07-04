import { TAG_ROOT, PLACEMENT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST } from "./types";

let nextUnitOfWork = null;

function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0;
  let prevSibling = null;
  console.log('newChildren.length---',newChildren.length);
  while(newChildIndex < newChildren.length){
    const newChild = newChildren[newChildIndex];

    let tag = '';
    if(newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT
    } else if(typeof newChild.type === 'string') {
      tag = TAG_HOST
    }
    let fiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null,
      return: currentFiber,
      effectTag: PLACEMENT,
      nextEffet: null,
    };
    if(newChildIndex === 0){ // 根节点
      currentFiber.child = fiber
    } else { // 不是根节点
      console.log('prevSibling--', prevSibling);
      // currentFiber.child = fiber;
      prevSibling.sibling = fiber;
    }
    prevSibling = fiber
    newChildIndex++;
  }
}

function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}


function beginWork(currentFiber) {
  // if(currentFiber.tag === TAG_ROOT) { // 根节点
    updateHostRoot(currentFiber)
  // }
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  // console.log('currentFiber:',currentFiber)
  if (currentFiber.child) {
    return currentFiber.child;
  }
  while(currentFiber){
    if(currentFiber.sibling){
      console.log('currentFiber.sibling------');
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return;
  }
}

/**
 * [workLoop 开始工作]
 *
 * @param   {[type]}  deadline  [deadline requestIdleCallback默认传递的参数]
 *
 */
function workLoop(deadline) {
  let shouldYield = deadline.timeRemaining() > 1;
  while (nextUnitOfWork && shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

export function scheduleRoot(rootFiber) {
  nextUnitOfWork = rootFiber;
  window.requestIdleCallback(workLoop, { timeout: 1000 });
}
