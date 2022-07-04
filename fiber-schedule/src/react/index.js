import { ELEMENT_TEXT } from "./types";
const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(el => {
        return typeof el === 'object' ? el : {
          type: ELEMENT_TEXT,
          props: {
            text: el,
            children: []
          }
        }
      })
    }
  }
}

const React = {
  createElement
}

export default React;