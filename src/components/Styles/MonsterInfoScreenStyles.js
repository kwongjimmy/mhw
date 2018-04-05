import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  infoScreenContainer: {
    flex: 1,
    // backgroundColor: '#191919',
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: 'white',
    paddingTop: 5,
  },
  headerTextContainerSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: '#ff6666',
    paddingTop: 5,
  },
  headerText: {
    fontSize: 15,
    color: '#5e5e5e',
    textAlign: 'center',
  },
  headerTextSelected: {
    fontSize: 15,
    color: '#191919',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 10.5,
    // backgroundColor: '#191919',
  },
  monsterHitContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  monsterHitText: {
    flex: 1,
    fontSize: 13,
    color: '#191919',
    // paddingTop: 5,
    // paddingBottom: 5,
    textAlign: 'center',
  },
  monsterExtractContainer: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#191919',
    height: 15,
    width: 15,
  },
  monsterFlatListContext: {
    paddingBottom: 5,
  },
});
