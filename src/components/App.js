import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './app.css';

import json from './test';


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.originData = JSON.stringify(json);
    this.state = {
      selected: [],
      changed: false,
      users: JSON.parse(this.originData)
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  handleOnChange(event, value) {
    const id = event.target.id;
    const name = event.target.name;
    let users = this.state.users;
    const index = users.findIndex(x => x.id == id)
    users[index][name] = value;
    this.setState({
      users,
      changed: this.isChange()
    });
  }

  handleSelect(event, value) {
    const id = value && event.target.id
    this.setState({
      selected: [id]
    });
  }

  addNewUser() {
    let users = this.state.users;
    let selected = this.state.selected;
    const id = new Date().getTime().toString();
    const name = '', username = '', email = '';
    users.push({
      id,
      name,
      username,
      email
    });
    this.setState({
      users,
      selected: [id],
      changed: this.isChange()
    });
  }

  removeUser() {
    let users = this.state.users;
    let selected = this.state.selected;

    selected.map((value) => {
      if (value) {
        const index = users.findIndex(x => x.id == value)
        users.splice(index, 1);
      }
    });
    this.setState({
      users,
      selected: [],
      changed: this.isChange()
    });
  }

  isChange() {
    return JSON.stringify(this.state.users) !== this.originData;
  }

  render() {
    return (
      <div className="index">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>UserName</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={false} displayRowCheckbox={false} preScanRows={false} deselectOnClickaway={false}>
            {this.state.users.map(data => (
              <TableRow selectable={false}>
                <TableRowColumn style={{width: '24px'}}>
                  <Checkbox id={data.id} name="selected" checked={this.state.selected.indexOf(data.id.toString()) !== -1} onCheck={this.handleSelect}/>
                </TableRowColumn>
                <TableRowColumn>{data.id}</TableRowColumn>
                <TableRowColumn>
                  <TextField id={data.id} name="name" hintText="Name" defaultValue={data.name} onChange={this.handleOnChange}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField id={data.id} name="username" hintText="UserName" defaultValue={data.username} onChange={this.handleOnChange}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField id={data.id} name="email" hintText="Email" defaultValue={data.email} onChange={this.handleOnChange}/>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton label="Delete" secondary onTouchTap={this.removeUser} />
            <RaisedButton label="New User" primary onTouchTap={this.addNewUser} />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton label="Reset" primary disabled={!this.state.changed} />
            <RaisedButton label="Save" primary disabled={!this.state.changed} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
