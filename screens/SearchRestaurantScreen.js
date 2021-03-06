import React from 'react';
import { TouchableNativeFeedback, TextInput, Text, View, ScrollView } from 'react-native';
import { Icon, Button, CheckBox, Slider } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import SearchRestaurantResultGrid from './subscreens/SearchRestaurantResultGrid';
import { commonStyles, searchRestaurantStyles } from '../styles';
import Colors from '../constants/Colors';
import { getApiFilteredRestaurants } from '../network/getApiFilteredRestaurants';

const types = [ 'Asian', 'Italian', 'Israeli', 'Pizza', 'Meat', 'Vegan' ];

class SearchRestaurantScreen extends React.Component {
  constructor() {
    super();

    let selectedTypes = [];

    for (var type of types) selectedTypes[type] = false;

    this.state = {
      filterExpanded: false,
      searching: false,
      selectedTypes: selectedTypes,
      value: 50,
      name: '',
      searchExp: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Find a restaurant near you',
      headerLeft: (
        <Icon
          onPress={() =>
            navigation.navigate({
              routeName: 'AppOptions',
              action: navigation.navigate({
                routeName: 'UserProfileStack',
                params: {}
              })
            })}
          name="menu"
          size={30}
        />
      )
    };
  };

  handleSearch() {
    let expression = '?search=name==*' + this.state.name + '*';
    let found = false;
    let count = 0;
    for (var type of types) {
      if (this.state.selectedTypes[type]) {
        if (!found) {
          expression = expression + ';';
          found = true;
        }
        if (count > 0) {
          expression = expression + ' or ';
        }
        expression = expression + 'restTypes==*' + type + '*';
        count++;
      }
    }
    this.setState({ searchExp: expression });
  }

  render() {
    return (
      <View>
        <View style={{ height: this.state.filterExpanded ? 400 : 55 }}>
          <Grid style={[ searchRestaurantStyles.searchBar, commonStyles.shadowMedium ]}>
            <Row style={{ height: 50 }}>
              <Col style={[ commonStyles.justifyCenter, commonStyles.stretch ]}>
                <TextInput
                  style={[ commonStyles.input, commonStyles.textSmall ]}
                  underlineColorAndroid="transparent"
                  placeholder="Enter restaurant name..."
                  placeholderTextColor={Colors.lightGrey}
                  autoCapitalize="none"
                  onChangeText={(name) => this.setState({ name: name })}
                  value={this.state.name}
                />
              </Col>
              {!this.state.filterExpanded && (
                <Col style={commonStyles.miniIcons}>
                  <TouchableNativeFeedback onPress={() => this.handleSearch()}>
                    <Icon name="search" size={25} />
                  </TouchableNativeFeedback>
                </Col>
              )}
              <Col style={commonStyles.miniIcons}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.setState({
                      filterExpanded: !this.state.filterExpanded
                    })}
                >
                  <Icon name="filter-list" size={25} />
                </TouchableNativeFeedback>
              </Col>
            </Row>
            <Row>
              <Col>
                {this.state.filterExpanded && (
                  <View style={[ commonStyles.container, commonStyles.textCenter ]}>
                    <Grid>
                      <Row size={6}>
                        <Col style={commonStyles.justifyCenter}>
                          {types.map((type, i) => i % 2 === 0 && this.renderCheckBox(type, i))}
                        </Col>
                        <Col style={commonStyles.justifyCenter}>
                          {types.map((type, i) => i % 2 !== 0 && this.renderCheckBox(type, i))}
                        </Col>
                      </Row>
                      {/* <Row
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10
                        }}
                        size={3}
                      >
                        <Col
                          style={[
                            commonStyles.justifyCenter,
                            commonStyles.container,
                            { paddingTop: 10, paddingBottom: 0 }
                          ]}
                        >
                          <Slider
                            value={this.state.value}
                            onValueChange={(value) => this.setState({ value })}
                            minimumValue={0.1}
                            maximumValue={50}
                            thumbTintColor={Colors.tintColor}
                          />
                          <Text>Distance: {Number(this.state.value).toFixed(1)} km</Text>
                        </Col>
                      </Row> */}
                      <Row style={[ commonStyles.justifyCenter, commonStyles.centered ]} size={2}>
                        <Button
                          title={'Search'.toUpperCase()}
                          onPress={async () => {
                            this.handleSearch();
                            this.setState({ searching: true });
                            setTimeout(() => {
                              this.setState({
                                searching: false,
                                filterExpanded: !this.state.filterExpanded
                              });
                            }, 2000);
                          }}
                          icon={{
                            name: this.state.searching ? 'spinner' : 'search',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white'
                          }}
                          rounded
                          disabled={this.state.searching}
                          backgroundColor={Colors.tintColor}
                        />
                      </Row>
                    </Grid>
                  </View>
                )}
              </Col>
            </Row>
          </Grid>
        </View>
        <ScrollView>
          <SearchRestaurantResultGrid searchExp={this.state.searchExp} />
        </ScrollView>
      </View>
    );
  }

  renderCheckBox(type, i) {
    return (
      <CheckBox
        key={'check_' + i}
        center
        title={type}
        checkedIcon="check-circle"
        uncheckedIcon="circle-o"
        checkedColor={Colors.tintColor}
        checked={this.state.selectedTypes[type]}
        onPress={() => {
          this.state.selectedTypes[type] = !this.state.selectedTypes[type];
          this.forceUpdate();
        }}
      />
    );
  }
}

export default withNavigation(SearchRestaurantScreen);
