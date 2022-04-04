import React from 'react'
import SVG from 'react-inlinesvg'
import { getShapes } from '../../utils/shapes.constants'

const shapeGen = (shape, width, height, style) => {
  const mockupResponse = getShapes()
  for (const item of mockupResponse) {
    if (item.shape === shape) {
      return <SVG width={width} height={height} style={style} className="cursor" src={item.image} />
    }
  }
}

// const shapeGen = (shape) => {
//   switch (shape) {
//     case 'rectangle':
//       return <rect width="100%" height="100%" />;
//     case 'circle':
//       // return <object data="./assets/mite-alt.svg" />;
//       return <use href="./assets/mite-alt.svg#haha" />;
//       // return <image xlinkHref="./assets/mite-alt.svg" alt="" />;
//       // return <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />;
//     case 'triangle':
//       return (
//         <svg viewBox="0 0 500 433" preserveAspectRatio="none">
//           <path d="m0 433l250-433 250 433h-500z" />
//         </svg>
//       );
//     default:
//       return null;
//   }
// };

const Shape = ({ elementAttr: { shape, width, height, color, transform }, zoom }) => (
  <>{shapeGen(shape, width * zoom, height * zoom, { fill: color, transform })}</>
)

export default Shape
