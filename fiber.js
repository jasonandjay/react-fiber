const root = {
  key: 'root',
  type: 'div'
};
const B1 = {
  key: 'B1',
  type: 'div',
  return: root
};
const B2 = {
  key: 'B2',
  type: 'div',
  return: root
};
const C1 = {
  key: 'C1',
  type: 'div',
  return: B1
};
const C2 = {
  key: 'C2',
  type: 'div',
  return: B1
};

root.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;

let nextUnitOfWork = root;

function workLoop(idleDeadline) {
  while ((idleDeadline.timeRemaining() > 1 || idleDeadline.didTimeout) && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork) {
    console.log('spend time...', Date.now() - startTime);
    console.log('render结束了.');
  } else {
    window.requestIdleCallback(workLoop, {
      timeout: 1000
    });
  }
}

function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) {
    return fiber.child;
  }
  while (fiber) {
    completeUnitOfWork(fiber);
    if (fiber.sibling) {
      return fiber.sibling;
    }
    fiber = fiber.return;
  }
}

function completeUnitOfWork(fiber) {
  console.log('spend time...', Date.now() - startTime);
  console.log('fiber end: ', fiber.key);
}

function sleep(delay) {
  let start = Date.now();
  for (; Date.now() - start < delay ;) {}
}

function beginWork(fiber) {
  sleep(20);
  console.log('fiber start: ', fiber.key);
}

const startTime = Date.now();
window.requestIdleCallback(workLoop, {
  timeout: 1000
});