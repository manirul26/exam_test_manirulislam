import React, { useState, useEffect, useRef, Component } from 'react';
import {
  SafeAreaView, View, StyleSheet,
  FlatList, Text, ActivityIndicator, Alert, ScrollView
} from 'react-native';
import ItemBox from '../component/ItemBox';
import axios from "axios";
import * as base from "../api/api";

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      page: 1,
      seed: 1,
      isLoading: false,
      isLoadingmore: false,
      totalpage: 0,
      isRefreshing: false,
      markers:0,
    };

  }
  handleRefresh = () => {
    this.setState({
        page: this.state.seed + 1,
        isRefreshing: true,
    }, () => {
        this._getDatareload();
    });
};

handleLoadMore = () => {
  if(this.state.totalpage < this.state.page)
  {
    
    console.log('no more')
    this.setState({ isLoading: false, isRefreshing: false })
  }
  else
  {
    this.setState({
      page: this.state.page + 1
  }, () => {
      this._getData();
  });

  }
};


  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      //this.init();
      console.log('back::page no...'+ this.state.page)
      //this.setState({dataSource:[], page: 0});
      this.handleRefresh()
    }); 
    this._getData()

  }

  _getData = () => {
    const { dataSource, page } = this.state;
        this.setState({ isLoading: true });       
          axios.get(base.BASE_URL + '/getcontact?page=' + page)
            .then(res => {
             this.setState({
                dataSource: page === 1 ? 
                res.data.data : [...dataSource, ...res.data.data],
              isRefreshing: false, totalpage: res.data.last_page
            });
            });
  }
  _getDatareload = () => {
    const { dataSource, seed } = this.state;
        this.setState({ isLoading: true });       
          axios.get(base.BASE_URL + '/getcontact?page=' + seed)
            .then(res => {
              this.setState({
                dataSource: seed === 1 ? 
                res.data.data : [...dataSource, ...res.data.data],
              isRefreshing: false, totalpage: res.data.last_page
            });
            console.log('total page...' + res.data.last_page)
            console.log(res.data.data)
              
            });
  }




  renderLoader = () => {
    return (
      this.state.totalpage < this.state.page ? null : this.state.isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#000" />
        </View> : null
    );
  };


  deleteItem = (id, index) => {
    this.setState({ isLoading: true });
    axios.post(base.BASE_URL + '/delete_contact',
      { id: id })
      .then(response => {
        console.log('delete' + response.data.message)
        if (response.data.message == 'success') {
          const arr = [...this.state.dataSource];
          arr.splice(index, id);
          this.setState({ dataSource: arr });
           this.handleRefresh();
        }
        else {

        }

      })
      .catch((error) => console.log(error));
  };

  editItem = (id, index) => {
    this.props.navigation.navigate('Editcontact', {
      id: id
    })
  }
  closediv = () => {
    console.log('previous div close')
  }
  

  test = (id, index, arr) => {
    this.state.markers > 0 ? 
    //.close()
    ''
    :
    this.setState({ markers:  id})
  }

  render() {
    const { dataSource, isRefreshing } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
         {/*  <Text onPress={this.handleRefresh}>reload</Text> */}
          <FlatList
           contentContainerStyle={{marginBottom: 20}}
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <ItemBox data={item}
                handleDelete={() => this.deleteItem(item.id, index)}
                handleEdit={() => this.editItem(item.id, index)}
               handlechangetouch={() => this.test(item.id, index)}
              /*  ref={ref => row[item.id] = ref} */
              ref={this.collectRowRefs}
              />;
            }}
             ListFooterComponent={this.renderLoader}
             refreshing={isRefreshing}
             onRefresh={this.handleRefresh}
             onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
           
          />
        </View>
      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  container: {

  },
  divcontainer: {
    width: '100%'
  },
  seperatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
export default Dashboard;

