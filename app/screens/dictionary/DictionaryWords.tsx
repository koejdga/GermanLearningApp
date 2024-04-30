import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import WordCellInList from "../../ui_elements/dictionary/WordCellInList";
import { DictContext } from "../../DictContext";

function DictionaryWords({ navigation }) {
  const { wholeDict } = useContext(DictContext);
  const [recentlySearchedWords, setRecentlySearchedWords] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentDisplayedWords, setCurrentDisplayedWords] = useState({});

  const filterWordsBySearch = (search: string) => {
    setSearchQuery(search);
    if (search === "") {
      setCurrentDisplayedWords(wholeDict);
      return;
    }

    const filteredWords = Object.keys(wholeDict).reduce((acc, key) => {
      if (key.startsWith(search.toLowerCase())) {
        acc[key] = wholeDict[key];
      }
      return acc;
    }, {});

    setCurrentDisplayedWords(filteredWords);
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

        {Object.entries(currentDisplayedWords).map(
          ([word, translations], index) => {
            return (
              <Pressable
                key={word}
                onPress={() => {
                  // add to recently searched words
                  navigation.navigate("WordTranslation", { word: word });
                }}
              >
                <WordCellInList
                  word={word}
                  translations={translations[0].translation}
                />
              </Pressable>
            );
          }
        )}
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
