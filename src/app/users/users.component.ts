import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: 'Add',
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
    },
    edit: {
      editButtonContent: 'Edit',
      saveButtonContent: 'Save',
      cancelButtonContent: 'Cancel',
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: true,
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  constructor() { }

  ngOnInit() {
  }
  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event.data);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
