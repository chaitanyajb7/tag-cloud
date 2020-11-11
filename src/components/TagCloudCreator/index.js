import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DataEntryForm from './DataEntry/DataEntryForm';
import TagCloudView from './TagCloud/TagCloudView';

class TagCloudCreaterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null,dataMap:[],formMode:true ,smallestCount:0,largerstCount:0};
  }

  setTextToCreateTag = (values) =>{
    const {formMode} = this.state;
    let temp = values.data.replace(/\r?\n/g," ");
    temp = temp.replace(/[`~!@#$^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '').toUpperCase();
    let dataList = temp.split(" ");
    let dataMap={};
    dataList.sort();
    let prev;
    let smallestCount=1;
    let largestCount=1;
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i] !== prev) {
        if(smallestCount > dataMap[prev]){
          smallestCount = dataMap[prev];
        }

        if(largestCount < dataMap[prev]){
          largestCount = dataMap[prev];
        }

        dataMap[(dataList[i])]=1;
      } else {
        dataMap[(dataList[i])]++;
      }
      prev = dataList[i];
    }
    console.log("DataMap",dataMap);
    console.log("smallestCount",smallestCount);
    console.log("largestCount",largestCount);
    this.setState({data:values.data,dataMap,smallestCount,largestCount,formMode:!formMode});
  }

  reset=()=>{
    const {formMode} = this.state;
    this.setState({data:null, dataMap:[], formMode:!formMode});
  }

  render() {
    const {data,dataMap,formMode,smallestCount,largestCount} = this.state;
    return(
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          {formMode ? 
          <DataEntryForm setTextToCreateTag={this.setTextToCreateTag} data={data} /> :
          <TagCloudView dataMap={dataMap} reset={this.reset} max={largestCount} min={smallestCount}/>}
        </Container>
    </React.Fragment>);
  }
}

export default TagCloudCreaterContainer;