import { useContext, useEffect, useRef, useState } from "react";
import {
  AppState,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import WordCellInList from "../../ui_elements/dictionary/WordCellInList";
import {
  DictContext,
  getRecentlySearchedWords,
  storeRecentlySearchedWords,
} from "../../DictContext";

function DictionaryWords({ navigation }) {
  const { wholeDict } = useContext(DictContext);
  const [recentlySearchedWords, setRecentlySearchedWords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDisplayedWords, setCurrentDisplayedWords] = useState([]);
  const appState = useRef(AppState.currentState);

  useEffect(function loadRecentWords() {
    const loadData = async () => {
      const res = await getRecentlySearchedWords();
      setRecentlySearchedWords(res);
      setCurrentDisplayedWords(res);
    };
    loadData();
  }, []);

  // saveRecentWordsOnExit
  useEffect(
    function saveRecentWordsOnExit() {
      const subscription = AppState.addEventListener(
        "change",
        async (nextAppState) => {
          if (nextAppState.match(/inactive|background/)) {
            await storeRecentlySearchedWords(recentlySearchedWords);
          }

          appState.current = nextAppState;
        }
      );

      return () => {
        subscription.remove();
      };
    },
    [recentlySearchedWords]
  );

  // limitRecentWordsSize
  useEffect(
    function limitRecentWordsSize() {
      const amountOfLastWords = 20;
      if (recentlySearchedWords.length > amountOfLastWords) {
        setRecentlySearchedWords(
          recentlySearchedWords.slice(0, amountOfLastWords)
        );
      }
    },
    [recentlySearchedWords]
  );

  useEffect(() => {
    if (searchQuery === "") {
      setCurrentDisplayedWords(recentlySearchedWords);
    }
  }, [recentlySearchedWords]);

  const filterWordsBySearch = (search: string) => {
    setSearchQuery(search);
    if (search === "") {
      setCurrentDisplayedWords([...recentlySearchedWords]);
      return;
    }

    const filteredWords = Object.keys(wholeDict).reduce((acc, key) => {
      if (key.toLowerCase().startsWith(search.toLowerCase())) {
        acc[key] = wholeDict[key];
      }
      return acc;
    }, {});

    setCurrentDisplayedWords(
      Object.entries(filteredWords).map(([key, value]) => ({
        key,
        value,
      }))
    );
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
        {!searchQuery && (
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
        )}
        {currentDisplayedWords.map(({ key, value }) => {
          const word = key;
          const translations = value.translations;
          return (
            <Pressable
              key={word}
              onPress={() => {
                setRecentlySearchedWords([
                  {
                    key: word,
                    value: wholeDict[word],
                  },
                  ...recentlySearchedWords.filter((w) => w.key !== word),
                ]);
                navigation.navigate("WordTranslation", { word: word });
              }}
            >
              <WordCellInList
                word={word}
                translations={translations[0].translation}
              />
            </Pressable>
          );
        })}
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
