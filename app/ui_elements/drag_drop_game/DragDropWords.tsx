/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Button } from "react-native";
import { useSharedValue, runOnUI, runOnJS } from "react-native-reanimated";
import ReadyButton from "../game/ReadyButton";

import SortableWord from "./SortableWord";
import Lines from "./Lines";
import { MARGIN_LEFT } from "./Layout";
import { sharedStyles } from "../../screens/SharedStyles";

const containerWidth = Dimensions.get("window").width - MARGIN_LEFT * 2;
const styles = StyleSheet.create({
  container: {
    margin: MARGIN_LEFT,
    height: 260,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    opacity: 0,
  },
});

interface DragDropWordsProps {
  children: ReactElement<{ id: number }>[];
  checkUserAnswer: (answer: number[]) => void;
}

const DragDropWords = ({ children, checkUserAnswer }: DragDropWordsProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));

  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          return (
            <View
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height },
                },
              }) => {
                const offset = offsets[index]!;
                offset.order.value = -1;
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  "worklet";
                  if (
                    offsets.filter((o) => o.order.value !== -1).length === 0
                  ) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}
            >
              {child}
            </View>
          );
        })}
      </View>
    );
  }

  const submitAnswer = () => {
    checkUserAnswer(offsets.map((o) => o.order.value));
  };

  return (
    <View>
      <View style={styles.container}>
        <Lines />
        {children.map((child, index) => (
          <SortableWord
            key={index}
            offsets={offsets}
            index={index}
            containerWidth={containerWidth}
          >
            {child}
          </SortableWord>
        ))}
      </View>
      <ReadyButton onPress={submitAnswer}></ReadyButton>
    </View>
  );
};

export default DragDropWords;
