import React from "react";
import { View, Alert, StyleSheet, ActivityIndicator } from "react-native";

import {
  Title,
  Appbar,
  Avatar,
  IconButton,
  Subheading,
  Card
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

class Home extends React.Component {
  fetchData = async () => {
    let mydata = null;
    await axios
      .get("https://corona.lmao.ninja/countries/World")
      .then(response => {
        mydata = response.data;
        this.setState({
          Objects: mydata,
          refreshing: false
        });
        console.log(this.state.Objects, "asasas");
      })
      .catch(function(error) {
        Alert.alert("Error", "There was problem in fetching data.");
      });

    this.setState({
      Objects: mydata,
      refreshing: false
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      Objects: null,
      refreshing: true
    };
    this.fetchdata = this.fetchData.bind(this);
  }

  render() {
    if (this.state.refreshing === true) {
      this.fetchData();
      return (
        <View style={{ flex: 1 }}>
          <Appbar.Header style={{ backgroundColor: "black" }}>
            <IconButton icon="battlenet" color="white" />
            <Appbar.Content
              style={{ alignItems: "center" }}
              title="COVID-19"
              subtitle="World Details"
            />
            <IconButton icon="home" color="white" />
          </Appbar.Header>

          <ActivityIndicator
            color="black"
            size="large"
            style={{ marginTop: 100 }}
          />
          <Title style={{ alignSelf: "center" }}>Fetching Data...</Title>
        </View>
      );
    }
    var Updated = new Date(this.state.Objects.updated).toLocaleString();
    var subtitle = "Updated : " + Updated;
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Appbar.Header style={{ backgroundColor: "black" }}>
            <IconButton icon="battlenet" color="white" />
            <Appbar.Content
              style={{ alignItems: "center" }}
              title="COVID-19"
              subtitle="World Details"
            />
            <IconButton icon="home" color="white" />
          </Appbar.Header>
        </View>
        <ScrollView>
          <Card
            style={{
              // borderColor: "black",
              borderRadius: 10,
              borderLeftColor: "red",
              borderLeftWidth: 2,
              borderRightColor: "red",
              borderRightWidth: 2,
              margin: 30
            }}
          >
            <Card.Title
              title={this.state.Objects.country}
              subtitle={subtitle}
              left={props => (
                <Avatar.Icon
                  style={{
                    elevation: 20,
                    color: "black",
                    backgroundColor: "black"
                  }}
                  size={50}
                  icon="earth"
                />
              )}
            />
            <Card.Content>
              <Title style={styles.Title}>
                Total Cases : {this.state.Objects.cases}
              </Title>
              <Title style={styles.Title}>
                Active Cases : {this.state.Objects.active}
              </Title>
              <Title style={styles.Title}>
                Total Deaths : {this.state.Objects.deaths}
              </Title>
              <Title style={styles.Title}>
                Crtical : {this.state.Objects.critical}
              </Title>
              <Title style={styles.Title}>
                Deaths per Million : {this.state.Objects.deathsPerOneMillion}
              </Title>
              <Title style={styles.Title}>
                Cases per Million : {this.state.Objects.casesPerOneMillion}
              </Title>
              <Title style={styles.Title}>
                Total Recovered : {this.state.Objects.recovered}
              </Title>
              <Title style={styles.Title}>
                Today's Cases :{" "}
                {this.state.Objects.todayCases === undefined
                  ? "Yet to be Updated"
                  : this.state.Objects.todayCases}
              </Title>
              <Title style={styles.Title}>
                Today's Deaths :{" "}
                {this.state.Objects.todayDeaths === undefined
                  ? "Yet to be Updated"
                  : this.state.Objects.todayDeaths}
              </Title>
            </Card.Content>
          </Card>
          <Card
            style={{
              // borderColor: "black",
              borderRadius: 10,
              borderLeftColor: "blue",
              borderLeftWidth: 2,
              borderRightColor: "blue",
              borderRightWidth: 2,
              marginLeft: 30,
              marginBottom: 30,
              marginRight: 30
            }}
          >
            <Card.Title
              title="Documentation"
              left={props => (
                <Avatar.Icon
                  style={{
                    elevation: 20,
                    color: "black",
                    backgroundColor: "#4c8bf5"
                  }}
                  size={50}
                  icon="book"
                />
              )}
            />

            <Card.Content style={styles.Title}>
              <Title>Home</Title>
              <Subheading>
                Home page shows the World stats for COVID-19 , Documentation and
                Disclaimer.
              </Subheading>
            </Card.Content>

            <Card.Content style={styles.Title}>
              <Title>World Map View</Title>
              <Subheading>
                The map view shows the Coronavirus cases of the particular
                counrty where that particular marker is specified.To know the
                details of that particular Country you can tap on that marker to
                know more.
              </Subheading>
            </Card.Content>
            <Card.Content style={styles.Title}>
              <Title>Country View</Title>
              <Subheading>
                The Country view is arranged in Descending manner of the Cases
                of the Countries . To get the details of a particular Country
                you can tap on the Country in the Country Column.
              </Subheading>
            </Card.Content>
          </Card>
          <Card
            style={{
              // borderColor: "black",
              borderRadius: 10,
              borderLeftColor: "black",
              borderLeftWidth: 2,
              borderRightColor: "black",
              borderRightWidth: 2,
              marginLeft: 30,
              marginBottom: 30,
              marginRight: 30
            }}
          >
            <Card.Title
              title="Disclaimer"
              left={props => (
                <Avatar.Icon
                  style={{
                    elevation: 20,
                    color: "black",
                    backgroundColor: "red"
                  }}
                  size={50}
                  icon="alert"
                />
              )}
            />

            <Card.Content style={styles.Title}>
              <Subheading>
                The intention of this app is to provide information of COVID-19
                stats and not to spread any false information . The stats
                provided here are through a public API which may not provide
                exact stats and can vary. This mobile app is intended for
                informational purpose only. It is not, and is not intended for
                use of in the diagnosis of COVID-19 or other conditions or in
                the cure , migration , treatment or prevention of disease , in
                man or any other animal. This app has no intention to hurt any
                individual , group of people or a community. The Developer is
                not responsible if any information is found incorrect. Thank
                You!
              </Subheading>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
const styles = StyleSheet.create({
  Title: {
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderRadius: 10,
    margin: 10
  },
  Content: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderRadius: 10
  }
});
