import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './app.css';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    const { fetchUsers } = props.actions;
    fetchUsers();
    const users = props.usersReducer && [];
    this.originUsers = JSON.stringify(users);
    this.state = {
      selected: [],
      changed: false,
      users
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.modifyUsersStore = this.modifyUsersStore.bind(this);
    this.recoveryChanged = this.recoveryChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const users = nextProps.usersReducer;
    this.originUsers = JSON.stringify(users);
    this.setState({
      users,
      selected: [],
      changed: false
    });
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
        const index = users.findIndex(x => x.id == value);
        users.splice(index, 1);
      }
    });
    this.setState({
      users,
      selected: [],
      changed: this.isChange()
    });
  }

  modifyUsersStore() {
    const { modifyUsers, fetchUsers } = this.props.actions;
    modifyUsers(this.state.users.slice());
  }

  recoveryChanged() {
    this.setState({
      users: JSON.parse(this.originUsers),
      selected: [],
      changed: false
    });
  }

  isChange() {
    return JSON.stringify(this.state.users) !== this.originUsers;
  }

  render() {
    return (
      <div className="index">
        <Table>
          <TableHeader>
            <TableRow>
              {/*<TableHeaderColumn>ID</TableHeaderColumn>*/}
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>UserName</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={false} displayRowCheckbox={false} preScanRows={false} deselectOnClickaway={false}>
            {this.state.users.map(data => (
              <TableRow key={data.id} selectable={false}>
                <TableRowColumn style={{width: '24px'}}>
                  <Checkbox id={data.id.toString()} name="selected" checked={this.state.selected.indexOf(data.id.toString()) !== -1} onCheck={this.handleSelect}/>
                </TableRowColumn>
                {/*<TableRowColumn>{data.id}</TableRowColumn>*/}
                <TableRowColumn>
                  <TextField id={data.id.toString()} name="name" hintText="Name" value={data.name} onChange={this.handleOnChange}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField id={data.id.toString()} name="username" hintText="UserName" value={data.username} onChange={this.handleOnChange}/>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField id={data.id.toString()} name="email" hintText="Email" value={data.email} onChange={this.handleOnChange}/>
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
            <RaisedButton label="Reset" primary disabled={!this.state.changed} onTouchTap={this.recoveryChanged} />
            <RaisedButton label="Save" primary disabled={!this.state.changed} onTouchTap={this.modifyUsersStore} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
