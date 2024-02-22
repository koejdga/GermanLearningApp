import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
const HomePage = (props) => (
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJ0lEQVR4nO2cPW/TUBSGr1TExwCCFRATDLDBUv4BLLB5QAJFJD6PW4mAMjGWrQV+ARMDiB0m+AN8LJSJASYQtCOilQAJRJBRIkWhHym2c4+Pzyu9S5vY7/vk9qZHthyCy+VyuVwul2tErVZrL3AbWBGRVRFZyn82+hpXQbXb7cPAS6A/ahF5DRwrenxXCGFubu408GEc8og/A7MOq4BE5ArwfQvIQ+evuTzJMZMk2T3cgsY/sHw7yn/fmA8tSZIZ4O4EgMe3kjv5e7c6dg5zm2MshSao3W7vBx7vFPKIn7ZarYObHX+DlTwOejVYV6fTOQ68LQB5COtdp9M5udE5Jnl/sKw0Tc8BX4pCHvEacGH8PI0GDSAiP0uEPPQv4GZoOuhut7sHuF8B4PGt5FGv19vXSNDtTYaQCmH/HW4aBRqYHQwa/Sl7onMGC8qy7JKIfIsAeWKHOitJkpnthgUtDnUeQkTkSWyApkFnWXaijCHEQU93COn7ih6TiNwYDAz9ujnUQflVDxF5EBsWBaz+ys20hxAqsuorN8AZEfkYGxLleSVN07NBk+owhPB/K/sHcDU231oNIRQDfm9hYWFXFMjdbvdAnYYQivvZ/Pz8oalCruMQQjl+n2XZqalABs7XcQihPK+JyMVKIdd5CKFc/xaRW6UDHtwL8VBBwb4m54NZqfeBAIuxS6HXi2WCjnE1pF8TrzhoqgctIp9KA92EoQQNW0e+4Q9g+xZChJsiFaym/jRdOVAHjYPGV3T8P3V86yA6NN+jiQ/Uvwxx0NFXG76i4wPyrYN/IWj+H7/8ScRAGRRnM1UGxdlMlUFxNlNlUJzNVBkUZzNVBsXZTJVBcTZTZVCczVQZFGczVQbF2UyVQXE2U2VQnM1UGRRnM1UGxdlMlUFxNlNlUJzNVBkUZzNVBsXZTJVBcTZTZVCczVQZFGczVQbF2UyVQXG2HUtE1qsohEKLyNeYoF/FBsD0/CIaaOB6g1b0tajPFhWRN7EhUL2Xoz8pPU3To8ZhL2dZdiQoempuN9/HLHxBisi6iDzPt4voK9nlcrlcLpfL5XK5XC6XK+jTH9agJ5eEIlD4AAAAAElFTkSuQmCC"
        id="b"
        width={90}
        height={90}
      />
    </Defs>
  </Svg>
);
export default HomePage;
