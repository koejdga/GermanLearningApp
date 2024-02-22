import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
const FontBook = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={44}
    height={44}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h44v44H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.01111)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADpklEQVR4nO2dO2gUQRjHV40PRBBRfCFWimCplRCIhVooIghXqGjgbv//ubt4RbQRIlwhKIiKle9SQUGwUEQELXzFWAg2IZWFID4SFY3BtysLEaLcbPbudndmd78/fNXdDnO/+9+3M9/MzjmOSCQSiUQikUgkEuVFJDeRPA9giORnkl7aAsAoyYckKySnOzapXC6vInnPNCRGH0+q1epixwYB6ALw3gIoXkzxuF6vd9jg5A8WwPDiDKVUySjojKYLr0HcNQZZKbXRAgBeQvHaGGgAFywA4CUUYyZBD1kAwMsD6FELAHiZB23Bh/cEtHkwnjiaxqFJ6qC9ITmaAtq4Cz1xNJuC8FsptfL/UY9SarX/moCOzlE3Lai15CJHb9X1QSm1Q0BHABnAi0KhME0HulAozPALPuLo9kH3hfhlHRbQ7YH+XiwWl4YAvZzkT8nRbNnNlyeDPAH2dQHNlkF3hQWtlNosoNkS6EHHcaaEBV2v16eSfB4j7GwO7wDsbaE/BwQ0mwLtb7yZq+GpdXm5XF4I4Ks4mqHdfFYHE8AGkusCXH1JQDO0o9cEgLxG8mLA650CmqHc/CjEePlbqVRaFOD6p3Iz5KSgd4eZAQbNGMc3J8qog3rII93d3bMawavVajMBvJnw/pe6nZ7VanUOgI8yvKMW9FGdS5VSexpcsz3A1acENMMX9/8KwECDa+4EfDFRLwpkZsJyK4b+3RfQ/Be0UmpbDKB3CmiGL+63qogXBTKROg7G2McjAprhi/ttgI5qUSD1jr6SQD9v5B60Umq9DhCA200AuhoAekveQQ/qyp6lUmkFgF9h2wLww3XdZTEuCqQadC2g7ZPNtgfgUIyLAqkFPVapVOZp2p3d4nOLb/2aiKbNBW0uCqQW9DlduwBUq+26rrsrpkWBdIJ2XXdtQLvPYqpnd+YONNMXApoC2rgLPXE0jYOT1EHzUCVHU0Abd5wnjqZxSJI6aB6g5GhaFABeycyQicDWbm2QKTgjdXRRQDN2N/cbPY4tJ7l5IGjnqoBmW4A/AXgwXhc3f2RmQEe/AOi15qjJtCvg59Zrum+5AG08p2VNujNJJWVELP8UWkkdCYjkft3NkOQ+kkuS6Efm1dPTM99/7iTj4+gRksd0+0USk3+usmkYTCZOOKZF8owFILyY451pzv4mwg4Apy2A4cUYw44t8itcWc3ZAI47tt0gx0cc/Rn5g4Vh//lH/3kY02xFIpFIJBKJRCKRyIlDfwD8+X5joz9pkwAAAABJRU5ErkJggg=="
        id="b"
        width={90}
        height={90}
      />
    </Defs>
  </Svg>
);
export default FontBook;
