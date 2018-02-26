import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  monsterScreenContainer: {
    flex: 1,
    // backgroundColor: '#191919'
    backgroundColor: 'white',
  },
  monsterHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  monsterHeaderTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: 'white',
    paddingTop: 5,
  },
  monsterHeaderTextContainerSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: 'red',
    paddingTop: 5,
  },
  monsterHeaderText: {
    fontSize: 15,
    color: '#5e5e5e',
    textAlign: 'center',
  },
  monsterHeaderTextSelected: {
    fontSize: 15,
    color: '#191919',
    textAlign: 'center',
  },
  monsterListContainer: {
    flex: 10.5,
    // marginLeft: 7.5,
    // marginRight: 7.5,
  },
  monsterFlatList: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: '#191919'
    // backgroundColor: 'white'
  },
  monsterFlatListContext: {
    paddingBottom: 10,
  },
  monsterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monsterTouchContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 7.5,
    marginRight: 7.5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#191919',
    backgroundColor: 'white',
  },
  monsterTouchContainer2: {
    flex: 1,
    borderBottomWidth: 0,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    borderColor: '#191919',
    backgroundColor: 'white',
  },
  monsterTextContainer: {
    flex: 3,
    marginTop: 5,
    marginBottom: 5,
  },
  monsterText: {
    flex: 1,
    fontSize: 20,
    color: '#191919',
  },
  monsterTypeText: {
    flex: 1,
    fontSize: 13,
    color: '#5e5e5e',
  },
  monsterImageContainer: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
  },
  monsterImage: {
    height: 65,
    width: 65,
  },
  monsterImage2: {
    height: 60,
    width: 60,
  },
});
