//request 比較肥 , superagent 是輕量型的
const React = require('react');
const ReactDOM = require('react-dom');
const request = require('superagent');

const useUrl =  'https://whispering-river-47833.herokuapp.com';
//const useUrl =  `http://${location.host}`;


class PlaceItem extends React.Component {
  render() {
    return (
      <div className="item">
        <i className="large youtube middle aligned icon"></i>
        <div className="content">
          <a className="header">{this.props.place}</a>
           <div className="description">{this.props.address} </div>
        </div>
      </div>
    )
  }
}

class PlaceItemList extends React.Component {
  constructor(props){
    super(props);
    this.state ={ places: []};

    //console.log(location.host);
    //console.log(`http://${location.host}/api/history`);
  }
  
  // 當 mount 入app 時去執行
  componentDidMount(){
     this.update();
  }
  
  //自定義 function
  update(){
    
    let self = this;
    let url = `${useUrl}/api/history`;
    //let url = 'https://whispering-river-47833.herokuapp.com/api/history' ; //要替換成自己的網址跟port

    request
      .get(url)
      .end( function(error,response){
        let result = JSON.parse(response.text);
        console.log(result);
        self.setState({places: result});
      }
    )


  }


  render(){
     //react 規定 list of component 一定要有key
    return(
       <div id="resultList" className="ui relaxed divided list">
            {
              this.state.places.map((value,index)=>{
                return <PlaceItem key={index} place={value.place} address={value.result.formatted_address} />;
              })
            }
      </div>

    ); 
  }
}

class App extends React.Component {
constructor(props){
    super(props);
    this.state ={ searchPlace: ''};
    this.handleChange = this.handleChange.bind(this);
}
  handleChange(event){
    this.setState({searchPlace: event.target.value});

  }

  send(event){
    let self = this;
    let url = `${useUrl}/api/search-place`; //要替換成自己的網址跟port

    request
      .get(url)
      .query({place: this.state.searchPlace})
      .end( function(error,response){
        let result = JSON.parse(response.text);
        console.log(result);
        self.placeItemlist.update();
      }
    )


  }
  
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="fourteen wide column">
          <h2 className="ui teal image header">
            <i className="hand spock icon"></i>
            <div className="content">
              Search the place
            </div>
          </h2>
          <div className="ui action input">
            <input id="urlText" type="text" placeholder="Search..." onChange={this.handleChange.bind(this)} />
            <button id="searchButton" className="ui blue button" onClick={this.send.bind(this)}>Search</button>
          </div>
          <div className="ui horizontal divider">
            place-spot
          </div>
         <PlaceItemList ref={(placeItemlist)=>{ this.placeItemlist = placeItemlist }} />
        </div>
      </div>
    )
  }
}

/*
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);