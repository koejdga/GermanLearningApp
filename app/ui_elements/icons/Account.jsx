import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
const Account = (props) => (
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2cS4gdRRSGT+JbcaFCFBFUguBjo4sgKBgRYoIyPhZXEQdHuuv/q2fGUWclgtJKfEBEJCqCuFA36lZBMGrUhTEqiE4GonHUqBgTTXThK9FRrpx4L1wGA7cn1V011fXBD0Nzp2+dn9N169F1RBKJRCKRSCQSiUQiUQ2SKwFkJJ8B8DbJbwD8DGCe5G8kv9brAO4riuKiirdvNySPJzlJ8iOS3SoC8KYx5gLfMYTOMpKG5N6qBi/QfmPMzb6DCZLJyclTSG46TIMHM/sfa+21vuMKCmPMGSTnXJk8IH0ybic5UhTFCmkz4+PjJwH4rAaTF2b4AZLPZVl2urSQZQBerdvkBdoFYJW0CWvtLQ2b3NdPWZadKW1gamrqGADfeTJa9Y60AWMMPJp8UNbaNRI7JLf6NprkGxIzRVGsCMBkHYnM53l+ssQKyet8m9xX1DNIko/4Nnggqx+TWCH5lm+DB7RJYgXAbEAZ/aXECsldvg0e0F6JFZL7A8roAxIrAH71bfCAfpFYIbkjAIP72iGxQocL/A60WWKF5L0BGNzX/RIrJC8OwOCDArBaYobkp75NJvlVWZbLJWZIPuHbaABPSswYY67QXeoAjNad8sslVgC84tvkAb0ssYKA1jpIzkiskHw/AIP72iqxAuDpAAzu6ymJFWvtVQEY3Nc6iRkA7/o2GcB7+hKPxIwx5mwAn3g0+mNr7VnSFkhu9GDyRmkbJEc8GH21tI1Op3M0gB8a7Jd3kzxK2gjJuxo0+jZp85kVADsbMHm2LMsjpc1Ya9fUudAU/QJSFUjeU6PRd/uOL7QTAC/VYPSL0U9MqtLpdI5wObburau0c5QxDK6MHurL2gyT0cnoqGDK6GR0VDBldP0AWO1wDH1ZA01esusesw6N3qb39B1XqLPDO0j+5WCyMq+VaaJ/7etwsNZe2svGxRo9A+AS33EsCcqyXG6MubVKLQ8An+v/tD6LzX+bsto1bNZjcMOeXNXCVCQf0MPyJPfo2ZNeDY49eg3AemPMhcPcK8uyEwG8rvWXtC3aJomkz13VM2nmf7Jwe5O70VoYheSHh+hq1vdqeSydlb48z88j+RCAb4d43Hc30Z9qvz9k6Qot+fYgyXMl4Oy9ZpHv1v2twY2NjR3rulHT09PHkXxYv2MR7dIqDCMSCsaYtYd4JKsOyXaSvNHFj5new1p7kxYhdNCuD0heKb7QH7OadkXm9Icqz/NTq7ZpYmLiNJJ3kvzCdbsAvKAFt6RJrLXn1FRGrTsQmG7Ybun1mR1r7flqpHYxKv1brxljbuh9ZksDpwn0nOTKJmuGNvbiC8PT97WPlnQcGtjp164nbR8dHT2hNqP15e0AguyGIACP12KyVrIN4UQVA5F6oXMG50YDeN53cAxPz9ZR1/n3AALrhiQAfzhd8zbGXO87KAYqnRE7MxrAo74DYqACsMGZ0SRf8x0QA5VWDXZptPMpLePRnDOjAewLIKBuoPrRmdEk/wwgoG6IirraWCKRSCQSiUQikZBW8C+0qfA9YMlnaAAAAABJRU5ErkJggg=="
        id="b"
        width={90}
        height={90}
      />
    </Defs>
  </Svg>
);
export default Account;
