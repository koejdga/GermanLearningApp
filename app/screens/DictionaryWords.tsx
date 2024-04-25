import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import WordCellInList from "../ui_elements/dictionary/WordCellInList";

function DictionaryWords({ navigation }) {
  const generateNumbers = (start, end) => {
    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push({ word: "vend " + i, translations: "translations" });
    }
    return numbers;
  };

  let arr = generateNumbers(0, 90);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentArr, setCurrentArr] = useState(arr);

  const filterWordsBySearch = (search: string) => {
    setSearchQuery(search);
    if (search === "") {
      setCurrentArr(arr);
      return;
    }

    const filteredWords = arr.filter((obj) => {
      return obj.word.startsWith(search.toLowerCase());
    });
    setCurrentArr(filteredWords);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Пошук"
        onChangeText={(value) => filterWordsBySearch(value)}
        defaultValue={searchQuery}
      />
      <ScrollView style={styles.wordsList}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: "lightgray",
            paddingVertical: 10,
            fontSize: 15,
            paddingLeft: 7,
            backgroundColor: "lightgray",
          }}
        >
          Останні запити
        </Text>

        {currentArr.map((obj, index) => (
          <Pressable
            key={obj.word}
            onPress={() =>
              navigation.navigate("WordTranslation", { word: obj.word })
            }
          >
            <WordCellInList word={obj.word} translations={obj.translations} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "lightblue" },
  wordsList: { backgroundColor: "white", flex: 1 },
  searchBar: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginHorizontal: 5,
  },
});

export default DictionaryWords;
