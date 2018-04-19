import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col, Navbar, FormGroup, FormControl, Button, ListGroup, ListGroupItem, Nav, NavItem } from 'react-bootstrap';
import { Paginator } from './components/paginator';

let DEFAULT_STATE = {
  searchTerm: "",
  pageCount:  0,
  currentPage: 0,
  searchValidation:  null,
  isSearching: false,
  words: []
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: localStorage.getItem("searchTerm") || "",
      pageCount: localStorage.getItem("pageCount") || 0,
      currentPage: localStorage.getItem("currentPage") || 0,
      searchValidation: localStorage.getItem("searchValidation") || null,
      isSearching: false,
      words: []
    }

    if(localStorage.getItem("isSearching")) {
      this.state.isSearching = JSON.parse(localStorage.getItem("isSearching"));
    }

    if(localStorage.getItem("words")) {
      this.state.words = JSON.parse(localStorage.getItem("words"))
    }

    this.onSearchTermChange = this.onSearchTermChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onClearStorage = this.onClearStorage.bind(this)
  }

  componentWillUpdate(newProps, newState) {
    localStorage.setItem("searchTerm", newState.searchTerm)
    localStorage.setItem("searchValidation", newState.searchValidation)
    localStorage.setItem("isSearching", JSON.stringify(newState.isSearching))
    localStorage.setItem("words", JSON.stringify(newState.words))
    localStorage.setItem("pageCount", newState.pageCount)
    localStorage.setItem("currentPage", newState.currentPage)
  }

  onClearStorage() {
    this.setState(DEFAULT_STATE);
  }

  onPageChange(page) {
    this.setState({currentPage: page})
  }

  onSearchTermChange(evt) {
    this.setState({searchTerm: evt.target.value});
  }

  onSearch() {
    if( !this.state.searchTerm || this.state.searchTerm.length === 0 )  return

    this.setState({isSearching: true})
    fetch("/api/v0/?search=" + this.state.searchTerm)
      .then(res => res.json())
      .then(json => {
        this.setState({
          currentPage: 1,
          pageCount: Math.ceil(json.results.length / 15),
          words: json.results.map(function(wordObj, i) { return wordObj.word }),
          isSearching: false,
          searchValidation: "success"
        })
      })
      .catch(err => {
        this.setState({isSearching: false, searchValidation: "error"})
        console.log(err)
      });
  }

  render() {
    return [(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Alex Boyd</Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <Button onClick={this.onClearStorage} bsStyle="success">Clear Storage</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>),
      (<Grid className="body">
        <Row>
          <Col xs={8} xsOffset={2}>
            <Row>
              <Col xs={9}>
                <form>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.state.searchValidation}
                  >
                    <FormControl
                      type="text"
                      placeholder="Enter search term"
                      onChange={this.onSearchTermChange}
                      value={this.state.searchTerm}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </form>
              </Col>
              <Col x={3}>
                <Button bsStyle="primary"
                  disabled={this.state.isSearching}
                  onClick={this.onSearch}>Search</Button>
              </Col>
            </Row>
          </Col>
          { this.state.words.length > 0 &&
          <Col xs={12}>
            <ListGroup>
              {
                
                this.state.words.slice( (this.state.currentPage-1) * 15,
                  Math.min(this.state.words.length, this.state.currentPage * 15))
                  .map(function(word, i) {
                return <ListGroupItem>{word}</ListGroupItem>
              })}
            </ListGroup>
            <Paginator
              currentPage={this.state.currentPage}
              totalPages={this.state.pageCount} 
              onChange={this.onPageChange} />
          </Col>
          }
        </Row>
      </Grid>)
    ];
  }
}

export default App;
