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
  users: any[] = [];
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
    this.users = this.users.filter(u => u.id !== id);
  }

  logout() {
    this.userService.setCurrent(null);
    this.router.navigate(['/login']);
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }
}
