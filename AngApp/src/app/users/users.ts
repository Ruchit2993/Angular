import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, AppUser } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
})
export class Users implements OnInit {
  users: AppUser[] = [];
  year = new Date().getFullYear();

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    const apiUsers = await this.userService.fetchDummyUsers();
    const mapped = apiUsers.map(u => ({
      name: u.firstName || '',
      lastName: u.lastName || '',
      email: u.email || '',
      mobile: u.phone || '',
      country: u.address?.country || '',
      password: '',
      gender: u.gender || '',
      hobbies: []
    }));
    this.userService.saveAll(mapped);
    this.users = this.userService.getAll();
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    // Remove from local array
    this.users = this.users.filter(u => u.id !== id);

    // Update localStorage via UserService
    const updatedUsers = this.users;
    try {
      localStorage.setItem('app_users', JSON.stringify(updatedUsers));
      console.log(`User with id ${id} deleted successfully.`);
    } catch (err) {
      console.error('Failed to update localStorage after deleting user', err);
    }
  }

  logout() {
    this.userService.setCurrent(null);
    this.router.navigate(['/login']);
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }
}
