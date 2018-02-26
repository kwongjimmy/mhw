import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, AppRegistry, Image, StatusBar } from 'react-native';
import { Container, Content, Text2, List, ListItem } from 'native-base';
const routes = ['Monsters', 'Armor', 'Items', 'Quests'];
export default class Drawer extends Component {

  renderListItems = (item) => {
    return (
      <View style={{ paddingTop: 20, paddingLeft: 30 }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(item)}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: '#191919' }}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://i.imgur.com/s3jLo7B.gif"
            }}
            style={{
              height: 150,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
          </Image>
          <List
            dataArray={routes}
            // renderRow={data => {
            //   return (
            //     <ListItem
            //       button
            //       onPress={() => this.props.navigation.navigate(data)}>
            //       <Text>{data}</Text>
            //     </ListItem>
            //   );
            // }}
            renderRow={this.renderListItems}
          />
          {/* <FlatList
            keyExtractor={(item) => item}
            data={routes}
            renderItem={this.renderListItems}
          /> */}
        </Content>
      </Container>
    );
  }
}
