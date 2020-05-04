import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Appbar,
  IconButton,
  Avatar,
  Card,
  Title,
  Subheading
} from "react-native-paper";

const CityView = props => {
  var Myobject = props.route.params;

  var Updated = new Date(Myobject.Updated).toLocaleString();
  var subtitle = "Updated : " + Updated;

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "black" }}>
        <IconButton
          icon="arrow-left"
          color="white"
          onPress={() => props.navigation.goBack()}
        />

        <Appbar.Content
          style={{ alignItems: "center" }}
          title="COVID-19"
          subtitle={Myobject.Country}
        />
        <IconButton icon="map-marker-radius" color="white" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Card>
            <Card.Title
              style={{ marginLeft: 16 }}
              title={Myobject.Country}
              subtitle={subtitle}
              left={() => (
                <Avatar.Image
                  style={{ elevation: 20 }}
                  source={{ uri: Myobject.Country_info.flag }}
                  size={50}
                />
              )}
            />
            <Card.Content style={{ marginLeft: 20 }}>
              <Title style={styles.Title}>Total Cases : {Myobject.Cases}</Title>
              <Title style={styles.Title}>
                Active Cases : {Myobject.Active}
              </Title>
              <Title style={styles.Title}>
                Total Deaths : {Myobject.Deaths}
              </Title>
              <Title style={styles.Title}>Crtical : {Myobject.Critical}</Title>
              <Title style={styles.Title}>
                Deaths per Million : {Myobject.Dpermillion}
              </Title>
              <Title style={styles.Title}>
                Cases per Million : {Myobject.Cpermillion}
              </Title>
              <Title style={styles.Title}>
                Total Recovered : {Myobject.Recovered}
              </Title>
              <Title style={styles.Title}>
                Today's Cases :{" "}
                {Myobject.Today_Cases === undefined
                  ? "Yet to be Updated"
                  : Myobject.Today_Cases}
              </Title>
              <Title style={styles.Title}>
                Today's Deaths :{" "}
                {Myobject.Today_Deaths === undefined
                  ? "Yet to be Updated"
                  : Myobject.Today_Deaths}
              </Title>
            </Card.Content>
            <Card.Content style={styles.Content}>
              <Title>Country Info</Title>
              <Subheading>Country Name : {Myobject.Country}</Subheading>
              <Subheading>Country id : {Myobject.Country_info._id}</Subheading>
              <Subheading>
                Country iso2 : {Myobject.Country_info.iso2}
              </Subheading>
              <Subheading>
                Country iso3 : {Myobject.Country_info.iso3}
              </Subheading>
              <Subheading>
                Country Latitude : {Myobject.Country_info.lat}
              </Subheading>
              <Subheading>
                Country Longitude : {Myobject.Country_info.long}
              </Subheading>
            </Card.Content>
            <Subheading style={{ alignSelf: "center", marginTop: 10 }}>
              You can find the Source in the Home page.
            </Subheading>
          </Card>
        </ScrollView>
      </View>
    </View>
  );
};

export default CityView;
const styles = StyleSheet.create({
  Title: {
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderRadius: 10
  },
  Content: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderRadius: 10
  }
});
