import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

const themes = [
  'Foot',
  'Basket',
  'Tennis',
  'Ping Pong',
  'Rugby',
];

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    return (
      <View style={styles.home}>
        <View style={styles.button}>
          <Button
            title="Inscription"
            color='steelblue'
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>

        <View style={styles.button}>
          <Button
          style={styles.button}
            title="Connexion"
            color='steelblue'
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>

        <View style={styles.button}>
          <Button
          style={styles.button}
            title="Choisir un thème"
            color='steelblue'
            onPress={() => this.props.navigation.navigate('Choice')}
          />
        </View>
      </View>
    );
  }
}

class ChoiceScreen extends React.Component {
  static navigationOptions = {
    title: 'Choisi un thème',
  };

  goQuestion(choice: string) {
    const { navigate } = this.props.navigation;
    navigate('Question',  {themeName : choice});
  }

  render() {
    return (
      <View style={styles.theme}>
        {
          themes.map(( item, key ) =>
            <View style={styles.button}>
              <Button
              style={styles.button}
              title={item}
              color='steelblue'
              onPress={() => this.goQuestion(item)}
              />
            </View>
          )
        }
      </View>
    );
  }
}

class QuestionScreen extends React.Component {

  static navigationOptions = {
    title: 'Question',
  };

  goQuestion(choice: string) {
    const { navigate } = this.props.navigation;
  }

  render() {
  var question = {
    initule:"Combien de joueur de foot sur un terrain ?",
    reponse:"22",
    proposition : ["11", "15", "22", "30"],
  };

  const { navigation } = this.props;
  var themeName = navigation.getParam('themeName', 'some default value');

    return (
      <View style={styles.theme}>
          <Text>{themeName}</Text>
          <Text>{question['initule']}</Text>

        {
          question['proposition'].map(( item, key ) =>
            <View style={styles.button}>
              <Button
              style={styles.button}
              title={item}
              color='steelblue'
              onPress={() => Alert.alert(item)}
              />
            </View>
          )
        }
      </View>
    );
  }
}

class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'Le gagnant est...',
  };

  render() {
    const votes = this.props.navigation.state.params.votes;

    const [name, votesCount] = _(votes)
      .toPairs()
      .maxBy(([name, votesCount]) => votesCount) || [];

    return (
      <View style={styles.container}>
        {name ?
          <Text style={styles.result}>{name} with {votesCount} votes!!</Text> :
          <Text style={styles.result}>No votes so far !</Text>
        }
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Choice: ChoiceScreen,
    Question: QuestionScreen,
    Results: ResultsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
    paddingTop: 20,
    paddingBottom: 20,
  },
  theme: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button : {
    height : 50,
    width : 200,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 20,
  },
  result: {
    fontSize: 24,
    color: 'darkviolet',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}