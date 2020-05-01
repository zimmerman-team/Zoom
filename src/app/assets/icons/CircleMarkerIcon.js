import React from "react";

// const SvgCircleMarker = props => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     width={props.width}
//     height={props.height}
//     viewBox="0 0 47 48"
//     style={{ margin: props.margin }}
//     {...props}
//     fill="rgba(255, 255, 255, 0.65)"
//   >
//     <defs>
//       <path
//         id="md6ga"
//         d="M256 106.5c0-10.217 8.283-18.5 18.5-18.5s18.5 8.283 18.5 18.5-8.283 18.5-18.5 18.5-18.5-8.283-18.5-18.5z"
//       />
//       <mask id="md6gc" width="2" height="2" x="-1" y="-1">
//         <path fill="#fff" d="M256 88h37v37h-37z" />
//         <use xlinkHref="#md6ga" />
//       </mask>
//       <filter
//         id="md6gb"
//         width="65"
//         height="67"
//         x="242"
//         y="74"
//         filterUnits="userSpaceOnUse"
//       >
//         <feOffset dy="2" in="SourceGraphic" result="FeOffset1023Out" />
//         <feGaussianBlur
//           in="FeOffset1023Out"
//           result="FeGaussianBlur1024Out"
//           stdDeviation="1.6 1.6"
//         />
//       </filter>
//     </defs>
//     <g transform="translate(-251 -84)">
//       <g filter="url(#md6gb)">
//         <use
//           fill="none"
//           strokeOpacity="0.5"
//           strokeWidth="0"
//           mask='url("#md6gc")'
//           xlinkHref="#md6ga"
//         />
//         <use fillOpacity="0.5" xlinkHref="#md6ga" />
//       </g>
//       <use fill="#fff" fillOpacity="0.65" xlinkHref="#md6ga" />
//       <use
//         fill="#fff"
//         fillOpacity="0"
//         stroke="#87f013"
//         strokeMiterlimit="50"
//         strokeWidth="4"
//         xlinkHref="#md6ga"
//       />
//     </g>
//   </svg>
// );
//
// export default SvgCircleMarker;

// import React from "react";

const SvgCircleMarker = (props) => (
  <svg
    width={82}
    height={82}
    viewBox="0 0 82 82"
    style={{ margin: props.margin }}
    {...props}
  >
    <defs>
      <circle id="a" cx={6} cy={6} r={6} />
    </defs>
    <g transform="matrix(-1 0 0 1 82 0)" fill="none" fillRule="evenodd">
      <circle
        strokeOpacity={0.4}
        stroke="#25BAA4"
        fillOpacity={0.25}
        fill="#25BAA4"
        cx={41}
        cy={41}
        r={40.5}
      />
      <use fill="#21D4B9" xlinkHref="#a" transform="translate(35 35)" />
    </g>
  </svg>
);

export default SvgCircleMarker;
