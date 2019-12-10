import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-user-plus" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-save"></i>',
      cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
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

  Users: any = [];
  constructor( public restApi: RestApiService) { }

  ngOnInit() {
    this.loadUsers();
  }

   // Get User list
   loadUsers() {
    return this.restApi.getUsers().subscribe((data: {}) => {
      this.Users = data;
    });
  }

  // Add User
  onCreateConfirm(event) {
    console.log('event', event);
    this.restApi.createUser(event.newData).subscribe((data) => {
      if (data) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    });
  }

  // Delete User
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.restApi.deleteUser(event.data.id).subscribe(data => {
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  // Edit User
  onSaveConfirm(event) {
    this.restApi.updateUser(event.data.id, event.newData).subscribe(data => {
      if (data) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    });
  }
}
