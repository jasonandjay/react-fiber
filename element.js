const root = {key: 'root', type: 'div'};
const B1 = {key: 'B1', type: 'div', return: root};
const B2 = {key: 'B2', type: 'div', return: root};
const C1 = {key: 'C1', type: 'div', return: B1};
const C2 = {key: 'C2', type: 'div', return: B1};

root.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;

module.exports = root;