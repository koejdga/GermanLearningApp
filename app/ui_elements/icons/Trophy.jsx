import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
const Trophy = (props) => (
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE+UlEQVR4nO2cS4gcRRjHK4r4AI3owQeixiAqvg6KxIN48IWPo3sSGZmu/79md52NG40SFSdEBPEUjeKKKD4uEh8XIUQWEQXNKkb0KqIo7IKPTdSsrsnGbSm3hWGcmu7p6emqmfl+8N22ur/vR21112NaKUEQBEEQBEEQhGGH5EkknyP5K8l4wOMggGenp6dPVKFBciYAQXHBMaNCotFoHAPgzwDExAXHH7Y2FQoiukSGcegA8LwKDfvgILnLPkiGQPABAM8E+TBsxrco9hhqUPAtiiKa3iVKj6Z/wTJ0UETLGN0voii6AsDjJOdILpA8CuAXkh+T3BpF0Rm+//XZYyQ1bLU1JbUdJTlPch/JHSQv75vg8fHxCwC8SXI1JdEjvkWx90irwTrYrbXeUKhkY8xN9iU+AAFxgBObG4uUvOK7KIYbR3qWnQwX0pOZKnvRGHN+btEk3wqgx8SDEADeyP124XrwATgEYJt9GJA8LoqiS0i+4rtYFhurAF4mebGtMan1YZJLrr+v1WqX5enNO1yStdZXOdqMJa9Cg947V4wxdzpqvNolG8D2PKLnHBfb1qmd1hq+RbHHMMZEKW4edbj5JI/ohXYXy/LuSPKdAe7Nb2eob6Oj/Xwe0YfbXSzLYjjJswD85Vsau49lm3vGHf927Q/nEf2zo0dfl7H9ewGIi7uMvVlqA3C947/hx65FA/jQkcysUmpdBtH3BSAu7jKmMqhZR/J9h+gP8oh+xJUQgAfS2htjLgxAXNxlbEyri+RDHbx0fFFoS7VaPbvDOGtX7O5OuwaATwOQF2eMfRkkVzq8vi5PTEyc2bXoRNRTHRKzk5ktKYlNBiAwzhIAJlJq2dJp5RLAkyov9g0DwBcpSe4mub5d+8nJydOTJ3kceCzbXB2C1yfLw53af97z0YRqtXoeyZ9SbvStXeVzJPpSACLT4kVH7jcD+C6lrXVzbk+Sm254bZZVPACvto5TdjeC6ZsFPuN/axS2BgCvZ6j3gNZ6kyqSZJGp7WyxJZYAPFGpVE5tkr03AKGu2PNfnjZnm3uHhaPmWOjbllaygrU/YwGLAB60syit9aYAhLYNY8w1yUzPvrYtZmy3v/BtrFbq9frx9pB2F8XM24kAyY98S22NZFI2leSYtd0u60CVhdb6DgA/+JbF8uJ7krcrH1Sr1ZPtqcthWIOmO2xtT9talW+SHZZ3A5ASFxyzxpgrVWhorW8h+VkAguJewi4duOYFQWGMuW3A1jniJOZs7mrQsHuLJF8L+VwIgL/tsFfYQRifaK032EWXwM6I/A7ghVqtdpEaNur1+ikAjM9hJbk3bS5qFODaGshOAL+VINfeY2dfT4GGDskb+vkebsdgALf6rjMIAGzvo+jHfNcX1C9vSe7pg+jZsbGxY33XFxSTa7sx3xTYk7+Ooug033UFCdcOFB4s4uGntb7Udz1Bw7XtoxWvB8NHBa31XcmMrVvJq1rre3znP1AAuDeH6Pt95y0IgiAIgjDiVCqVEwBsTtaJs5wQyhpLyQ+epko9hxEiWutzSH7Vh8Wk1in5l/ZealR7MkuQ3Cx7JHs2gM1lSW6Kuho14GffMPXnE0MHgENli7b3VKMGy+/N/4YaNSiiRfTAwzC+mh7u186H9NPHM2oYaYT31fSwvnZeFA0RPZpDB0L82vkwfTUdg/K1c0EQBEEQBEEQBFUS/wCcDHznvNs//wAAAABJRU5ErkJggg=="
        id="b"
        width={90}
        height={90}
      />
    </Defs>
  </Svg>
);
export default Trophy;
